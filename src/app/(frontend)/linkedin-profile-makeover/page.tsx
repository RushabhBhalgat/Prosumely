import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const ATSResumePage = () => {
  return <ServiceProductPage {...servicesData.linkedinProfile} />
}

export const metadata = {
  title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
  description:
    "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
  keywords: [
    'LinkedIn profile makeover',
    'LinkedIn optimization',
    'professional branding',
    'Prosumely',
    'resume writing',
    'job search',
    'career growth',
  ],
  openGraph: {
    title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
    description:
      "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
    url: 'https://prosumely.com/linkedin-profile-makeover',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-linkedin-profile-makeover-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely LinkedIn Profile Makeover',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Profile Makeover | Professional Branding | Prosumely',
    description:
      "Transform your LinkedIn profile with Prosumely's expert makeover service. Attract recruiters, boost your professional presence, and get noticed for top job opportunities.",
    images: ['/prosumely-linkedin-profile-makeover-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/linkedin-profile-makeover',
  },
}

export default ATSResumePage
