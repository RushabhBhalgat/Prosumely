import TestimonialsPage from './TestimonialsPage'

export const metadata = {
  title: 'Client Testimonials | Success Stories | Prosumely',
  description:
    'Read real success stories from professionals worldwide who transformed their careers with Prosumely resume writing, LinkedIn optimization, and career coaching services.',
  keywords: [
    'testimonials',
    'client reviews',
    'success stories',
    'resume writing reviews',
    'career transformation',
    'Prosumely reviews',
    'professional testimonials',
    'job search success',
    'career advancement',
    'resume service reviews',
  ],
  openGraph: {
    title: 'Client Testimonials | Success Stories | Prosumely',
    description:
      'Read real success stories from professionals worldwide who transformed their careers with Prosumely resume writing, LinkedIn optimization, and career coaching services.',
    url: 'https://www.prosumely.com/testimonials',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Client Testimonials',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Client Testimonials | Success Stories | Prosumely',
    description:
      'Read real success stories from professionals worldwide who transformed their careers with Prosumely resume writing, LinkedIn optimization, and career coaching services.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/testimonials',
  },
}

export default function TestimonialsPageWrapper() {
  return <TestimonialsPage />
}
