import { Suspense } from 'react'
import CareerRoadmapPageContent from '../../../components/industry-content/CareerRoadmapPageContent'

const CareerRoadmapPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CareerRoadmapPageContent />
    </Suspense>
  )
}

export default CareerRoadmapPage
