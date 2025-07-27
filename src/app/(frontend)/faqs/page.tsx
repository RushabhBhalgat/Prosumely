import React from 'react'
import { allFAQs } from '@/data/faqData'
import { PageHeading } from '@/components/SEO/PageHeading'
import PageClient from './page.client'
import FAQPageContent from './FAQPageContent'

export const metadata = {
  title: 'Frequently Asked Questions | Prosumely',
  description:
    "Find answers to all your questions about Prosumely's professional resume writing, career coaching, and job search services. Get expert help today.",
  keywords: [
    'FAQ',
    'frequently asked questions',
    'resume writing help',
    'career services questions',
    'Prosumely support',
    'job search help',
  ],
  openGraph: {
    title: 'Frequently Asked Questions | Prosumely',
    description:
      "Find answers to all your questions about Prosumely's professional resume writing, career coaching, and job search services.",
    url: 'https://www.prosumely.com/faqs',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely FAQs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Frequently Asked Questions | Prosumely',
    description:
      "Find answers to all your questions about Prosumely's professional resume writing, career coaching, and job search services.",
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/faqs',
  },
}

export default function FAQsPage() {
  return (
    <>
      <PageClient />
      <FAQPageContent faqs={allFAQs} />
    </>
  )
}
