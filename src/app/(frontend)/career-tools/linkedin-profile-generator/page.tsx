import React from 'react'
import { Metadata } from 'next'
import LinkedInProfileGenerator from '@/components/career-tools/LinkedInProfileGenerator'

export const metadata: Metadata = {
  title: 'Free LinkedIn Profile Content Generator - AI-Powered Optimization Tool | Prosumely',
  description:
    'Transform your resume into compelling LinkedIn content with our free AI-powered tool. Generate professional headlines, engaging about sections, and ATS-optimized experience descriptions. Get multiple variations tailored to your industry and career goals.',
  keywords: [
    'LinkedIn profile generator',
    'LinkedIn headline generator',
    'LinkedIn about section generator',
    'LinkedIn profile optimization',
    'AI LinkedIn writer',
    'LinkedIn content creator',
    'professional headline generator',
    'LinkedIn summary generator',
    'ATS-optimized LinkedIn',
    'LinkedIn profile writer',
    'free LinkedIn tool',
    'LinkedIn optimization tool',
    'career profile generator',
    'LinkedIn skills optimizer',
    'professional profile content',
    'LinkedIn bio generator',
    'resume to LinkedIn',
    'LinkedIn profile tips',
    'LinkedIn SEO optimization',
    'recruiter-friendly LinkedIn',
  ],
  openGraph: {
    title: 'Free LinkedIn Profile Content Generator - AI-Powered Tool',
    description:
      'Generate professional LinkedIn headlines, about sections, and experience descriptions with AI. Get multiple variations optimized for ATS and recruiters. Free tool with instant results.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/linkedin-profile-generator',
    images: [
      {
        url: 'https://prosumely.com/media/linkedin-profile-generator-og.jpg',
        width: 1200,
        height: 630,
        alt: 'LinkedIn Profile Content Generator Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free LinkedIn Profile Content Generator',
    description:
      'Transform your resume into compelling LinkedIn content with AI. Generate headlines, about sections, and experience descriptions instantly.',
    images: ['https://prosumely.com/media/linkedin-profile-generator-og.jpg'],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/linkedin-profile-generator',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

// Structured data for SEO
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'LinkedIn Profile Content Generator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web Browser',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  description:
    'AI-powered tool that transforms resumes into compelling, ATS-optimized LinkedIn profile content including headlines, about sections, and experience descriptions.',
  featureList: [
    'AI-powered headline generation',
    'Multiple about section variations',
    'ATS-optimized content',
    'Experience description optimization',
    'Skills prioritization',
    'Featured section suggestions',
    'Multiple tone options',
    'Instant generation',
  ],
  screenshot: 'https://prosumely.com/media/linkedin-profile-generator-screenshot.jpg',
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '1247',
    bestRating: '5',
    worstRating: '1',
  },
  provider: {
    '@type': 'Organization',
    name: 'Prosumely',
    url: 'https://prosumely.com',
  },
}

export default function LinkedInProfileGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <LinkedInProfileGenerator />
    </>
  )
}
