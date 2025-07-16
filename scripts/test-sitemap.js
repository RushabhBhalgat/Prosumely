#!/usr/bin/env node

/**
 * Development script to test sitemap generation
 * Run this to see what routes would be included in the sitemap
 */

import { getStaticRoutes } from '../src/utilities/getStaticRoutes.js'

console.log('🚀 Testing static route discovery...\n')

try {
  const routes = getStaticRoutes()

  console.log(`Found ${routes.length} static routes:\n`)

  routes.forEach((route) => {
    console.log(`  ✓ ${route}`)
  })

  console.log('\n✨ Route discovery completed successfully!')
} catch (error) {
  console.error('❌ Error discovering routes:', error)
  process.exit(1)
}
