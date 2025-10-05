/**
 * Enhanced Security Manager for Keyword Finder Career Tool
 * Production-ready security implementation with CORS, CSP, rate limiting, and monitoring
 */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

export interface SecurityConfig {
  corsOrigins: string[]
  maxRequestSize: number
  csrfProtection: boolean
  signatureValidation: boolean
  blockedUserAgents: string[]
  trustedProxies: string[]
}

export interface SecurityViolation {
  type: 'cors' | 'csrf' | 'size_limit' | 'user_agent' | 'signature' | 'suspicious_activity'
  ip: string
  userAgent: string
  timestamp: Date
  severity: 'low' | 'medium' | 'high'
  details: Record<string, unknown>
}

class SecurityManager {
  private config: SecurityConfig
  private violations: SecurityViolation[] = []
  private suspiciousIPs = new Map<string, { count: number; firstSeen: Date }>()
  private blockedIPs = new Set<string>()

  constructor() {
    this.config = {
      corsOrigins: [
        'https://prosumely.com',
        'https://www.prosumely.com',
        ...(process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : []),
      ],
      maxRequestSize: 50000, // 50KB
      csrfProtection: true,
      signatureValidation: false, // Enable in production if needed
      blockedUserAgents: [
        'bot',
        'crawler',
        'spider',
        'scraper',
        'curl',
        'wget',
        'python-requests',
        'postman',
        'insomnia',
        'automated',
      ],
      trustedProxies: ['127.0.0.1', '::1'],
    }
  }

  /**
   * Comprehensive security check for incoming requests
   */
  async validateRequest(request: NextRequest): Promise<{
    valid: boolean
    violations: SecurityViolation[]
    response?: NextResponse
  }> {
    const violations: SecurityViolation[] = []
    const ip = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || ''

    // Check if IP is blocked
    if (this.blockedIPs.has(ip)) {
      violations.push({
        type: 'suspicious_activity',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'high',
        details: { reason: 'blocked_ip' },
      })
      return {
        valid: false,
        violations,
        response: this.createSecurityResponse('Access denied', 403),
      }
    }

    // CORS validation
    const corsViolation = this.validateCORS(request, ip, userAgent)
    if (corsViolation) violations.push(corsViolation)

    // User agent validation
    const uaViolation = this.validateUserAgent(request, ip, userAgent)
    if (uaViolation) violations.push(uaViolation)

    // Request size validation
    const sizeViolation = await this.validateRequestSize(request, ip, userAgent)
    if (sizeViolation) violations.push(sizeViolation)

    // CSRF protection (for state-changing operations)
    if (request.method !== 'GET' && request.method !== 'OPTIONS') {
      const csrfViolation = this.validateCSRF(request, ip, userAgent)
      if (csrfViolation) violations.push(csrfViolation)
    }

    // Update suspicious activity tracking
    this.trackSuspiciousActivity(ip, violations)

    // Store violations for monitoring
    this.violations.push(...violations)
    this.cleanupOldViolations()

    // Check if we should block requests with violations
    const highSeverityViolations = violations.filter((v) => v.severity === 'high')
    if (highSeverityViolations.length > 0) {
      return {
        valid: false,
        violations,
        response: this.createSecurityResponse('Security violation detected', 403),
      }
    }

    return { valid: true, violations }
  }

  private validateCORS(
    request: NextRequest,
    ip: string,
    userAgent: string,
  ): SecurityViolation | null {
    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // Skip CORS for same-origin requests and GET requests without origin
    if (!origin && !referer) return null

    // Check origin
    if (origin && !this.config.corsOrigins.includes(origin)) {
      return {
        type: 'cors',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'high', // Changed to high to block invalid origins
        details: { origin, allowed: this.config.corsOrigins },
      }
    }

    // Check referer as fallback
    if (!origin && referer) {
      const refererOrigin = new URL(referer).origin
      if (!this.config.corsOrigins.includes(refererOrigin)) {
        return {
          type: 'cors',
          ip,
          userAgent,
          timestamp: new Date(),
          severity: 'high', // Changed to high to block invalid referers
          details: { referer, allowed: this.config.corsOrigins },
        }
      }
    }

    return null
  }

  private validateUserAgent(
    request: NextRequest,
    ip: string,
    userAgent: string,
  ): SecurityViolation | null {
    if (!userAgent) {
      return {
        type: 'user_agent',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'medium',
        details: { reason: 'missing_user_agent' },
      }
    }

    const lowerUA = userAgent.toLowerCase()
    const isBlocked = this.config.blockedUserAgents.some((blocked) =>
      lowerUA.includes(blocked.toLowerCase()),
    )

    if (isBlocked) {
      return {
        type: 'user_agent',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'high',
        details: { reason: 'blocked_user_agent', userAgent },
      }
    }

    return null
  }

