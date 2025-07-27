#!/usr/bin/env node

/**
 * Add noindex metadata to all form pages
 */

import fs from 'fs'
import path from 'path'

const formPages = [
  'academic-cv-writing-service/form',
  'ats-resume-writing-service/form',
  'career-roadmap-service/form',
  'cover-letter-writing-service/form',
  'executive-resume-writing-service/form',
  'interview-coaching-service/form',
  'jobseekers-combo-service/form',
  'linkedin-profile-makeover/form',
  'membership-application-service/form',
  'project-portfolio/form',
  'sop-writing-service/form',
  'visual-resume-writing-service/form',
]

function addMetadataToFormPage(formPath, serviceName) {
  const filePath = path.join(process.cwd(), 'src', 'app', '(frontend)', formPath, 'page.tsx')

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${filePath}`)
    return false
  }

  let content = fs.readFileSync(filePath, 'utf8')

  // Check if metadata already exists
  if (content.includes('export const metadata')) {
    console.log(`✅ Metadata already exists: ${formPath}`)
    return false
  }

  // Add import for Metadata type if not present
  if (!content.includes('import { Metadata }')) {
    content = content.replace(
      /import\s+MyFormComponent/,
      `import { Metadata } from 'next'\nimport MyFormComponent`,
    )
  }

  // Add metadata export before the default export
  const metadataExport = `
export const metadata: Metadata = {
  title: '${serviceName} Form | Prosumely',
  description: 'Complete your ${serviceName.toLowerCase()} request form.',
  robots: {
    index: false,
    follow: false,
  },
}

`

  content = content.replace(
    /export default async function/,
    metadataExport + 'export default async function',
  )

  fs.writeFileSync(filePath, content)
  return true
}

console.log('🔧 Adding noindex metadata to form pages...\n')

const serviceNames = {
  'academic-cv-writing-service/form': 'Academic CV Writing Service',
  'ats-resume-writing-service/form': 'ATS Resume Writing Service',
  'career-roadmap-service/form': 'Career Roadmap Service',
  'cover-letter-writing-service/form': 'Cover Letter Writing Service',
  'executive-resume-writing-service/form': 'Executive Resume Writing Service',
  'interview-coaching-service/form': 'Interview Coaching Service',
  'jobseekers-combo-service/form': 'Job Seekers Combo Service',
  'linkedin-profile-makeover/form': 'LinkedIn Profile Makeover',
  'membership-application-service/form': 'Membership Application Service',
  'project-portfolio/form': 'Project Portfolio Service',
  'sop-writing-service/form': 'SOP Writing Service',
  'visual-resume-writing-service/form': 'Visual Resume Writing Service',
}

let updatedCount = 0

formPages.forEach((formPath) => {
  const serviceName = serviceNames[formPath]
  if (addMetadataToFormPage(formPath, serviceName)) {
    console.log(`✅ Added metadata: ${formPath}`)
    updatedCount++
  }
})

console.log(`\n🎯 Updated ${updatedCount} form pages with noindex metadata!`)
console.log('These pages will no longer appear in search results.')
