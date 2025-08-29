#!/usr/bin/env node

/**
 * Script to manually revalidate the settings cache
 * Usage: node scripts/revalidate-cache.js
 */

const REVALIDATION_TOKEN = process.env.REVALIDATION_TOKEN || 'your-secret-token'
const SITE_URL = process.env.SITE_URL || 'https://your-site.vercel.app'

async function revalidateCache() {
  try {
    console.log('🔄 Revalidating settings cache...')
    
    const response = await fetch(`${SITE_URL}/api/revalidate-settings`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REVALIDATION_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (response.ok) {
      const data = await response.json()
      console.log('✅ Cache revalidated successfully!')
      console.log('📅 Timestamp:', data.timestamp)
    } else {
      console.error('❌ Failed to revalidate cache:', response.status, response.statusText)
    }
  } catch (error) {
    console.error('❌ Error revalidating cache:', error.message)
  }
}

revalidateCache()