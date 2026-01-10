import React from 'react'
import { Metadata } from 'next'
import LifetimeEarningCalculator from '@/components/career-tools/LifetimeEarningCalculator'

export const metadata: Metadata = {
  title: 'Free Lifetime Earning Potential Calculator - Career Wealth Projection | Prosumely',
  description:
    'Project your total career earnings from now to retirement. Model different scenarios to understand how career decisions impact lifetime wealth and retirement readiness.',
  keywords: [
    'lifetime earnings calculator',
    'career earnings projection',
    'lifetime income calculator',
    'retirement earnings',
    'career wealth calculator',
    'salary projection',
    'lifetime salary calculator',
    'career financial planning',
    'earnings forecast',
    'retirement planning',
    'career income projection',
    'lifetime wealth calculator',
    'career ROI calculator',
    'salary growth calculator',
    'career value calculator',
  ],
  openGraph: {
    title: 'Free Lifetime Earning Potential Calculator - Career Wealth Projection',
    description:
      'Project total career earnings from now to retirement. Model scenarios, analyze decision impacts, and plan for financial success.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/lifetime-earning-calculator',
    images: [
      {
        url: '/media/lifetime-earnings-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Lifetime Earning Potential Calculator',
      },
    ],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/lifetime-earning-calculator',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Lifetime Earning Potential Calculator - Career Wealth Projection',
    description:
      'Project your total career earnings and model different scenarios to maximize lifetime wealth.',
    images: ['/media/lifetime-earnings-og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lifetime Earning Potential Calculator',
  description:
    'Career earnings projection tool that calculates total lifetime income from now to retirement with scenario modeling and decision impact analysis.',
  url: 'https://prosumely.com/career-tools/lifetime-earning-calculator',
  applicationCategory: 'FinanceApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Lifetime earnings projection',
    'Scenario modeling',
    'AI-powered calculations',
    'Decision impact analysis',
    'Wealth building projections',
    'Retirement readiness assessment',
    'Year-by-year breakdown',
  ],
}

export default function LifetimeEarningCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LifetimeEarningCalculator />
    </>
  )
}
