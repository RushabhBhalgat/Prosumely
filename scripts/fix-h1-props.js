#!/usr/bin/env node

/**
 * Fix incorrectly added H1 tags with wrong prop usage
 */

import fs from 'fs'
import path from 'path'

console.log('🔧 Fixing H1 tag prop usage...\n')

function getAllPageFiles() {
  const files = []
  const pagesDir = path.join(process.cwd(), 'src', 'app', '(frontend)')

  function traverse(currentPath) {
    const items = fs.readdirSync(currentPath)

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.startsWith('(') && item !== 'form') {
        traverse(fullPath)
      } else if (item === 'page.tsx') {
        files.push(fullPath)
      }
    })
  }

  traverse(pagesDir)
  return files
}

function fixH1Props(filePath) {
  let content = fs.readFileSync(filePath, 'utf8')
  let changed = false

  // Fix level="1" to as="h1"
  if (content.includes('level="1"')) {
    content = content.replace(/level="1"/g, 'as="h1"')
    changed = true
  }

  // Also fix any other incorrect level props
  content = content.replace(/level="([1-6])"/g, 'as="h$1"')

  if (changed) {
    fs.writeFileSync(filePath, content)
    return true
  }

  return false
}

const pageFiles = getAllPageFiles()
let fixedCount = 0

console.log(`📄 Checking ${pageFiles.length} page files...\n`)

pageFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath)

  if (fixH1Props(filePath)) {
    console.log(`✅ Fixed H1 props in ${relativePath}`)
    fixedCount++
  }
})

console.log(`\n🎯 Fixed H1 props in ${fixedCount} files!`)
