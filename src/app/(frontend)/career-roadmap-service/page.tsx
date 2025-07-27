import { Suspense } from 'react'
import { PageHeading } from '@/components/SEO/PageHeading'
import CareerRoadmapPageContent from '../../../components/industry-content/CareerRoadmapPageContent'

const CareerRoadmapPage = () => {
  return (
    <Suspense fallback={<div>
      <PageHeading as="h1">Career Roadmap Consultation</PageHeading>Loading...</div>}>
      <CareerRoadmapPageContent />
    </Suspense>
  )
}

export default CareerRoadmapPage
