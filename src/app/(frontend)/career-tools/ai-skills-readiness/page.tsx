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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is an AI Skills Readiness Score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An AI Skills Readiness Score measures your proficiency with AI tools, your understanding of AI concepts, and your ability to integrate AI into your work effectively. Our assessment evaluates four key dimensions: AI literacy (understanding how AI works), tool proficiency (hands-on experience with ChatGPT, Copilot, etc.), integration skills (applying AI to solve real problems), and adaptability (keeping up with rapid AI advancements).',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does AI readiness matter for my career?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI is transforming every industry. Professionals who master AI tools are 30-50% more productive, command higher salaries, and have better career prospects. Recruiters increasingly prioritize AI skills, and job postings mentioning "AI proficiency" have grown 200%+ in 2024-2026. Being AI-ready future-proofs your career and makes you indispensable to employers.',
      },
    },
    {
      '@type': 'Question',
      name: 'How can I improve my AI readiness score?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Start by using AI tools daily: ChatGPT for writing/research, GitHub Copilot for coding, or Midjourney for design. Take online courses (Coursera, LinkedIn Learning) on prompt engineering and AI fundamentals. Join AI communities (Reddit, Discord) to learn from power users. Most importantly, experiment with AI in your actual work—the best learning comes from solving real problems.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do recruiters care about AI skills?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Absolutely. In 2026, 75% of hiring managers report asking about AI experience during interviews, especially for roles in marketing, tech, consulting, and content creation. However, they also worry about candidates who rely on AI blindly without critical thinking. The key is demonstrating that you use AI as a productivity multiplier—not a replacement for expertise.',
      },
    },
  ],
}

const AISkillsReadinessPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AISkillsReadiness />
    </>
  )
}

export default AISkillsReadinessPage
