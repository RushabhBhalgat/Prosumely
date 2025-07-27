#!/usr/bin/env node

/**
 * Check for broken images and large image files
 */

import fs from 'fs'
import path from 'path'

console.log('🖼️  Checking for image issues...\n')

function getAllFiles(dirPath, extensions) {
  const files = []

  function traverse(currentPath) {
    if (!fs.existsSync(currentPath)) return

    const items = fs.readdirSync(currentPath)

    items.forEach((item) => {
      const fullPath = path.join(currentPath, item)
      const stat = fs.statSync(fullPath)

      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('.next')) {
        traverse(fullPath)
      } else if (extensions.some((ext) => item.toLowerCase().endsWith(ext))) {
        files.push(fullPath)
      }
    })
  }

  traverse(dirPath)
  return files
}

function checkImageReferences() {
  console.log('📋 Checking for broken image references...\n')

  const srcFiles = getAllFiles(path.join(process.cwd(), 'src'), ['.tsx', '.ts', '.js', '.jsx'])
  const publicImages = getAllFiles(path.join(process.cwd(), 'public'), [
    '.jpg',
    '.jpeg',
    '.png',
    '.svg',
    '.webp',
    '.gif',
  ])

  const imageRefs = new Set()
  const brokenRefs = []

  srcFiles.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8')

    // Find image references
    const matches = content.match(
      /(?:src|href|url)\s*[:=]\s*['"`]([^'"`]+\.(?:jpg|jpeg|png|svg|webp|gif))[^'"`]*['"`]/gi,
    )

    if (matches) {
      matches.forEach((match) => {
        const urlMatch = match.match(/['"`]([^'"`]+)['"`]/)
        if (urlMatch) {
          const imgPath = urlMatch[1]

          // Skip external URLs
          if (imgPath.startsWith('http')) return

          imageRefs.add(imgPath)

          // Check if file exists in public directory
          const publicPath = path.join(process.cwd(), 'public', imgPath.replace(/^\//, ''))
          if (!fs.existsSync(publicPath)) {
            brokenRefs.push({
              image: imgPath,
              file: path.relative(process.cwd(), file),
            })
          }
        }
      })
    }
  })

  if (brokenRefs.length > 0) {
    console.log(`❌ Found ${brokenRefs.length} broken image references:`)
    brokenRefs.forEach((ref) => {
      console.log(`   ${ref.image} (referenced in ${ref.file})`)
    })
  } else {
    console.log('✅ No broken image references found')
  }

  return brokenRefs
}

function checkImageSizes() {
  console.log('\n📏 Checking for large image files...\n')

  const publicImages = getAllFiles(path.join(process.cwd(), 'public'), [
    '.jpg',
    '.jpeg',
    '.png',
    '.svg',
    '.webp',
    '.gif',
  ])
  const largeImages = []
  const maxSize = 500 * 1024 // 500KB

  publicImages.forEach((imagePath) => {
    const stat = fs.statSync(imagePath)
    const sizeKB = Math.round(stat.size / 1024)

    if (stat.size > maxSize) {
      largeImages.push({
        path: path.relative(process.cwd(), imagePath),
        size: sizeKB,
      })
    }
  })

  if (largeImages.length > 0) {
    console.log(`⚠️  Found ${largeImages.length} large images (>500KB):`)
    largeImages.sort((a, b) => b.size - a.size)
    largeImages.forEach((img) => {
      console.log(`   ${img.path} (${img.size}KB)`)
    })

    console.log('\n💡 Optimization suggestions:')
    console.log('   - Use WebP format for better compression')
    console.log('   - Resize images to appropriate dimensions')
    console.log('   - Use Next.js Image component for automatic optimization')
  } else {
    console.log('✅ No oversized images found')
  }

  return largeImages
}

function generateImageOptimizationReport(brokenRefs, largeImages) {
  const report = `# Image Optimization Report

## Broken Image References (${brokenRefs.length})

${
  brokenRefs.length > 0
    ? brokenRefs.map((ref) => `- **${ref.image}** (referenced in \`${ref.file}\`)`).join('\n')
    : '✅ No broken image references found'
}

## Large Images (${largeImages.length})

${
  largeImages.length > 0
    ? largeImages.map((img) => `- **${img.path}** (${img.size}KB)`).join('\n')
    : '✅ No oversized images found'
}

## Recommendations

### For Broken Images:
1. Check if image files exist in the public directory
2. Verify image paths are correct (relative to /public)
3. Update references to use correct paths
4. Add missing images or remove broken references

### For Large Images:
1. **Convert to WebP**: Use modern format for better compression
2. **Resize appropriately**: Scale down images to required display size
3. **Use Next.js Image component**: Enables automatic optimization
4. **Consider lazy loading**: Load images only when needed

### Implementation:
\`\`\`tsx
import Image from 'next/image'

// Instead of:
<img src="/large-image.jpg" alt="Description" />

// Use:
<Image 
  src="/large-image.jpg" 
  alt="Description"
  width={800}
  height={600}
  loading="lazy"
  quality={85}
/>
\`\`\`

### Tools for Optimization:
- **ImageOptim** (Mac) or **TinyPNG** (Web) for compression
- **Sharp** CLI for batch processing
- **Squoosh** (Web) for manual optimization
- **Next.js Image Optimization** (automatic)

## Next Steps:
1. Fix broken image references
2. Optimize large images
3. Update components to use Next.js Image component
4. Test images load correctly
5. Verify performance improvements
`

  fs.writeFileSync(path.join(process.cwd(), 'IMAGE_OPTIMIZATION_REPORT.md'), report)
  console.log('\n📝 Image optimization report saved to IMAGE_OPTIMIZATION_REPORT.md')
}

// Run checks
const brokenRefs = checkImageReferences()
const largeImages = checkImageSizes()

generateImageOptimizationReport(brokenRefs, largeImages)

console.log('\n🎯 Image check complete!')
if (brokenRefs.length > 0 || largeImages.length > 0) {
  console.log('📋 Review the IMAGE_OPTIMIZATION_REPORT.md file for detailed recommendations.')
}
