import ServiceProductPage from '../../../components/ServiceProductPage'
import { servicesData } from '../../../data/servicesData'

const careerPortfolioPage = () => {
  return <ServiceProductPage {...servicesData.projectPortfolio} />
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
    url: 'https://prosumely.com/project-portfolio',
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
    canonical: 'https://prosumely.com/project-portfolio',
  },
}

export default careerPortfolioPage
