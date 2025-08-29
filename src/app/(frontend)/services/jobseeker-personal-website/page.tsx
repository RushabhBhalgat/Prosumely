import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import ServiceProductPage from '@/components/ServiceProductPage'

const serviceData = limitedServicesData.jobseekerPersonalWebsite

export const metadata: Metadata = {
  title: "Jobseeker's Personal Website | Professional Digital Brand Hub | Prosumely",
  description:
    'Create your professional personal website with domain, design, SEO, and maintenance. Establish your digital presence for $300 + $10/month maintenance.',
  openGraph: {
    title: "Jobseeker's Personal Website | Professional Digital Brand Hub | Prosumely",
    description:
      'Professional personal website with custom domain, design, SEO optimization, and ongoing maintenance for career advancement.',
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Personal Website Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Jobseeker's Personal Website | Professional Digital Brand Hub | Prosumely",
    description:
      'Professional personal website with custom domain, design, SEO optimization, and ongoing maintenance.',
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/services/jobseeker-personal-website',
  },
}

export default function JobseekerPersonalWebsitePage() {
  return <ServiceProductPage {...serviceData} />
}
