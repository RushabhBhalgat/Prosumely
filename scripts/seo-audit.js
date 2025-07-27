#!/usr/bin/env node

/**
 * SEO Audit Script for Prosumely
 * This script helps identify and fix common SEO issues
 */

import fs from 'fs'
import path from 'path'
import { execSync } from 'child_process'

// Configuration
const SITE_URL = 'https://www.prosumely.com'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`

console.log('🔍 Starting SEO Audit for Prosumely...\n')

// 1. Check for pages with noindex in sitemap
async function checkNoindexInSitemap() {
  console.log('📋 Checking for pages with noindex in sitemap...')

  // This would need to be expanded to actually crawl and check
  console.log('✅ Manual check required: Review sitemap for pages with noindex meta tags')
  console.log(
    '   Action: Remove noindex pages from sitemap OR remove noindex from important pages\n',
  )
}

// 2. Check for non-canonical pages in sitemap
async function checkNonCanonicalInSitemap() {
  console.log('🔗 Checking for non-canonical pages in sitemap...')
  console.log('✅ Manual check required: Ensure all sitemap URLs are canonical versions')
  console.log('   Action: Review sitemap for duplicate pages with different URLs\n')
}

// 3. Check for canonical URL consistency
async function checkCanonicalConsistency() {
  console.log('🌐 Checking canonical URL consistency...')

  const srcDir = path.join(process.cwd(), 'src')
  const files = getAllFiles(srcDir, ['.tsx', '.ts'])

  let issues = 0

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8')

    // Check for canonical URLs without www
    if (
      content.includes('https://prosumely.com') &&
      !content.includes('https://www.prosumely.com')
    ) {
      console.log(`❌ Issue found in ${file}: canonical URL missing www`)
      issues++
    }

    // Check for hardcoded URLs
    const hardcodedUrls = content.match(/https:\/\/(?:www\.)?prosumely\.com/g)
    if (hardcodedUrls) {
      console.log(`⚠️  Hardcoded URLs found in ${file}: ${hardcodedUrls.length} instances`)
    }
  })

  if (issues === 0) {
    console.log('✅ No canonical URL issues found')
  }
  console.log('')
}

// 4. Check for duplicate meta tags
async function checkDuplicateMetaTags() {
  console.log('📝 Checking for duplicate meta tags...')

  const srcDir = path.join(process.cwd(), 'src')
  const files = getAllFiles(srcDir, ['.tsx', '.ts'])

  const titles = new Map()
  const descriptions = new Map()

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8')

    // Extract titles
    const titleMatch = content.match(/title:\s*['"`]([^'"`]+)['"`]/)
    if (titleMatch) {
      const title = titleMatch[1]
      if (titles.has(title)) {
        titles.get(title).push(file)
      } else {
        titles.set(title, [file])
      }
    }

    // Extract descriptions
    const descMatch = content.match(/description:\s*['"`]([^'"`]+)['"`]/)
    if (descMatch) {
      const desc = descMatch[1]
      if (descriptions.has(desc)) {
        descriptions.get(desc).push(file)
      } else {
        descriptions.set(desc, [file])
      }
    }
  })

  // Report duplicates
  let duplicateTitles = 0
  let duplicateDescs = 0

  titles.forEach((files, title) => {
    if (files.length > 1) {
      console.log(`❌ Duplicate title found: "${title}"`)
      console.log(`   Files: ${files.join(', ')}`)
      duplicateTitles++
    }
  })

  descriptions.forEach((files, desc) => {
    if (files.length > 1) {
      console.log(`❌ Duplicate description found: "${desc.substring(0, 50)}..."`)
      console.log(`   Files: ${files.join(', ')}`)
      duplicateDescs++
    }
  })

  if (duplicateTitles === 0 && duplicateDescs === 0) {
    console.log('✅ No duplicate meta tags found')
  }
  console.log('')
}

// 5. Check for missing H1 tags
async function checkMissingH1Tags() {
  console.log('🏷️  Checking for missing H1 tags...')
  console.log('✅ Manual check required: Review all pages to ensure each has a unique H1 tag')
  console.log('   Action: Add unique H1 tags to pages that are missing them\n')
}

// 6. Generate SEO recommendations
async function generateRecommendations() {
  console.log('💡 SEO Recommendations:')
  console.log('')
  console.log('1. SITEMAP ISSUES (40 errors):')
  console.log('   - Remove pages with noindex from XML sitemap')
  console.log('   - Ensure only canonical URLs are in sitemap')
  console.log('   - Review and fix non-canonical pages')
  console.log('')
  console.log('2. REDIRECTS (68 warnings):')
  console.log('   - Review 3XX redirects and minimize redirect chains')
  console.log(
    '   - Convert temporary redirects (302, 303, 307) to permanent (301) where appropriate',
  )
  console.log('')
  console.log('3. META TAGS (15 errors):')
  console.log('   - Fix duplicate page titles')
  console.log('   - Ensure titles are under 60 characters')
  console.log('   - Fix duplicate descriptions')
  console.log('   - Keep descriptions under 158 characters')
  console.log('')
  console.log('4. CONTENT (5 errors):')
  console.log('   - Add unique H1 tags to pages missing them')
  console.log('   - Fix duplicate H1 tags across different pages')
  console.log('   - Fix broken images (4XX errors)')
  console.log('   - Optimize large images')
  console.log('')
  console.log('5. LINKS (14 errors):')
  console.log('   - Add internal links to pages with no inbound links')
  console.log('   - Fix external links pointing to redirects')
  console.log('   - Add descriptive anchor text to external links')
}

// Utility function to get all files with specific extensions
function getAllFiles(dirPath, extensions) {
  const files = []

  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath)

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory()) {
        traverse(fullPath)
      } else if (extensions.some((ext) => item.endsWith(ext))) {
        files.push(fullPath)
      }
    })
  }

  traverse(dirPath)
  return files
}

// Run all checks
async function runAudit() {
  await checkNoindexInSitemap()
  await checkNonCanonicalInSitemap()
  await checkCanonicalConsistency()
  await checkDuplicateMetaTags()
  await checkMissingH1Tags()
  await generateRecommendations()

  console.log('🎯 SEO Audit Complete!')
  console.log('Review the issues above and implement the recommended fixes.')
}

runAudit().catch(console.error)
