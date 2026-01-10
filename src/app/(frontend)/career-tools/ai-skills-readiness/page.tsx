import React from 'react'
import { Metadata } from 'next'
import AISkillsReadiness from '@/components/career-tools/AISkillsReadiness'

export const metadata: Metadata = {
  title: 'AI Skills Readiness Score - AI Proficiency Assessment | Prosumely',
  description:
    'Evaluate your AI readiness and get a personalized learning path. Free AI-powered assessment measures literacy, tool proficiency, and adaptability. Stay competitive in an AI-augmented workplace with actionable recommendations.',
  keywords: [
    'AI skills assessment',
    'AI readiness score',
    'AI proficiency test',
    'AI literacy evaluation',
    'ChatGPT skills',
    'generative AI proficiency',
    'AI tool assessment',
    'AI learning path',
    'AI career readiness',
    'artificial intelligence skills',
    'AI adoption assessment',
    'AI competency evaluation',
    'prompt engineering skills',
    'AI workflow integration',
    'AI career development',
    'AI upskilling',
    'future of work AI',
    'AI training recommendations',
    'AI benchmark',
    'workplace AI skills',
  ],
  openGraph: {
    title: 'AI Skills Readiness Score - Measure Your AI Proficiency',
    description:
      'Free AI assessment evaluates your readiness for AI-augmented work. Get personalized learning recommendations, industry benchmarks, and actionable plans to master AI tools and stay competitive.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/ai-skills-readiness',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/ai-skills-readiness',
  },
}

const AISkillsReadinessPage = () => {
  return <AISkillsReadiness />
}

export default AISkillsReadinessPage
