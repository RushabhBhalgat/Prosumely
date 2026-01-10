import React from 'react'
import { Metadata } from 'next'
import FutureSkillsIdentifier from '@/components/career-tools/FutureSkillsIdentifier'

export const metadata: Metadata = {
  title: 'Future Skills Identifier - AI Career Trend Analysis | Prosumely',
  description:
    'Discover emerging skills that will be in high demand in the next 2-5 years. Free AI-powered tool identifies future-proof skills based on your industry, role, and career trajectory. Stay ahead of automation and industry evolution.',
  keywords: [
    'future skills',
    'emerging skills',
    'career future-proofing',
    'skill forecasting',
    'career trends',
    'AI skills analysis',
    'job market trends',
    'future of work',
    'skill demand forecast',
    'career planning',
    'professional development',
    'upskilling strategy',
    'skill gap analysis',
    'career security',
    'industry trends',
    'technology trends',
    'learning pathway',
    'career evolution',
    'skill investment',
    'competitive advantage',
  ],
  openGraph: {
    title: 'Future Skills Identifier - Forecast Career-Critical Skills',
    description:
      'Free AI tool identifies emerging skills for the next 2-5 years. Get personalized skill recommendations, learning pathways, and industry trend analysis to future-proof your career.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/future-skills-identifier',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/future-skills-identifier',
  },
}

const FutureSkillsIdentifierPage = () => {
  return <FutureSkillsIdentifier />
}

export default FutureSkillsIdentifierPage
