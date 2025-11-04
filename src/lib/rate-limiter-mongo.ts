/**
 * MongoDB-based Rate Limiter using Payload Collections
 * Production-ready rate limiting with persistent database storage
 */

import { NextRequest } from 'next/server'
import { getPayload, type BasePayload } from 'payload'
import config from '@/payload.config'

interface RateLimitConfig {
  free: { requests: number; windowMs: number }
  burst: { requests: number; windowMs: number }
  minute: { requests: number; windowMs: number }
}

interface EndpointRateLimits {
  [endpoint: string]: RateLimitConfig
}

export class MongoRateLimiter {
  private payload: BasePayload | null = null

  // Default config for keyword extraction
  private readonly defaultConfig: RateLimitConfig = {
    free: { requests: 5, windowMs: 60 * 60 * 1000 }, // 5 requests per hour
    burst: { requests: 2, windowMs: 10 * 1000 }, // 2 requests per 10 seconds
    minute: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
  }

  // Endpoint-specific rate limits
  private readonly endpointConfigs: EndpointRateLimits = {
    '/api/keyword-extract': {
      free: { requests: 5, windowMs: 60 * 60 * 1000 }, // 5 requests per hour
      burst: { requests: 2, windowMs: 10 * 1000 }, // 2 requests per 10 seconds
      minute: { requests: 10, windowMs: 60 * 1000 }, // 10 requests per minute
    },
    '/api/cover-letter-generate': {
      free: { requests: 3, windowMs: 60 * 60 * 1000 }, // 3 requests per hour
      burst: { requests: 1, windowMs: 20 * 1000 }, // 1 request per 20 seconds
      minute: { requests: 2, windowMs: 60 * 1000 }, // 2 requests per minute
    },
    '/api/resume-gap-analysis': {
      free: { requests: 4, windowMs: 60 * 60 * 1000 }, // 4 requests per hour
      burst: { requests: 1, windowMs: 15 * 1000 }, // 1 request per 15 seconds
      minute: { requests: 3, windowMs: 60 * 1000 }, // 3 requests per minute
    },
  }

  private getConfigForEndpoint(endpoint: string): RateLimitConfig {
    return this.endpointConfigs[endpoint] || this.defaultConfig
  }

  private async getPayloadInstance() {
    if (!this.payload) {
      try {
        this.payload = await getPayload({ config })
      } catch (error) {
        console.error('Failed to initialize Payload for rate limiting:', error)
        throw error
      }
    }
    return this.payload
  }

  private getClientIP(request: NextRequest): string {
    // Check for various IP headers in order of preference
    const headers = [
      'cf-connecting-ip', // Cloudflare
      'x-client-ip', // Load balancers
      'x-real-ip', // Nginx
      'x-forwarded-for', // Standard proxy header
    ]

    for (const header of headers) {
      const value = request.headers.get(header)
      if (value) {
        // x-forwarded-for can contain multiple IPs, get the first one
        const firstIP = value.split(',')[0]?.trim()
        if (firstIP && firstIP !== 'unknown') {
          return firstIP
        }
      }
    }

    // For localhost development, use a default IP
    if (process.env.NODE_ENV === 'development') {
      return '127.0.0.1'
    }

    return 'unknown'
  }

  async checkRateLimit(
    request: NextRequest,
    endpoint: string = '/api/keyword-extract',
  ): Promise<{
    allowed: boolean
    remaining: number
    resetTime: Date
    message?: string
    retryAfter?: number
    tier?: string
  }> {
    try {
      const payload = await this.getPayloadInstance()
      const ip = this.getClientIP(request)
      const now = new Date()

      // Get config for this specific endpoint
      const config = this.getConfigForEndpoint(endpoint)

      // Check all tiers (burst is most restrictive, then minute, then free)
      const tiers = ['burst', 'minute', 'free'] as const

      for (const tier of tiers) {
        const tierConfig = config[tier]

        // Find existing rate limit record for this IP, endpoint, and tier
        const rateLimitQuery = {
          identifier: { equals: ip },
          endpoint: { equals: endpoint },
          tier: { equals: tier },
        }

        try {
          // First, find any existing record for this IP/endpoint/tier combo
          const rateLimitDocs = await payload.find({
            collection: 'rate-limits',
            where: rateLimitQuery,
            limit: 1,
          })

          let rateLimitDoc = rateLimitDocs.docs[0]

          if (!rateLimitDoc || new Date(rateLimitDoc.resetTime) <= now) {
            // Create new rate limit record or reset expired one
            if (rateLimitDoc) {
              // Update existing expired record
              await payload.update({
                collection: 'rate-limits',
                id: rateLimitDoc.id,
                data: {
                  count: 1,
                  resetTime: new Date(now.getTime() + tierConfig.windowMs).toISOString(),
                },
              })
              // Update rateLimitDoc for later use
              rateLimitDoc.count = 1
              rateLimitDoc.resetTime = new Date(now.getTime() + tierConfig.windowMs).toISOString()
            } else {
              // Create completely new record
              rateLimitDoc = await payload.create({
                collection: 'rate-limits',
                data: {
                  identifier: ip,
                  endpoint,
                  tier,
                  count: 1,
                  resetTime: new Date(now.getTime() + tierConfig.windowMs).toISOString(),
                },
              })
            }
            // This is the first request in the window, so it's allowed
            continue
          }

          // Check if we're still within the rate limit
          if (rateLimitDoc.count >= tierConfig.requests) {
            const resetTime = new Date(rateLimitDoc.resetTime)
            const retryAfter = Math.ceil((resetTime.getTime() - now.getTime()) / 1000)

            return {
              allowed: false,
              remaining: 0,
              resetTime,
              retryAfter,
              tier,
              message: `Rate limit exceeded for ${tier} tier. ${rateLimitDoc.count}/${tierConfig.requests} requests used.`,
            }
          }

          // Update the count
          await payload.update({
            collection: 'rate-limits',
            id: rateLimitDoc.id,
            data: {
              count: rateLimitDoc.count + 1,
            },
          })
        } catch (dbError) {
          console.error(`Rate limiting database error for tier ${tier}:`, dbError)
          // Continue to next tier or fail open
          continue
        }
      }

      // If we get here, all tiers are within limits
      return {
        allowed: true,
        remaining: Math.min(
          config.free.requests - 1,
          config.minute.requests - 1,
          config.burst.requests - 1,
        ),
        resetTime: new Date(now.getTime() + config.free.windowMs),
        tier: 'allowed',
      }
    } catch (error) {
      console.error('Rate limiting error:', error)

      // Fail open - allow request if rate limiting fails
      const fallbackConfig = this.getConfigForEndpoint(endpoint)
      return {
        allowed: true,
        remaining: fallbackConfig.free.requests - 1,
        resetTime: new Date(Date.now() + fallbackConfig.free.windowMs),
        message: 'Rate limiting service temporarily unavailable',
      }
    }
  }

  async cleanup(): Promise<number> {
    try {
      const payload = await this.getPayloadInstance()
      const now = new Date()

      // Clean up old rate limit records (older than their reset time)
      const result = await payload.delete({
        collection: 'rate-limits',
        where: {
          resetTime: { less_than: now.toISOString() },
        },
      })

      return result.docs?.length || 0
    } catch (error) {
      console.error('Error during cleanup:', error)
      return 0
    }
  }
}

// Export singleton instance
export const mongoRateLimiter = new MongoRateLimiter()
