import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const ATSResumePage = () => {
  return <ServiceProductPage {...servicesData.atsResume} />
}

export const metadata = {
  title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
  description:
    "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
  keywords: [
    'ATS resume writing',
    'ATS resume service',
    'applicant tracking system',
    'resume optimization',
    'Prosumely',
    'resume writing',
    'job search',
  ],
  openGraph: {
    title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
    description:
      "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
    url: 'https://prosumely.com/ats-resume-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely ATS Resume Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "ATS Resume Writing Service | Beat the Bots | Prosumely's",
    description:
      "Get an ATS-optimized resume written by Prosumely's experts. Increase your chances of getting shortlisted with keyword-rich, professionally formatted resumes that pass applicant tracking systems.",
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/ats-resume-writing-service',
  },
}

export default ATSResumePage
