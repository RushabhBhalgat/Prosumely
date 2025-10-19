import React from 'react'
import { Metadata } from 'next'
import CoverLetterGenerator from '@/components/career-tools/CoverLetterGenerator'

export const metadata: Metadata = {
  title: 'Free AI Cover Letter Generator - Create Professional Cover Letters | Prosumely',
  description:
    'Generate tailored, professional cover letters in seconds with our free AI-powered tool. Simply paste your resume and job description to create a compelling cover letter optimized for any role.',
  keywords: [
    'cover letter generator',
    'AI cover letter',
    'free cover letter tool',
    'professional cover letter',
    'job application letter',
    'cover letter writer',
    'automated cover letter',
    'cover letter template',
    'career tools',
  ],
  openGraph: {
    title: 'Free AI Cover Letter Generator - Create Professional Cover Letters',
    description:
      'Generate tailored, professional cover letters in seconds. Our AI analyzes your resume and the job description to create compelling cover letters.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/cover-letter-generator',
    images: [
      {
        url: 'https://prosumely.com/og-cover-letter-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Cover Letter Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Cover Letter Generator - Professional Cover Letters',
    description: 'Generate tailored cover letters instantly with AI. Perfect for job applications.',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/cover-letter-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CoverLetterGeneratorPage() {
  return (
    <>
      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Prosumely Cover Letter Generator',
            description:
              'Free AI-powered cover letter generator that creates professional, tailored cover letters based on your resume and job description.',
            url: 'https://prosumely.com/career-tools/cover-letter-generator',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'AI-powered cover letter generation',
              'Tailored to specific job descriptions',
              'Professional writing quality',
              'Free to use',
              'Instant results',
            ],
            provider: {
              '@type': 'Organization',
              name: 'Prosumely',
              url: 'https://prosumely.com',
            },
          }),
        }}
      />
      <CoverLetterGenerator />
    </>
  )
}
