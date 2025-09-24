/**
 * Vercel Blob Storage Cache Manager
 *
 * This module provides efficient caching for Vercel Blob storage operations
 * to avoid expensive list operations on every file request.
 */

interface BlobCacheEntry {
  url: string
  lastAccessed: number
}

interface BlobCache {
  blobs: Map<string, BlobCacheEntry>
  lastFullRefresh: number
  isRefreshing: boolean
}

// Cache configuration
const CACHE_DURATION = 10 * 60 * 1000 // 10 minutes
const CLEANUP_INTERVAL = 30 * 60 * 1000 // 30 minutes
const MAX_CACHE_SIZE = 1000 // Maximum number of cached entries

// Global cache instance
const blobCache: BlobCache = {
  blobs: new Map(),
  lastFullRefresh: 0,
  isRefreshing: false,
}

// Cleanup old entries periodically
let cleanupTimer: NodeJS.Timeout | null = null

function startCleanupTimer() {
  if (cleanupTimer) return

  cleanupTimer = setInterval(() => {
    const now = Date.now()
    const cutoff = now - CACHE_DURATION

    for (const [filename, entry] of blobCache.blobs.entries()) {
      if (entry.lastAccessed < cutoff) {
        blobCache.blobs.delete(filename)
      }
    }

    console.log(`[BlobCache] Cleanup completed. Cache size: ${blobCache.blobs.size}`)
  }, CLEANUP_INTERVAL)
}

/**
 * Get a cached blob URL for a filename
 */
export async function getCachedBlobUrl(filename: string): Promise<string | null> {
  startCleanupTimer()

  const now = Date.now()
  const decodedFilename = decodeURIComponent(filename)

  // Check if we have a cached entry
  const cached = blobCache.blobs.get(decodedFilename)
  if (cached) {
    // Update last accessed time
    cached.lastAccessed = now
    console.log(`[BlobCache] Cache hit for: ${decodedFilename}`)
    return cached.url
  }

  console.log(`[BlobCache] Cache miss for: ${decodedFilename}`)

  // Check if we need to refresh the cache
  const needsRefresh = now - blobCache.lastFullRefresh > CACHE_DURATION

  if (needsRefresh && !blobCache.isRefreshing) {
    await refreshBlobCache()

    // Try again after refresh
    const refreshedCached = blobCache.blobs.get(decodedFilename)
    if (refreshedCached) {
      refreshedCached.lastAccessed = now
      console.log(`[BlobCache] Found after refresh: ${decodedFilename}`)
      return refreshedCached.url
    }
  }

  // If still not found, try a targeted search
  return await findBlobUrlDirect(decodedFilename)
}

/**
 * Refresh the entire blob cache
 */
async function refreshBlobCache(): Promise<void> {
  if (blobCache.isRefreshing) {
    // Wait for existing refresh to complete
    while (blobCache.isRefreshing) {
      await new Promise((resolve) => setTimeout(resolve, 100))
    }
    return
  }

  blobCache.isRefreshing = true
  const startTime = Date.now()

  try {
    console.log('[BlobCache] Starting cache refresh...')

    const { list } = await import('@vercel/blob')
    const { blobs } = await list({ token: process.env.BLOB_READ_WRITE_TOKEN })

    // Clear old cache if it's getting too large
    if (blobCache.blobs.size > MAX_CACHE_SIZE) {
      blobCache.blobs.clear()
      console.log('[BlobCache] Cache cleared due to size limit')
    }

    const now = Date.now()

    // Update cache with fresh data
    for (const blob of blobs) {
      const decodedPath = decodeURIComponent(blob.pathname)
      const basename = decodedPath.split('/').pop() || decodedPath
      
      // Cache both full path and basename for flexibility
      blobCache.blobs.set(decodedPath, {
        url: blob.url,
        lastAccessed: now,
      })
      
      // Also cache by basename if different from full path
      if (basename !== decodedPath) {
        blobCache.blobs.set(basename, {
          url: blob.url,
          lastAccessed: now,
        })
      }
    }

    blobCache.lastFullRefresh = now

    const duration = Date.now() - startTime
    console.log(`[BlobCache] Cache refreshed: ${blobs.length} blobs in ${duration}ms`)
  } catch (error) {
    console.error('[BlobCache] Failed to refresh cache:', error)
  } finally {
    blobCache.isRefreshing = false
  }
}

