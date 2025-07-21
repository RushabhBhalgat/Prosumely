import React from 'react'

export const StructuredData = () => {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Prosumely',
    url: 'https://prosumely.com',
    logo: 'https://prosumely.com/prosumely-logo-lg.png',
    description:
      'Professional resume writing services and career consulting to help you land your dream job with ATS-optimized resumes.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-7559112241',
      contactType: 'Customer Service',
      availableLanguage: 'English',
    },
    sameAs: [
      'https://www.facebook.com/prosumely.cv.5/',
      'https://www.linkedin.com/company/prosumely/',
      'https://x.com/prosumely',
      'https://www.youtube.com/@prosumely8704',
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IN',
    },
    areaServed: ['IN', 'US', 'CA', 'AU', 'GB', 'AE', 'SA', 'QA'],
    serviceType: [
      'Resume Writing',
      'CV Writing',
      'Cover Letter Writing',
      'LinkedIn Profile Optimization',
      'Career Consulting',
      'Interview Coaching',
    ],
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Prosumely',
    url: 'https://prosumely.com',
    description: 'Professional resume writing services and career consulting',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://prosumely.com/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Professional Resume Writing Service',
    provider: {
      '@type': 'Organization',
      name: 'Prosumely',
    },
    description:
      'ATS-optimized resume writing services to help professionals land their dream jobs',
    serviceType: 'Resume Writing',
    areaServed: ['Worldwide'],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Resume Writing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ATS Resume Writing',
            description: 'Applicant Tracking System optimized resume writing',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Executive Resume Writing',
            description: 'Professional executive-level resume writing services',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'LinkedIn Profile Optimization',
            description: 'Professional LinkedIn profile makeover and optimization',
          },
        },
      ],
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
    </>
  )
}
