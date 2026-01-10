import React from 'react'
import { Metadata } from 'next'
import CertificationROICalculator from '@/components/career-tools/CertificationROICalculator'

export const metadata: Metadata = {
  title: 'Certification ROI Calculator - Investment Return Analysis | Prosumely',
  description:
    'Calculate the return on investment for professional certifications. Free AI-powered tool analyzes costs, salary increases, payback period, and career impact. Make data-driven decisions about certification investments.',
  keywords: [
    'certification ROI calculator',
    'certification return on investment',
    'professional certification value',
    'certification cost analysis',
    'certification worth it',
    'PMP ROI',
    'AWS certification value',
    'certification salary increase',
    'certification payback period',
    'professional development ROI',
    'certification market demand',
    'certification investment analysis',
    'learning investment calculator',
    'certification comparison',
    'training ROI calculator',
    'certification value score',
    'career certification planning',
    'certification alternatives',
    'certification risk analysis',
    'upskilling ROI',
  ],
  openGraph: {
    title: 'Certification ROI Calculator - Analyze Training Investment Returns',
    description:
      'Free AI tool calculates ROI for professional certifications. Analyze costs, expected salary increases, payback periods, and market demand. Get personalized recommendations for certification investments.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/certification-roi-calculator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/certification-roi-calculator',
  },
}

const CertificationROICalculatorPage = () => {
  return <CertificationROICalculator />
}

export default CertificationROICalculatorPage