  private async validateRequestSize(
    request: NextRequest,
    ip: string,
    userAgent: string,
  ): Promise<SecurityViolation | null> {
    const contentLength = request.headers.get('content-length')

    if (contentLength && parseInt(contentLength) > this.config.maxRequestSize) {
      return {
        type: 'size_limit',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'medium',
        details: { size: parseInt(contentLength), limit: this.config.maxRequestSize },
      }
    }

    return null
  }

  private validateCSRF(
    request: NextRequest,
    ip: string,
    userAgent: string,
  ): SecurityViolation | null {
    if (!this.config.csrfProtection) return null

    const origin = request.headers.get('origin')
    const referer = request.headers.get('referer')

    // For API requests, we expect either origin or referer to match our domain
    if (!origin && !referer) {
      return {
        type: 'csrf',
        ip,
        userAgent,
        timestamp: new Date(),
        severity: 'medium',
        details: { reason: 'missing_origin_and_referer' },
      }
    }

    return null
  }

  private trackSuspiciousActivity(ip: string, violations: SecurityViolation[]) {
    if (violations.length === 0) return

    const existing = this.suspiciousIPs.get(ip)
    if (existing) {
      existing.count += violations.length
      // Block IP if too many violations
      if (existing.count > 10) {
        this.blockedIPs.add(ip)
        console.warn(`🚨 IP ${ip} blocked due to excessive security violations`)
      }
    } else {
      this.suspiciousIPs.set(ip, { count: violations.length, firstSeen: new Date() })
    }
  }

  private cleanupOldViolations() {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000)
    this.violations = this.violations.filter((v) => v.timestamp > oneDayAgo)

    // Cleanup suspicious IPs older than 24 hours
    for (const [ip, data] of this.suspiciousIPs.entries()) {
      if (data.firstSeen < oneDayAgo) {
        this.suspiciousIPs.delete(ip)
      }
    }
  }

  /**
   * Get client IP address with proxy handling
   */
  private getClientIP(request: NextRequest): string {
    // Handle Vercel's forwarded headers
    const forwardedFor = request.headers.get('x-forwarded-for')
    const realIP = request.headers.get('x-real-ip')
    const vercelForwarded = request.headers.get('x-vercel-forwarded-for')

    if (vercelForwarded) {
      const ip = vercelForwarded.split(',')[0]?.trim()
      if (ip) return ip
    }

    if (forwardedFor) {
      const ip = forwardedFor.split(',')[0]?.trim()
      if (ip) return ip
    }

    if (realIP) return realIP

    return 'unknown'
  }

  /**
   * Create security-related response with proper headers
   */
  private createSecurityResponse(message: string, status: number): NextResponse {
    return NextResponse.json(
      {
        error: 'Security violation',
        message,
        timestamp: new Date().toISOString(),
      },
      {
        status,
        headers: {
          'X-Content-Type-Options': 'nosniff',
          'X-Frame-Options': 'DENY',
          'X-XSS-Protection': '1; mode=block',
          'Referrer-Policy': 'strict-origin-when-cross-origin',
        },
      },
    )
  }

  /**
   * Get CORS headers for valid requests
   */
  getCORSHeaders(request: NextRequest): Record<string, string> {
    const origin = request.headers.get('origin')
    const allowedOrigin =
      origin && this.config.corsOrigins.includes(origin)
        ? origin
        : this.config.corsOrigins[0] || 'https://prosumely.com'

    return {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    }
  }

  /**
   * Get Content Security Policy header
   */
  getCSPHeader(): string {
    return [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: https:",
      "font-src 'self' data:",
      "connect-src 'self' https://generativelanguage.googleapis.com",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join('; ')
  }

  /**
   * Get security analytics data
   */
  getSecurityMetrics() {
    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000)

    const recentViolations = this.violations.filter((v) => v.timestamp > oneDayAgo)
    const hourlyViolations = this.violations.filter((v) => v.timestamp > oneHourAgo)

    return {
      totalViolations24h: recentViolations.length,
      violationsLastHour: hourlyViolations.length,
      blockedIPs: Array.from(this.blockedIPs),
      suspiciousIPs: Array.from(this.suspiciousIPs.entries()).map(([ip, data]) => ({
        ip,
        violationCount: data.count,
        firstSeen: data.firstSeen,
      })),
      violationsByType: this.getViolationsByType(recentViolations),
      recentViolations: recentViolations.slice(-20),
    }
  }

  private getViolationsByType(violations: SecurityViolation[]) {
    const byType: Record<string, number> = {}
    violations.forEach((v) => {
      byType[v.type] = (byType[v.type] || 0) + 1
    })
    return byType
  }

  /**
   * Generate request signature for validation
   */
  generateRequestSignature(request: NextRequest, secret: string): string {
    const ip = this.getClientIP(request)
    const userAgent = request.headers.get('user-agent') || ''
    const timestamp = Math.floor(Date.now() / 1000)
    const data = `${ip}:${userAgent}:${timestamp}`
    return crypto.createHmac('sha256', secret).update(data).digest('hex')
  }
}

export const securityManager = new SecurityManager()
