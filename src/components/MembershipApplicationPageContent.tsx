'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from './ServiceProductPage'
import { servicesData } from '../data/servicesData'

const MembershipApplicationPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Construction industry specific content
  if (industry === 'construction') {
    const constructionData = {
      ...servicesData.membershipApplication,
      service: {
        ...servicesData.membershipApplication.service,
        title: servicesData.membershipApplication.service.title,
        detailedDescription: [
          "Professional membership in construction industry organizations is crucial for career advancement and credibility. Whether you're applying for membership in engineering institutes, construction management associations, or trade-specific professional bodies, your application must demonstrate both technical competence and commitment to professional excellence.",
          'Our membership application service specializes in construction industry professional organizations. We understand the specific requirements and evaluation criteria used by bodies such as engineering councils, construction management institutes, and specialized trade associations.',
          'From documenting your construction project experience and continuing professional development to articulating your commitment to industry best practices and ethical standards, we ensure your application showcases the professional qualities valued by construction industry membership bodies.',
          "Whether you're seeking chartered status, professional certification, or membership in prestigious construction industry organizations, we help you present a compelling case that demonstrates your contribution to the construction profession and commitment to ongoing professional growth.",
        ].join(' '),
      },
    }

    return (
      <ServiceProductPage
        {...constructionData}
        industrySubtitle="For Construction Industry Professionals"
      />
    )
  }

  // Default content for all other cases
  return <ServiceProductPage {...servicesData.membershipApplication} />
}

export default MembershipApplicationPageContent
