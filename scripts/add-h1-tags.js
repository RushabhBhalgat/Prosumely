#!/usr/bin/env node

/**
 * Check for missing H1 tags and add them where needed
 */

import fs from 'fs'
import path from 'path'

console.log('🔍 Checking for missing H1 tags...\n')

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

function checkForH1(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  // Check for H1 tags in various formats
  const h1Patterns = [
    /<h1[^>]*>/i,
    /className.*h1/i,
    /'h1'/i,
    /"h1"/i,
    /as="h1"/i,
    /as='h1'/i,
    /<Heading[^>]*level="1"/i,
    /<Heading[^>]*level='1'/i,
    /<PageHeading/i, // Custom component we created
  ]

  const hasH1 = h1Patterns.some((pattern) => pattern.test(content))
  return hasH1
}

function addH1ToPage(filePath) {
  const content = fs.readFileSync(filePath, 'utf8')

  // Get page name from path for default H1
  const relativePath = path.relative(path.join(process.cwd(), 'src', 'app', '(frontend)'), filePath)
  const pageName = path.dirname(relativePath)

  // Generate appropriate H1 based on page name
  const h1Map = {
    '.': 'Professional Resume Writing Services', // Home page
    about: 'About Prosumely',
    services: 'Our Services',
    pricing: 'Pricing & Packages',
    contact: 'Contact Us',
    testimonials: 'Client Testimonials',
    faqs: 'Frequently Asked Questions',
    ebooks: 'Free Career Resources',
    events: 'Upcoming Events',
    newsroom: 'Career Insights & News',
    'impact-stories': 'Success Stories',
    search: 'Search Results',
    'terms-and-conditions': 'Terms and Conditions',
    'privacy-policy': 'Privacy Policy',
    'cancellation-and-refund': 'Cancellation and Refund Policy',
    'academic-cv-writing-service': 'Academic CV Writing Service',
    'ats-resume-writing-service': 'ATS Resume Writing Service',
    'cover-letter-writing-service': 'Cover Letter Writing Service',
    'executive-resume-writing-service': 'Executive Resume Writing Service',
    'interview-coaching-service': 'Interview Coaching Service',
    'linkedin-profile-makeover': 'LinkedIn Profile Optimization',
    'project-portfolio': 'Project Portfolio Development',
    'visual-resume-writing-service': 'Visual Resume Design Service',
    'sop-writing-service': 'Statement of Purpose Writing',
    'jobseekers-combo-service': 'Job Seekers Combo Package',
    'membership-application-service': 'Membership Application Service',
    'career-roadmap-service': 'Career Roadmap Consultation',
    'free-resume-review': 'Free Resume Review',
  }

  const h1Text =
    h1Map[pageName] ||
    `${pageName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')}`

  // Import PageHeading component if not already imported
  let updatedContent = content

  if (!content.includes('PageHeading')) {
    // Add import
    updatedContent = updatedContent.replace(
      /import\s+[^}]+}\s+from\s+['"][^'"]+['"]\s*\n/,
      `$&import { PageHeading } from '@/components/SEO/PageHeading'\n`,
    )
  }

  // Find the first JSX element and add H1 after it
  const jsxMatch = updatedContent.match(/return\s*\(\s*<[^>]+>/)
  if (jsxMatch) {
    const insertPoint = updatedContent.indexOf(jsxMatch[0]) + jsxMatch[0].length
    const beforeInsert = updatedContent.substring(0, insertPoint)
    const afterInsert = updatedContent.substring(insertPoint)

    updatedContent =
      beforeInsert + `\n      <PageHeading level="1">${h1Text}</PageHeading>` + afterInsert
  }

  fs.writeFileSync(filePath, updatedContent)
  return h1Text
}

const pageFiles = getAllPageFiles()
let missingH1Count = 0
let addedH1Count = 0

console.log(`📄 Checking ${pageFiles.length} page files...\n`)

pageFiles.forEach((filePath) => {
  const relativePath = path.relative(process.cwd(), filePath)
  const hasH1 = checkForH1(filePath)

  if (!hasH1) {
    missingH1Count++
    try {
      const h1Text = addH1ToPage(filePath)
      console.log(`✅ Added H1 to ${relativePath}: "${h1Text}"`)
      addedH1Count++
    } catch (error) {
      console.log(`❌ Failed to add H1 to ${relativePath}: ${error.message}`)
    }
  } else {
    console.log(`✓ H1 found in ${relativePath}`)
  }
})

console.log(`\n📊 Summary:`)
console.log(`   Pages checked: ${pageFiles.length}`)
console.log(`   Missing H1 tags: ${missingH1Count}`)
console.log(`   H1 tags added: ${addedH1Count}`)

if (addedH1Count > 0) {
  console.log(
    `\n⚠️  Note: Please review the added H1 tags and adjust styling/positioning as needed.`,
  )
  console.log(`   The PageHeading component should handle proper SEO formatting.`)
}
