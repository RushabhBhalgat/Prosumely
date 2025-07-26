import MembershipApplicationPageContent from '../../../components/industry-content/MembershipApplicationPageContent'
import { Suspense } from 'react'

const MembershipApplicationPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MembershipApplicationPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Membership Application Service | Professional Associations | Prosumely',
  description:
    'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
  keywords: [
    'membership application',
    'professional association',
    'industry membership',
    'academic society',
    'Prosumely',
    'resume writing',
    'career advancement',
  ],
  openGraph: {
    title: 'Membership Application Service | Professional Associations | Prosumely',
    description:
      'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
    url: 'https://prosumely.com/membership-application-service',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-membership-application-service-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Membership Application Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Membership Application Service | Professional Associations | Prosumely',
    description:
      'Get expert help with your membership application for elite professional bodies, industry associations, and academic societies. Prosumely positions you for acceptance and career growth.',
    images: ['/prosumely-membership-application-service-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/membership-application-service',
  },
}

export default MembershipApplicationPage
