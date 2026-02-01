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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is a cost of living calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A cost of living calculator is a tool that compares the expenses of living in different cities, states, or countries. It analyzes housing, transportation, food, healthcare, taxes, and lifestyle costs to help you understand how much money you need to maintain your current standard of living in a new location. Our calculator provides detailed breakdowns and equivalent salary recommendations for relocations.',
      },
    },
    {
      '@type': 'Question',
      name: 'How do I compare living costs between cities?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "To compare living costs: (1) Choose your current city and target cities, (2) Enter your household size and lifestyle preferences, (3) Our tool analyzes housing, transportation, food, healthcare, taxes, and other expenses, (4) Review the cost breakdowns and equivalent salary requirements for each city. Key tip: Don't just compare gross salaries—factor in taxes, healthcare costs, and purchasing power.",
      },
    },
    {
      '@type': 'Question',
      name: 'What affects cost of living the most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest factors are: (1) Housing costs (rent/mortgage can be 30-50% of expenses), (2) Healthcare and insurance (varies dramatically between countries), (3) Taxes (income, sales, property taxes), (4) Transportation (car ownership vs. public transit), and (5) Geographic location (urban vs. suburban, coastal vs. inland). In expensive cities like NYC or London, housing alone can be 2-3x higher than mid-sized cities.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much salary increase do I need when relocating?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends on the cost difference. Moving from a low-cost city (e.g., Austin) to a high-cost city (e.g., San Francisco) may require a 40-60% salary increase to maintain the same standard of living. Moving internationally adds complexity—factor in currency exchange, tax treaties, healthcare systems, and visa costs. Use our calculator to get personalized salary equivalent recommendations based on your lifestyle.',
      },
    },
  ],
}

const CostOfLivingCalculatorPage = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CostOfLivingCalculator />
    </>
  )
}

export default CostOfLivingCalculatorPage
