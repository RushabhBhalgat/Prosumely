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

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What factors affect lifetime earnings the most?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The biggest factors are: (1) Industry choice (tech, finance, healthcare pay significantly more than retail, hospitality), (2) Promotion frequency (every 3-5 years vs. staying stagnant), (3) Annual raises (3% vs. 5-7% makes a huge difference over decades), (4) Career breaks (extended unemployment reduces cumulative earnings), and (5) Geographic location (coastal cities pay 30-50% more than rural areas for the same roles).',
      },
    },
    {
      '@type': 'Question',
      name: 'How do promotions change career earnings over a lifetime?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Promotions are the fastest way to increase lifetime earnings. Each promotion typically brings a 10-20% salary increase. If you get promoted every 3-4 years (vs. every 6-7 years), you could earn an additional $500K-$1M+ over your career. Senior-level promotions (Director, VP, C-Suite) can add $2M-$5M to lifetime income.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does changing careers increase lifetime earnings?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'It depends. Switching to higher-paying industries (e.g., from education to tech) can increase lifetime earnings by $500K-$1M+. However, career changes often come with temporary salary resets (10-20% lower starting pay). The key is ensuring your new career has higher long-term growth potential and faster salary progression.',
      },
    },
    {
      '@type': 'Question',
      name: 'How accurate is a lifetime earning calculator?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Lifetime earning calculators provide estimates, not guarantees. Accuracy depends on assumptions about salary growth, promotions, and career trajectory. Our tool uses AI analysis of industry benchmarks, but real-world earnings vary based on performance, economic conditions, negotiation skills, and opportunities pursued.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the average lifetime earning potential in the US?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The average US worker earns approximately $1.7-$2.5M over their lifetime (pre-tax). However, this varies dramatically by education: high school graduates average $1.3M, bachelor's degree holders average $2.3M, and master's degree holders average $2.7M. Professionals in high-earning fields (doctors, lawyers, engineers, finance) can earn $5M-$10M+ over their careers.",
      },
    },
  ],
}

export default function LifetimeEarningCalculatorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LifetimeEarningCalculator />
    </>
  )
}
