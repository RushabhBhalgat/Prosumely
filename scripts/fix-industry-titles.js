#!/usr/bin/env node

/**
 * Fix duplicate "For Construction Industry Professionals" titles
 */

import fs from 'fs'
import path from 'path'

const industryTitles = {
  'AcademicCVWritingPageContent.tsx': 'For Academic & Research Professionals',
  'CoverLetterPageContent.tsx': 'For Healthcare Industry Professionals',
  'CoverLetterWritingPageContent.tsx': 'For Engineering Professionals',
  'InterviewCoachingPageContent.tsx': 'For Technology Industry Professionals',
  'InterviewCoachingPageContent2.tsx': 'For Finance & Banking Professionals',
  'LinkedInProfilePageContent.tsx': 'For Marketing & Sales Professionals',
  'MembershipApplicationPageContent.tsx': 'For Government & Non-Profit Professionals',
  'ProjectPortfolioPageContent.tsx': 'For Creative & Design Professionals',
  'SOPWritingPageContent.tsx': 'For Education Industry Professionals',
  'VisualResumePageContent.tsx': 'For Manufacturing Industry Professionals',
}

console.log('🔧 Fixing duplicate industry titles...\n')

const componentDir = path.join(process.cwd(), 'src', 'components', 'industry-content')

let fixedCount = 0

Object.entries(industryTitles).forEach(([filename, newTitle]) => {
  const filePath = path.join(componentDir, filename)

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filename}`)
    return
  }

  let content = fs.readFileSync(filePath, 'utf8')

  // Replace the duplicate title
  const oldTitle = 'For Construction Industry Professionals'
  if (content.includes(oldTitle)) {
    content = content.replace(new RegExp(oldTitle, 'g'), newTitle)
    fs.writeFileSync(filePath, content)
    console.log(`✅ Updated ${filename}: "${newTitle}"`)
    fixedCount++
  } else {
    console.log(`ℹ️  No duplicate title found in ${filename}`)
  }
})

console.log(`\n🎯 Fixed ${fixedCount} duplicate industry titles!`)
