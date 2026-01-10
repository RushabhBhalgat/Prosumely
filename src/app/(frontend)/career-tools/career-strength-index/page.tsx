import React from 'react'
import { Metadata } from 'next'
import CareerStrengthIndex from '@/components/career-tools/CareerStrengthIndex'

export const metadata: Metadata = {
  title: 'Free Career Strength Index - 360° Career Assessment | Prosumely',
  description:
    'Comprehensive career health assessment. Evaluate your career strength across 7 dimensions: skills, experience, education, network, brand, market demand, and momentum. Get personalized action plan and competitive insights.',
  keywords: [
    'career strength index',
    'career assessment',
    'career health',
    'career evaluation',
    'professional assessment',
    'career competitiveness',
    'career analysis',
    '360 career review',
    'career positioning',
    'career development',
    'career planning',
    'career benchmarking',
    'career strengths',
    'career gaps',
    'career action plan',
    'professional development',
    'career momentum',
    'career market value',
  ],
  openGraph: {
    title: 'Free Career Strength Index - 360° Career Assessment',
    description:
      'Get a comprehensive 360-degree assessment of your career health and competitiveness. Evaluate skills, experience, network, brand, and market demand. Receive personalized action plan with quick wins and long-term strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/career-strength-index',
    images: [
      {
        url: '/media/career-strength-index-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Career Strength Index Tool',
      },
    ],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/career-strength-index',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Career Strength Index - 360° Career Assessment',
    description:
      'Comprehensive career health assessment across 7 dimensions with AI-powered insights and personalized action plan.',
    images: ['/media/career-strength-index-og.jpg'],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Career Strength Index',
  description:
    'Comprehensive 360-degree career health assessment tool evaluating skills, experience, network, brand, and market demand with AI-powered insights.',
  url: 'https://prosumely.com/career-tools/career-strength-index',
  applicationCategory: 'BusinessApplication',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    '360-degree career assessment',
    'AI-powered analysis',
    '7 dimension evaluation',
    'Personalized action plan',
    'Competitive benchmarking',
    'Quick wins identification',
    'Long-term strategy recommendations',
  ],
}

export default function CareerStrengthIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CareerStrengthIndex />
    </>
  )
}
