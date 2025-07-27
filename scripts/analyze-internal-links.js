#!/usr/bin/env node

/**
 * Analyze and improve internal linking structure
 */

import fs from 'fs'
import path from 'path'

console.log('🔗 Analyzing internal linking structure...\n')

function getAllPagePaths() {
  const paths = []
  const pagesDir = path.join(process.cwd(), 'src', 'app', '(frontend)')

  function traverse(currentPath, urlPath = '') {
    const items = fs.readdirSync(currentPath)

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith('(') && item !== 'form') {
        const newUrlPath = urlPath + '/' + item
        traverse(fullPath, newUrlPath)
      } else if (item === 'page.tsx') {
        paths.push(urlPath || '/')
      }
    })
  }

  traverse(pagesDir)
  return paths.sort()
}

function getInternalLinks(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')
  const links = []

  // Find Next.js Link components and href attributes
  const linkPatterns = [/href=['"`]([^'"`]+)['"`]/g, /<Link[^>]+to=['"`]([^'"`]+)['"`]/g]

  linkPatterns.forEach((pattern) => {
    let match
    while ((match = pattern.exec(content)) !== null) {
      const href = match[1]

      // Filter for internal links (not external, not anchors, not API)
      if (
        !href.startsWith('http') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:') &&
        !href.startsWith('#') &&
        !href.startsWith('/api')
      ) {
        links.push(href)
      }
    }
  })

  return [...new Set(links)] // Remove duplicates
}

function analyzeInternalLinking() {
  const allPaths = getAllPagePaths()
  const linkAnalysis = {}
  const orphanedPages = []

  // Initialize analysis structure
  allPaths.forEach((pagePath) => {
    linkAnalysis[pagePath] = {
      inboundLinks: [],
      outboundLinks: [],
      inboundCount: 0,
    }
  })

  // Analyze each page file
  const srcFiles = []
  function collectFiles(dirPath) {
    const items = fs.readdirSync(dirPath)
    items.forEach((item) => {
      const fullPath = path.join(dirPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.next')) {
        collectFiles(fullPath)
      } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
        srcFiles.push(fullPath)
      }
    })
  }

  collectFiles(path.join(process.cwd(), 'src'))

  // Analyze links in each file
  srcFiles.forEach((filePath) => {
    const links = getInternalLinks(filePath)
    const relativePath = path.relative(process.cwd(), filePath)

    links.forEach((link) => {
      const cleanLink = link.split('?')[0].split('#')[0] // Remove query params and anchors

      if (linkAnalysis[cleanLink]) {
        linkAnalysis[cleanLink].inboundLinks.push(relativePath)
        linkAnalysis[cleanLink].inboundCount++
      }
    })
  })

  // Find orphaned pages (no inbound links)
  Object.keys(linkAnalysis).forEach((pagePath) => {
    if (linkAnalysis[pagePath].inboundCount === 0 && pagePath !== '/') {
      orphanedPages.push(pagePath)
    }
  })

  return { linkAnalysis, orphanedPages, allPaths }
}

function generateLinkingSuggestions(linkAnalysis, orphanedPages, allPaths) {
  const suggestions = []

  // Group pages by category
  const servicePages = allPaths.filter((p) => p.includes('-service') || p.includes('service'))
  const contentPages = allPaths.filter(
    (p) => p.includes('/newsroom/') || p.includes('/impact-stories/'),
  )
  const informationPages = allPaths.filter((p) =>
    ['about', 'pricing', 'faqs', 'testimonials', 'contact'].some((page) => p.includes(page)),
  )

  // Suggest links for orphaned pages
  orphanedPages.forEach((orphanPage) => {
    if (servicePages.includes(orphanPage)) {
      suggestions.push({
        page: orphanPage,
        suggestion: 'Add link from main services page (/services)',
        fromPages: ['/services', '/pricing', '/'],
        reason: 'Service page needs visibility from main navigation and related pages',
      })
    } else if (contentPages.includes(orphanPage)) {
      suggestions.push({
        page: orphanPage,
        suggestion: 'Add link from newsroom index or related articles',
        fromPages: ['/newsroom', '/impact-stories'],
        reason: 'Content page needs discoverability from content hub',
      })
    } else {
      suggestions.push({
        page: orphanPage,
        suggestion: 'Add link from relevant related pages',
        fromPages: ['/', '/services'],
        reason: 'Page needs at least one inbound link for SEO',
      })
    }
  })

  // Suggest cross-linking between related services
  servicePages.forEach((servicePage) => {
    const relatedServices = servicePages.filter((p) => p !== servicePage)
    if (relatedServices.length > 0) {
      suggestions.push({
        page: servicePage,
        suggestion: 'Add "Related Services" section linking to complementary services',
        fromPages: relatedServices.slice(0, 3),
        reason: 'Improve user journey and internal linking structure',
      })
    }
  })

  return suggestions
}

function generateInternalLinkingReport(linkAnalysis, orphanedPages, allPaths, suggestions) {
  const report = `# Internal Linking Analysis Report

## Summary
- **Total Pages**: ${allPaths.length}
- **Orphaned Pages**: ${orphanedPages.length}
- **Pages with Good Link Equity**: ${Object.keys(linkAnalysis).filter((p) => linkAnalysis[p].inboundCount >= 2).length}

## Orphaned Pages (No Inbound Links)
${
  orphanedPages.length > 0
    ? orphanedPages
        .map((page) => `- **${page}** (${linkAnalysis[page].inboundCount} inbound links)`)
        .join('\n')
    : '✅ No orphaned pages found'
}

## Link Distribution
${Object.keys(linkAnalysis)
  .sort((a, b) => linkAnalysis[b].inboundCount - linkAnalysis[a].inboundCount)
  .slice(0, 10)
  .map((page) => `- **${page}**: ${linkAnalysis[page].inboundCount} inbound links`)
  .join('\n')}

## Improvement Suggestions

### High Priority (Orphaned Pages)
${orphanedPages
  .map((page) => {
    const suggestion = suggestions.find((s) => s.page === page)
    return `
**${page}**
- Current inbound links: ${linkAnalysis[page].inboundCount}
- Suggestion: ${suggestion?.suggestion || 'Add relevant internal links'}
- Add links from: ${suggestion?.fromPages?.join(', ') || 'Related pages'}
- Reason: ${suggestion?.reason || 'Improve page discoverability'}`
  })
  .join('\n')}

### Medium Priority (Cross-linking)
- **Service Pages**: Add "Related Services" sections to cross-link between complementary services
- **Content Pages**: Add "You might also like" sections to related articles
- **Navigation**: Ensure all important pages are accessible within 3 clicks from homepage

## Implementation Checklist

### 1. Fix Orphaned Pages
${orphanedPages.map((page) => `- [ ] Add internal links pointing to \`${page}\``).join('\n')}

### 2. Improve Navigation Structure
- [ ] Add service links to main navigation
- [ ] Create footer links to important pages
- [ ] Add breadcrumb navigation
- [ ] Implement "Related Pages" components

### 3. Content Cross-linking
- [ ] Add contextual links within content
- [ ] Create topic-based content clusters
- [ ] Add call-to-action links to service pages
- [ ] Implement "Popular Pages" widget

### 4. Technical Implementation
- [ ] Use Next.js Link component for all internal links
- [ ] Add proper anchor text (avoid "click here")
- [ ] Implement structured navigation menus
- [ ] Add XML sitemap with priority indicators

## SEO Impact
- **Current Issues**: ${orphanedPages.length} pages may not be discovered by search engines
- **Expected Improvement**: Better crawling, improved page authority distribution
- **User Experience**: Enhanced navigation and content discovery

## Next Steps
1. Review orphaned pages and add relevant internal links
2. Implement cross-linking between related content
3. Update navigation menus and footer
4. Monitor internal link structure with ongoing audits
5. Track improvement in search rankings and user engagement
`

  fs.writeFileSync(path.join(process.cwd(), 'INTERNAL_LINKING_REPORT.md'), report)
  console.log('📝 Internal linking report saved to INTERNAL_LINKING_REPORT.md')
}

// Run analysis
const { linkAnalysis, orphanedPages, allPaths } = analyzeInternalLinking()
const suggestions = generateLinkingSuggestions(linkAnalysis, orphanedPages, allPaths)

console.log(`📊 Analysis Complete:`)
console.log(`   Total pages: ${allPaths.length}`)
console.log(`   Orphaned pages: ${orphanedPages.length}`)
console.log(
  `   Pages with good linking: ${Object.keys(linkAnalysis).filter((p) => linkAnalysis[p].inboundCount >= 2).length}`,
)

if (orphanedPages.length > 0) {
  console.log(`\n🚨 Orphaned pages found:`)
  orphanedPages.slice(0, 10).forEach((page) => {
    console.log(`   ${page} (${linkAnalysis[page].inboundCount} inbound links)`)
  })
  if (orphanedPages.length > 10) {
    console.log(`   ... and ${orphanedPages.length - 10} more`)
  }
}

generateInternalLinkingReport(linkAnalysis, orphanedPages, allPaths, suggestions)

console.log('\n🎯 Internal linking analysis complete!')
