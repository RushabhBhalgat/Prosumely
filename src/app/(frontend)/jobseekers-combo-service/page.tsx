import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const jobseekersComboPage = () => {
  return <ServiceProductPage {...servicesData.jobseekersCombo} />
}

export const metadata = {
  title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
  description:
    "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
  keywords: [
    'jobseekers combo',
    'career kit',
    'ATS resume',
    'executive CV',
    'cover letter',
    'LinkedIn profile',
    'career roadmap',
    'Prosumely',
    'resume writing',
    'job search',
  ],
  openGraph: {
    title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
    description:
      "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
    url: 'https://prosumely.com/jobseekers-combo-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-jobseekers-combo-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Jobseekers Combo Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jobseekers Combo Service | Complete Career Kit | Prosumely',
    description:
      "Get the ultimate jobseekers combo: ATS resume, executive CV, cover letter, LinkedIn profile, and a personalized career roadmap. Prosumely's all-in-one package for job search success.",
    images: ['/prosumely-jobseekers-combo-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/jobseekers-combo-service',
  },
}

export default jobseekersComboPage
