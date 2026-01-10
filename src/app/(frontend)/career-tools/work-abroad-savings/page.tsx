import React from 'react'
import { Metadata } from 'next'
import WorkAbroadSavings from '@/components/career-tools/WorkAbroadSavings'

export const metadata: Metadata = {
  title: 'Work Abroad Savings Calculator - Expat Financial Planning | Prosumely',
  description:
    'Calculate realistic savings potential when working internationally. Free AI-powered tool analyzes income, expenses, remittances, and wealth accumulation. Plan your expat finances with confidence.',
  keywords: [
    'work abroad savings calculator',
    'expat savings calculator',
    'international work calculator',
    'expat financial planning',
    'overseas work savings',
    'work abroad finances',
    'expat salary calculator',
    'international job savings',
    'digital nomad calculator',
    'expat budget calculator',
    'working abroad finances',
    'overseas employment calculator',
    'expat wealth building',
    'international savings',
    'work abroad ROI',
    'expat lifestyle costs',
    'foreign work calculator',
    'overseas contract calculator',
    'expat remittances',
    'international career finances',
  ],
  openGraph: {
    title: 'Work Abroad Savings Calculator - Plan Your Expat Finances',
    description:
      'Free AI tool calculates savings potential for international work. Analyze salary, expenses, remittances, and wealth accumulation. Get realistic financial projections and recommendations for expat success.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/work-abroad-savings',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/work-abroad-savings',
  },
}

const WorkAbroadSavingsPage = () => {
  return <WorkAbroadSavings />
}

export default WorkAbroadSavingsPage
