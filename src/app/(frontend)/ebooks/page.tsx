import { Metadata } from 'next'
import { PageHeading } from '@/components/SEO/PageHeading'
import EbooksClient from './EbooksClient'

export const metadata: Metadata = {
  title: 'Free Interview Question Ebooks | Professional Career Resources - Prosumely',
  description:
    'Download free interview question ebooks for various professions including engineering, construction, healthcare, and management. Get expert-crafted questions and answers to ace your next interview.',
  keywords: [
    'interview questions',
    'free ebooks',
    'engineering interview questions',
    'construction interview prep',
    'healthcare interview guide',
    'management interview questions',
    'BIM professional interviews',
    'technical interview preparation',
    'career interview resources',
    'prosumely interview guides',
  ],
  openGraph: {
    title: 'Free Interview Question Ebooks | Professional Career Resources - Prosumely',
    description:
      'Download free interview question ebooks for various professions including engineering, construction, healthcare, and management. Get expert-crafted questions and answers to ace your next interview.',
    url: 'https://www.prosumely.com/ebooks',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://www.prosumely.com/prosumely-interview-coaching-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Free Interview Question Ebooks & Career Resources',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Interview Question Ebooks | Professional Career Resources - Prosumely',
    description:
      'Download free interview question ebooks for various professions including engineering, construction, healthcare, and management. Get expert-crafted questions and answers to ace your next interview.',
    images: ['https://www.prosumely.com/prosumely-interview-coaching-service-opengraph.jpg'],
  },
}

export default function EbooksPage() {
  return <EbooksClient />
}
