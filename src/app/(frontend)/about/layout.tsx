import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About Prosumely | Professional Resume Writing & Career Services',
  description:
    'Learn about Prosumely, your trusted partner in career advancement. We provide professional resume writing, LinkedIn optimization, and career coaching services to help you succeed in your job search.',
  keywords: [
    'about prosumely',
    'resume writing company',
    'career services',
    'professional CV writers',
    'job search assistance',
    'career coaching',
    'resume writing service',
    'LinkedIn optimization',
  ],
  openGraph: {
    title: 'About Prosumely | Professional Resume Writing & Career Services',
    description:
      'Learn about Prosumely, your trusted partner in career advancement. We provide professional resume writing, LinkedIn optimization, and career coaching services to help you succeed in your job search.',
    url: 'https://prosumely.com/about',
    siteName: 'Prosumely',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Prosumely | Professional Resume Writing & Career Services',
    description:
      'Learn about Prosumely, your trusted partner in career advancement. We provide professional resume writing, LinkedIn optimization, and career coaching services.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/about',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return children
}
