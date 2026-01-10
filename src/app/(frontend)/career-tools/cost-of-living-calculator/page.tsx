import React from 'react'
import { Metadata } from 'next'
import CostOfLivingCalculator from '@/components/career-tools/CostOfLivingCalculator'

export const metadata: Metadata = {
  title: 'Global Cost of Living Calculator - Compare Cities Worldwide | Prosumely',
  description:
    'Free comprehensive cost of living calculator comparing expenses across countries, states, and cities. Get detailed breakdowns of housing, transportation, food, healthcare, taxes, and lifestyle costs. Make informed relocation decisions.',
  keywords: [
    'cost of living calculator',
    'cost comparison tool',
    'city cost comparison',
    'relocation calculator',
    'cost of living by city',
    'international cost comparison',
    'salary comparison',
    'housing costs',
    'living expenses',
    'remote work location',
    'expat calculator',
    'digital nomad costs',
    'city comparison',
    'relocation planning',
    'cost of living index',
    'salary equivalent',
    'purchasing power',
    'global cost comparison',
    'lifestyle costs',
    'moving abroad calculator',
  ],
  openGraph: {
    title: 'Global Cost of Living Calculator - Compare Cities & Make Smart Decisions',
    description:
      'Free tool to compare living costs across global cities. Detailed breakdowns of housing, transportation, food, healthcare, and more. Perfect for remote workers, expats, and career planners.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/cost-of-living-calculator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/cost-of-living-calculator',
  },
}

const CostOfLivingCalculatorPage = () => {
  return <CostOfLivingCalculator />
}

export default CostOfLivingCalculatorPage
