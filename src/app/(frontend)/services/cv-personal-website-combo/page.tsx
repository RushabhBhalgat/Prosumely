import type { Metadata } from 'next'
import { limitedServicesData } from '@/data/limitedServicesData'
import ServiceProductPage from '@/components/ServiceProductPage'

const serviceData = limitedServicesData.cvPersonalWebsiteCombo

export const metadata: Metadata = {
  title: 'CV and Personal Website Combo | Ultimate Personal Branding Package | Prosumely',
  description:
    'Ultimate personal branding package: Executive CV, Cover Letter, LinkedIn makeover, Project Portfolio, and Professional Website for $400 + $10/month maintenance.',
  openGraph: {
    title: 'CV and Personal Website Combo | Ultimate Personal Branding Package | Prosumely',
    description:
      'Complete personal branding solution with CV, cover letter, LinkedIn optimization, portfolio, and professional website.',
    images: [
      {
        url: '/prosumely-pricing-and-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely CV and Personal Website Combo Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CV and Personal Website Combo | Ultimate Personal Branding Package | Prosumely',
    description:
      'Complete personal branding solution with CV, cover letter, LinkedIn optimization, portfolio, and professional website.',
    images: ['/prosumely-pricing-and-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/services/cv-personal-website-combo',
  },
}

export default function CvPersonalWebsiteComboPage() {
  return <ServiceProductPage {...serviceData} />
}
