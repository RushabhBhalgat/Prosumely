import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Impact Stories | Real Success Stories | Prosumely',
  description:
    "Read real success stories from professionals worldwide who transformed their careers with Prosumely's expert resume writing and career services. Get inspired by their journeys.",
  keywords: [
    'success stories',
    'career transformation',
    'resume writing success',
    'job search success',
    'professional growth',
    'career development',
    'LinkedIn optimization results',
    'interview success',
    'salary increase',
    'career change',
    'international careers',
    'executive careers',
    'tech careers',
    'healthcare careers',
    'finance careers',
  ],
  openGraph: {
    title: 'Impact Stories | Real Success Stories | Prosumely',
    description:
      "Read real success stories from professionals worldwide who transformed their careers with Prosumely's expert resume writing and career services.",
    type: 'website',
    locale: 'en_US',
    siteName: 'Prosumely',
    url: 'https://prosumely.com/impact-stories',
    images: [
      {
        url: '/prosumely-career-blogs.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Impact Stories',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Impact Stories | Real Success Stories | Prosumely',
    description:
      "Read real success stories from professionals worldwide who transformed their careers with Prosumely's expert resume writing and career services.",
    images: ['/prosumely-career-blogs.jpg'],
  },
  alternates: {
    canonical: 'https://prosumely.com/impact-stories',
  },
}

export default function ImpactStoriesLayout({ children }: { children: React.ReactNode }) {
  return children
}
