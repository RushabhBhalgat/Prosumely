import React from 'react'
import { Metadata } from 'next'
import CareerTransitionCalculator from '@/components/career-tools/CareerTransitionCalculator'

export const metadata: Metadata = {
  title: 'Career Transition Feasibility Calculator - Risk Assessment Tool | Prosumely',
  description:
    'Free AI-powered career change feasibility calculator. Get objective assessment of skill transferability, market demand, financial viability, and risk analysis. Receive detailed transition plan with timeline and milestones for your career pivot.',
  keywords: [
    'career transition calculator',
    'career change feasibility',
    'career pivot tool',
    'career change assessment',
    'career switch planner',
    'job transition analysis',
    'career change risk',
    'skill transferability',
    'career change roadmap',
    'career planning tool',
    'professional transition',
    'career switch calculator',
    'job change planner',
    'career pivot assessment',
    'transition planning',
    'career change success',
    'skill gap analysis',
    'career change timeline',
    'career transformation',
    'industry switch planner',
  ],
  openGraph: {
    title: 'Career Transition Feasibility Calculator - Plan Your Career Change',
    description:
      'Free AI tool evaluates your career change feasibility with risk assessment, skill analysis, and detailed transition roadmap. Get go/no-go recommendation with mitigation strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/career-transition-calculator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/career-transition-calculator',
  },
}

const CareerTransitionCalculatorPage = () => {
  return <CareerTransitionCalculator />
}

export default CareerTransitionCalculatorPage
