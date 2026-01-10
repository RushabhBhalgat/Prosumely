import React from 'react'
import { Metadata } from 'next'
import WorkLifeBalanceIndex from '@/components/career-tools/WorkLifeBalanceIndex'

export const metadata: Metadata = {
  title: 'Free Work-Life Balance Assessment - Burnout Risk Calculator | Prosumely',
  description:
    'Measure your work-life balance across time, flexibility, stress, health, and satisfaction. Identify burnout risk and get personalized recommendations for improving balance and wellness.',
  keywords: [
    'work life balance',
    'work life balance assessment',
    'burnout assessment',
    'burnout risk calculator',
    'wellness assessment',
    'work life balance score',
    'stress assessment',
    'mental health check',
    'work life balance test',
    'burnout prevention',
    'work stress calculator',
    'life satisfaction',
    'work wellness',
    'employee wellbeing',
    'work life harmony',
    'balance calculator',
    'work life integration',
  ],
  openGraph: {
    title: 'Free Work-Life Balance Assessment - Burnout Risk Calculator',
    description:
      'Comprehensive work-life balance assessment measuring time, flexibility, stress, health, and satisfaction. Identify burnout risk and receive personalized wellness recommendations.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/work-life-balance-index',
    images: [
      {
        url: '/media/work-life-balance-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Work-Life Balance Index Tool',
      },
    ],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/work-life-balance-index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Work-Life Balance Assessment - Burnout Risk Calculator',
    description:
      'Measure work-life balance, identify burnout risk, and get personalized wellness recommendations.',
    images: ['/media/work-life-balance-og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Work-Life Balance Index',
  description:
    'Comprehensive work-life balance assessment tool measuring time, flexibility, stress, health, and satisfaction with burnout risk analysis.',
  url: 'https://prosumely.com/career-tools/work-life-balance-index',
  applicationCategory: 'HealthApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Work-life balance assessment',
    'Burnout risk analysis',
    'AI-powered insights',
    '5 dimension evaluation',
    'Personalized recommendations',
    'Wellness action plan',
    'Comparative benchmarking',
  ],
}

export default function WorkLifeBalanceIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <WorkLifeBalanceIndex />
    </>
  )
}
