'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from './ServiceProductPage'
import { servicesData } from '../data/servicesData'

const AcademicCVPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Construction industry specific content
  if (industry === 'construction') {
    const constructionData = {
      ...servicesData.academicCvWriting,
      service: {
        ...servicesData.academicCvWriting.service,
        title: servicesData.academicCvWriting.service.title,
        detailedDescription: [
          "Academic careers in construction-related fields require CVs that demonstrate both scholarly achievement and practical industry relevance. Whether you're pursuing faculty positions in construction management, civil engineering, architecture, or applied research roles in construction technology, your academic CV must showcase the unique intersection of theoretical knowledge and practical application.",
          'Our academic CV writing service specializes in construction and built environment disciplines. We understand how to present research in areas like sustainable construction, building information modeling (BIM), construction safety, project management methodologies, and innovative building technologies in a way that resonates with academic search committees.',
          'From highlighting industry collaborations and applied research projects to showcasing teaching experience in construction programs and professional certifications alongside academic credentials, we create CVs that demonstrate your value as both a scholar and industry expert.',
          "Whether you're targeting research universities, teaching-focused institutions, or industry-academic partnerships, we ensure your CV positions you as a thought leader who bridges the gap between construction academia and professional practice.",
        ].join(' '),
      },
    }

    return (
      <ServiceProductPage
        {...constructionData}
        industrySubtitle="For Construction Industry Academics"
      />
    )
  }

  // Default content for all other cases
  return <ServiceProductPage {...servicesData.academicCvWriting} />
}

export default AcademicCVPageContent
