#!/usr/bin/env node

/**
 * Sitemap Cleanup Utility for Prosumely
 * This script helps clean up sitemap issues by identifying problematic URLs
 */

const https = require('https')
const fs = require('fs')
const path = require('path')
const xml2js = require('xml2js')

const SITE_URL = 'https://www.prosumely.com'

// Function to fetch and parse sitemap
async function fetchSitemap(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = ''
        res.on('data', (chunk) => (data += chunk))
        res.on('end', () => {
          xml2js.parseString(data, (err, result) => {
            if (err) reject(err)
            else resolve(result)
          })
        })
      })
      .on('error', reject)
  })
}

// Function to check if URL returns proper status
async function checkUrlStatus(url) {
  return new Promise((resolve) => {
    const urlObj = new URL(url)
    const options = {
      hostname: urlObj.hostname,
      port: 443,
      path: urlObj.pathname + urlObj.search,
      method: 'HEAD',
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; SEO-Audit-Bot/1.0)',
      },
    }

    const req = https.request(options, (res) => {
      resolve({
        url,
        status: res.statusCode,
        headers: res.headers,
      })
    })

    req.on('error', () => {
      resolve({
        url,
        status: 'ERROR',
        headers: {},
      })
    })

    req.setTimeout(5000, () => {
      req.destroy()
      resolve({
        url,
        status: 'TIMEOUT',
        headers: {},
      })
    })

    req.end()
  })
}

// Main cleanup function
async function cleanupSitemap() {
  console.log('🧹 Starting Sitemap Cleanup...\n')

  try {
    // Check main sitemap
    console.log('📋 Fetching main sitemap...')
    const mainSitemap = await fetchSitemap(`${SITE_URL}/sitemap.xml`)

    if (mainSitemap.sitemapindex && mainSitemap.sitemapindex.sitemap) {
      console.log('📄 Found sitemap index with sub-sitemaps')

      for (const sitemap of mainSitemap.sitemapindex.sitemap) {
        const sitemapUrl = sitemap.loc[0]
        console.log(`\n🔍 Checking sitemap: ${sitemapUrl}`)

        try {
          const subSitemap = await fetchSitemap(sitemapUrl)
          await analyzeSitemapUrls(subSitemap, path.basename(sitemapUrl))
        } catch (error) {
          console.log(`❌ Error fetching ${sitemapUrl}: ${error.message}`)
        }
      }
    } else if (mainSitemap.urlset && mainSitemap.urlset.url) {
      console.log('📄 Found direct URL set')
      await analyzeSitemapUrls(mainSitemap, 'main-sitemap')
    }
  } catch (error) {
    console.error('❌ Error fetching main sitemap:', error.message)
  }
}

// Analyze URLs in sitemap
async function analyzeSitemapUrls(sitemap, sitemapName) {
  if (!sitemap.urlset || !sitemap.urlset.url) {
    console.log(`⚠️  No URLs found in ${sitemapName}`)
    return
  }

  const urls = sitemap.urlset.url
  console.log(`📊 Found ${urls.length} URLs in ${sitemapName}`)

  const issues = {
    redirects: [],
    errors: [],
    nonCanonical: [],
    duplicates: [],
  }

  const urlMap = new Map()

  // Check each URL
  for (let i = 0; i < Math.min(urls.length, 50); i++) {
    // Limit to 50 for demo
    const urlData = urls[i]
    const url = urlData.loc[0]

    // Check for duplicates
    if (urlMap.has(url)) {
      issues.duplicates.push(url)
      continue
    }
    urlMap.set(url, true)

    // Check for non-www canonical issues
    if (url.includes('prosumely.com') && !url.includes('www.prosumely.com')) {
      issues.nonCanonical.push(url)
    }

    // Check URL status (sample a few)
    if (i < 10) {
      process.stdout.write(`\r⏳ Checking URL ${i + 1}/10: ${url.substring(0, 50)}...`)
      const status = await checkUrlStatus(url)

      if (status.status >= 300 && status.status < 400) {
        issues.redirects.push({ url, status: status.status })
      } else if (status.status >= 400) {
        issues.errors.push({ url, status: status.status })
      }
    }
  }

  console.log('\n')

  // Report issues
  if (issues.nonCanonical.length > 0) {
    console.log(`❌ Non-canonical URLs found (${issues.nonCanonical.length}):`)
    issues.nonCanonical.slice(0, 5).forEach((url) => console.log(`   ${url}`))
    if (issues.nonCanonical.length > 5) {
      console.log(`   ... and ${issues.nonCanonical.length - 5} more`)
    }
  }

  if (issues.redirects.length > 0) {
    console.log(`⚠️  Redirect URLs found (${issues.redirects.length}):`)
    issues.redirects.forEach((item) => console.log(`   ${item.url} (${item.status})`))
  }

  if (issues.errors.length > 0) {
    console.log(`❌ Error URLs found (${issues.errors.length}):`)
    issues.errors.forEach((item) => console.log(`   ${item.url} (${item.status})`))
  }

  if (issues.duplicates.length > 0) {
    console.log(`🔄 Duplicate URLs found (${issues.duplicates.length}):`)
    issues.duplicates.forEach((url) => console.log(`   ${url}`))
  }

  return issues
}

// Create recommendations file
function createRecommendationsFile() {
  const recommendations = `# SEO Fixes for Prosumely

## Immediate Actions Required

### 1. Sitemap Issues (Priority: HIGH)
- [ ] Remove pages with noindex from XML sitemap
- [ ] Ensure all URLs use canonical format (https://www.prosumely.com)
- [ ] Remove duplicate URLs from sitemap
- [ ] Fix 4XX and 3XX URLs in sitemap

### 2. Canonical URL Consistency (Priority: HIGH)
- [ ] Update all canonical URLs to use www.prosumely.com
- [ ] Review OpenGraph URLs for consistency
- [ ] Check internal links for canonical format

### 3. Meta Tags (Priority: MEDIUM)
- [ ] Fix duplicate page titles across pages
- [ ] Ensure titles are under 60 characters
- [ ] Fix duplicate meta descriptions
- [ ] Keep descriptions under 158 characters

### 4. Content Issues (Priority: MEDIUM)
- [ ] Add unique H1 tags to pages missing them
- [ ] Fix duplicate H1 tags across different pages
- [ ] Fix broken images (4XX errors)
- [ ] Optimize large images for better loading

### 5. Internal Linking (Priority: LOW)
- [ ] Add internal links to orphaned pages
- [ ] Review and improve internal link structure
- [ ] Add descriptive anchor text

## Implementation Steps

1. Run: \`node scripts/seo-audit.js\` to identify specific issues
2. Fix canonical URLs in metadata files
3. Update sitemap generation to exclude problematic URLs
4. Add robots meta tags where needed
5. Re-crawl and verify fixes

## Monitoring

- Set up regular SEO audits using tools like:
  - Google Search Console
  - Screaming Frog
  - SEMrush or Ahrefs
  - Custom scripts (provided)

## Expected Impact

After implementing these fixes:
- ✅ Improved search engine crawling efficiency
- ✅ Better indexing of important pages
- ✅ Reduced duplicate content issues
- ✅ Higher search rankings potential
- ✅ Better user experience
`

  fs.writeFileSync(path.join(process.cwd(), 'SEO_RECOMMENDATIONS.md'), recommendations)
  console.log('\n📝 SEO recommendations saved to SEO_RECOMMENDATIONS.md')
}

// Run the cleanup
cleanupSitemap()
  .then(() => {
    createRecommendationsFile()
    console.log('\n🎯 Sitemap cleanup complete!')
  })
  .catch(console.error)
