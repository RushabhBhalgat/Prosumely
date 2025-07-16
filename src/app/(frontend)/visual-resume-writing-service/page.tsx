import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const ATSResumePage = () => {
  return <ServiceProductPage {...servicesData.visualResume} />
}

export const metadata = {
  title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
  description:
    'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
  keywords: [
    'visual resume',
    'ATS resume',
    'resume design',
    'professional CV',
    'Prosumely',
    'job search',
    'resume writing',
  ],
  openGraph: {
    title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
    description:
      'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
    url: 'https://prosumely.com/visual-resume-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Visual Resume Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Visual Resume Writing Service | ATS-Optimized CVs | Prosumely',
    description:
      'Get a visually impactful, ATS-friendly resume designed by Prosumely experts. Stand out to recruiters with a modern, keyword-rich CV that gets you noticed and shortlisted.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/visual-resume-writing-service',
  },
}

export default ATSResumePage
