import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const academicCvWritingPage = () => {
  return <ServiceProductPage {...servicesData.academicCvWriting} />
}

export const metadata = {
  title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
  description:
    "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
  keywords: [
    'academic CV writing',
    'academic resume',
    'PhD CV',
    'research CV',
    'Prosumely',
    'scholarly resume',
    'resume writing',
  ],
  openGraph: {
    title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
    description:
      "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
    url: 'https://prosumely.com/academic-cv-writing-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-academic-cv-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Academic CV Writing Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Academic CV Writing Service | Scholarly Resume Experts | Prosumely's",
    description:
      "Get a detailed, structured academic CV written by Prosumely's experts. Perfect for researchers, professors, and PhD candidates seeking grants, fellowships, or faculty roles.",
    images: ['/prosumely-academic-cv-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/academic-cv-writing-service',
  },
}

export default academicCvWritingPage
