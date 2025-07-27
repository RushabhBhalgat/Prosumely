#!/usr/bin/env node

/**
 * Mass Canonical URL Fixer for Prosumely
 * This script fixes all canonical URLs to use www.prosumely.com
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('🔧 Starting mass canonical URL fix...\n')

// Get all TypeScript and TSX files
function getAllFiles(dirPath, extensions) {
  const files = []

  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath)

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.next')) {
        traverse(fullPath)
      } else if (extensions.some((ext) => item.endsWith(ext))) {
        files.push(fullPath)
      }
    })
  }

  traverse(dirPath)
  return files
}

// Fix canonical URLs in a file
function fixCanonicalUrls(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // Fix canonical URLs without www
  const canonicalRegex = /https:\/\/prosumely\.com(?!\/www)/g
  if (content.match(canonicalRegex)) {
    content = content.replace(canonicalRegex, 'https://www.prosumely.com')
    changed = true
  }

  // Fix OpenGraph URLs without www
  const ogUrlRegex = /url:\s*['"`]https:\/\/prosumely\.com/g
  if (content.match(ogUrlRegex)) {
    content = content.replace(
      /url:\s*(['"`])https:\/\/prosumely\.com/g,
      'url: $1https://www.prosumely.com',
    )
    changed = true
  }

  // Fix hardcoded URLs in text
  const hardcodedRegex = /'https:\/\/prosumely\.com(?!\/www)/g
  if (content.match(hardcodedRegex)) {
    content = content.replace(hardcodedRegex, "'https://www.prosumely.com")
    changed = true
  }

  if (changed) {
    fs.writeFileSync(filePath, content)
    return true
  }

  return false
}

// Main execution
async function fixAllCanonicalUrls() {
  const srcDir = path.join(process.cwd(), 'src')
  const files = getAllFiles(srcDir, ['.tsx', '.ts'])

  let fixedFiles = 0

  console.log(`📁 Checking ${files.length} files for canonical URL issues...\n`)

  files.forEach((file) => {
    if (fixCanonicalUrls(file)) {
      console.log(`✅ Fixed: ${path.relative(process.cwd(), file)}`)
      fixedFiles++
    }
  })

  console.log(`\n🎯 Fixed canonical URLs in ${fixedFiles} files!`)

  if (fixedFiles > 0) {
    console.log('\n📋 Next steps:')
    console.log('1. Review the changes made')
    console.log('2. Test the site locally')
    console.log('3. Rebuild the site: npm run build')
    console.log('4. Submit updated sitemap to Google Search Console')
  } else {
    console.log('\n✨ No canonical URL issues found!')
  }
}

fixAllCanonicalUrls().catch(console.error)
