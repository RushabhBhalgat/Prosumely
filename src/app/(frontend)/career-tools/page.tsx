import React from 'react'
import { CareerToolsPageContent } from '@/components/CareerToolsPageContent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Career Tools - AI-Powered Job Search Resources | Prosumely',
  description:
    'Free AI-powered career tools to boost your job search. Generate cover letters, LinkedIn profiles, identify resume gaps, explore global opportunities, extract job keywords, analyze salaries, compare offers, plan retirement, get job recommendations, plan career roadmaps, calculate freelance rates, identify future skills, compare cost of living, assess career transitions, calculate certification ROI, evaluate AI readiness, and plan expat finances.',
  keywords: [
    'career tools',
    'job search tools',
    'AI cover letter generator',
    'resume gap analyzer',
    'global job opportunities',
    'ATS resume scanner',
    'keyword finder',
    'resume analyzer',
    'salary analyzer',
    'salary comparison tool',
    'retirement planning calculator',
    'pension calculator',
    'next job recommender',
    'career move suggestions',
    'career roadmap generator',
    'career progression planner',
    'free career resources',
    'job description analyzer',
    'career planning tools',
    'leadership assessment',
    'salary expectations',
    'freelance rate calculator',
    'freelance pricing tool',
    'pricing strategy',
    'hourly rate calculator',
    'project pricing',
    'retainer pricing',
    'freelance income calculator',
    'LinkedIn profile generator',
    'LinkedIn optimization tool',
    'LinkedIn content creator',
    'professional profile writer',
    'future skills',
    'emerging skills',
    'cost of living calculator',
    'career transition calculator',
    'career change assessment',
    'skill forecasting',
    'certification ROI calculator',
    'certification investment analysis',
    'AI skills assessment',
    'AI readiness score',
    'AI proficiency test',
    'work abroad calculator',
    'expat savings calculator',
    'international work planning',
    'retirement readiness index',
    'multi-country salary comparison',
    'AI job matching',
  ],
  openGraph: {
    title: 'Free Career Tools - AI-Powered Job Search Resources',
    description:
      'Free AI-powered career tools: Cover letter generator, LinkedIn profile creator, resume gap identifier, salary comparison tool, retirement readiness calculator, next job recommender, career roadmap planner, freelance rate calculator, global opportunity heatmap, certification ROI calculator, AI skills readiness score, work abroad savings calculator, and more. Boost your job search success.',
    type: 'website',
    url: 'https://prosumely.com/career-tools',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools',
  },
}

const CareerTools = () => {
  return <CareerToolsPageContent />
}

export default CareerTools
