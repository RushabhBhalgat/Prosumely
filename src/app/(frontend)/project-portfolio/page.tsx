import dynamic from 'next/dynamic'
import { Suspense } from 'react'

import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const ProjectPortfolioPageContent = dynamic(
  () => import('../../../components/industry-content/ProjectPortfolioPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const ProjectPortfolioPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Project Portfolio Development</PageHeading>Loading...
        </div>
      }
    >
      <ProjectPortfolioPageContent />
    </Suspense>
  )
}

export const metadata = {
  title: 'Project Portfolio Service | Showcase Your Work | Prosumely',
  description:
    'Showcase your expertise with a professional project portfolio from Prosumely. Perfect for tech, design, construction, and freelance professionals. Boost your career with a standout portfolio.',
  keywords: [
    'project portfolio',
    'portfolio service',
    'resume portfolio',
    'professional portfolio',
    'Prosumely',
    'job search',
    'resume writing',
  ],
  openGraph: {
    title: 'Project Portfolio Service | Showcase Your Work | Prosumely',
    description:
      'Showcase your expertise with a professional project portfolio from Prosumely. Perfect for tech, design, construction, and freelance professionals. Boost your career with a standout portfolio.',
    url: 'https://www.prosumely.com/project-portfolio',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-project-portfolio-services-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Project Portfolio Service',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Project Portfolio Service | Showcase Your Work | Prosumely',
    description:
      'Showcase your expertise with a professional project portfolio from Prosumely. Perfect for tech, design, construction, and freelance professionals. Boost your career with a standout portfolio.',
    images: ['/prosumely-project-portfolio-services-opengraph.jpg'],
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/project-portfolio',
  },
}

export default ProjectPortfolioPage
