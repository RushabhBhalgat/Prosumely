import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { PageHeading } from '@/components/SEO/PageHeading'

// Dynamic import for large content component
const CareerRoadmapPageContent = dynamic(
  () => import('../../../components/industry-content/CareerRoadmapPageContent'),
  {
    loading: () => (
      <div className="min-h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    ),
  },
)

const CareerRoadmapPage = () => {
  return (
    <Suspense
      fallback={
        <div>
          <PageHeading as="h1">Career Roadmap Consultation</PageHeading>Loading...
        </div>
      }
    >
      <CareerRoadmapPageContent />
    </Suspense>
  )
}

export default CareerRoadmapPage