/**
 * Direct search for a specific blob (fallback)
 */
async function findBlobUrlDirect(filename: string): Promise<string | null> {
  try {
    console.log(`[BlobCache] Direct search for: "${filename}"`)

    const { list } = await import('@vercel/blob')
    const { blobs } = await list({
      token: process.env.BLOB_READ_WRITE_TOKEN,
      // Search more blobs for new files
      limit: 1000,
    })

    console.log(`[BlobCache] Searching through ${blobs.length} blobs`)

    // Try multiple filename matching strategies
    const searchVariants = [
      filename, // Exact match
      decodeURIComponent(filename), // Decoded version
      encodeURIComponent(filename), // Encoded version
      filename.replace(/\s+/g, '%20'), // Space to %20
      filename.replace(/%20/g, ' '), // %20 to space
    ]

    let matchingBlob = null
    let matchedVariant = ''

    for (const variant of searchVariants) {
      matchingBlob = blobs.find((blob) => {
        const blobFilename = decodeURIComponent(blob.pathname)
        const blobBasename = blobFilename.split('/').pop() || blobFilename
        
        // Log first few comparisons for debugging
        if (blobs.indexOf(blob) < 3) {
          console.log(`[BlobCache] Comparing blob: "${blobBasename}" with variant: "${variant}"`)
        }
        
        return blobBasename === variant || blobFilename === variant
      })

      if (matchingBlob) {
        matchedVariant = variant
        break
      }
    }

    if (matchingBlob) {
      // Cache the found result with original filename as key
      blobCache.blobs.set(filename, {
        url: matchingBlob.url,
        lastAccessed: Date.now(),
      })

      console.log(`[BlobCache] Direct search found: "${matchingBlob.pathname}" using variant: "${matchedVariant}"`)
      return matchingBlob.url
    }

    // Log available blob names for debugging
    console.log(`[BlobCache] Direct search failed for: "${filename}"`)
    console.log(`[BlobCache] Available blobs (first 10):`)
    blobs.slice(0, 10).forEach((blob, index) => {
      const blobBasename = decodeURIComponent(blob.pathname).split('/').pop() || blob.pathname
      console.log(`  ${index + 1}. "${blobBasename}"`)
    })
    
    return null
  } catch (error) {
    console.error(`[BlobCache] Direct search error for ${filename}:`, error)
    return null
  }
}

/**
 * Preload commonly accessed files
 */
export async function preloadBlobCache(filenames: string[]): Promise<void> {
  for (const filename of filenames) {
    await getCachedBlobUrl(filename)
  }
}

/**
 * Clear the entire cache (useful for testing or cache invalidation)
 */
export function clearBlobCache(): void {
  blobCache.blobs.clear()
  blobCache.lastFullRefresh = 0
  console.log('[BlobCache] Cache cleared manually')
}

/**
 * Get cache statistics
 */
export function getBlobCacheStats() {
  return {
    size: blobCache.blobs.size,
    lastRefresh: new Date(blobCache.lastFullRefresh).toISOString(),
    isRefreshing: blobCache.isRefreshing,
  }
}

/**
 * Invalidate cache for a specific file or force refresh
 */
export function invalidateBlobCache(filename?: string): void {
  if (filename) {
    blobCache.blobs.delete(filename)
    console.log(`[BlobCache] Invalidated cache for: ${filename}`)
  } else {
    // Force refresh on next request
    blobCache.lastFullRefresh = 0
    console.log('[BlobCache] Marked cache for refresh')
  }
}
