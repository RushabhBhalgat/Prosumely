'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '../../data/servicesData'

// Industry-specific content for Career Roadmap Service
const industryContent = {
  'information-technology': {
    title: 'IT Career Roadmap',
    description:
      'Strategic career planning for technology professionals navigating the digital future.',
    detailedDescription: `The IT Career Roadmap is specifically designed for technology professionals who want to strategically navigate their career growth in the rapidly evolving tech industry. This personalized roadmap takes into account your current technical skills, experience level, and career aspirations to create a clear path for advancement in software development, DevOps, data science, cybersecurity, cloud computing, or emerging technologies like AI and machine learning.

Our IT career strategists understand the unique demands and opportunities in the technology sector, helping you identify key certifications, skill development priorities, and strategic career moves that will maximize your earning potential and job satisfaction in the competitive tech landscape.`,
  },
  healthcare: {
    title: 'Healthcare Career Roadmap',
    description:
      'Comprehensive career planning for healthcare professionals dedicated to healing and wellness.',
    detailedDescription: `The Healthcare Career Roadmap is tailored for medical professionals, nurses, healthcare administrators, and allied health workers who want to strategically advance their careers in the healthcare industry. This personalized roadmap considers your clinical experience, educational background, and professional goals to create a clear path for advancement in patient care, healthcare leadership, specialization tracks, or healthcare innovation.

Our healthcare career strategists understand the complex pathways available in healthcare, helping you navigate continuing education requirements, certification opportunities, and strategic career moves that will enhance your impact on patient care while achieving your professional and financial goals in the rewarding healthcare field.`,
  },
  finance: {
    title: 'Finance Career Roadmap',
    description:
      'Strategic career planning for finance professionals maximizing wealth creation opportunities.',
    detailedDescription: `The Finance Career Roadmap is designed for banking professionals, financial analysts, accountants, and investment specialists who want to strategically advance their careers in the financial services industry. This personalized roadmap takes into account your analytical skills, financial expertise, and career ambitions to create a clear path for advancement in investment banking, corporate finance, wealth management, fintech innovation, or financial leadership roles.

Our finance career strategists understand the competitive landscape of the financial industry, helping you identify key certifications like CFA or FRM, skill development priorities, and strategic career moves that will maximize your earning potential and professional recognition in the lucrative finance sector.`,
  },
  construction: {
    title: 'Construction Career Roadmap',
    description:
      'Comprehensive career planning for construction professionals building successful careers.',
    detailedDescription: `The Construction Career Roadmap is specifically crafted for construction workers, project managers, engineers, and supervisors who want to strategically advance their careers in the construction and infrastructure industry. This personalized roadmap considers your hands-on experience, safety certifications, and professional goals to create a clear path for advancement in project management, construction supervision, specialty trades, or construction business ownership.

Our construction career strategists understand the unique pathways available in the construction industry, helping you navigate certification requirements, skill development opportunities, and strategic career moves that will enhance your project leadership capabilities while achieving your professional and financial goals in the rewarding construction field.`,
  },
  education: {
    title: 'Education Career Roadmap',
    description:
      'Strategic career planning for educators and academic professionals shaping future generations.',
    detailedDescription: `The Education Career Roadmap is designed for teachers, administrators, curriculum specialists, and educational support staff who want to strategically advance their careers in educational institutions. This personalized roadmap takes into account your teaching experience, educational achievements, and professional aspirations to create a clear path for advancement in classroom leadership, educational administration, curriculum development, or specialized education roles.

Our education career strategists understand the unique opportunities available in the education sector, helping you identify advanced degree requirements, certification opportunities, and strategic career moves that will enhance your impact on student learning while achieving your professional growth and job satisfaction goals in the fulfilling education field.`,
  },
  engineering: {
    title: 'Engineering Career Roadmap',
    description:
      'Comprehensive career planning for engineers ready to innovate and lead technical solutions.',
    detailedDescription: `The Engineering Career Roadmap is tailored for mechanical, electrical, civil, software, and other engineering professionals who want to strategically advance their careers in technical and leadership roles. This personalized roadmap considers your technical expertise, project experience, and career ambitions to create a clear path for advancement in design engineering, project management, technical leadership, or engineering consultancy.

Our engineering career strategists understand the diverse pathways available in engineering disciplines, helping you navigate professional engineering licensure, advanced certifications, and strategic career moves that will maximize your technical impact and earning potential in the innovative engineering field.`,
  },
  manufacturing: {
    title: 'Manufacturing Career Roadmap',
    description:
      'Strategic career planning for manufacturing professionals driving operational excellence.',
    detailedDescription: `The Manufacturing Career Roadmap is designed for production workers, quality engineers, plant managers, and manufacturing specialists who want to strategically advance their careers in the manufacturing and industrial sector. This personalized roadmap takes into account your production experience, quality achievements, and professional goals to create a clear path for advancement in production management, quality assurance, lean manufacturing, or operations leadership.

Our manufacturing career strategists understand the operational focus of manufacturing environments, helping you identify lean manufacturing certifications, leadership development opportunities, and strategic career moves that will enhance your operational impact while achieving your professional and financial goals in the dynamic manufacturing industry.`,
  },
  retail: {
    title: 'Retail Career Roadmap',
    description:
      'Comprehensive career planning for retail professionals excelling in customer experience and sales.',
    detailedDescription: `The Retail Career Roadmap is crafted for sales associates, store managers, buyers, and retail specialists who want to strategically advance their careers in the retail and customer service industry. This personalized roadmap considers your customer service achievements, sales performance, and career aspirations to create a clear path for advancement in store management, regional leadership, merchandising, or retail operations.

Our retail career strategists understand the customer-focused nature of retail environments, helping you identify retail management certifications, leadership development programs, and strategic career moves that will maximize your sales impact and career growth potential in the evolving retail landscape.`,
  },
  hospitality: {
    title: 'Hospitality Career Roadmap',
    description:
      'Strategic career planning for hospitality professionals delivering exceptional guest experiences.',
    detailedDescription: `The Hospitality Career Roadmap is designed for hotel staff, restaurant professionals, event coordinators, and hospitality managers who want to strategically advance their careers in the hospitality and tourism industry. This personalized roadmap takes into account your guest service experience, hospitality skills, and professional goals to create a clear path for advancement in hotel management, food service leadership, event planning, or hospitality operations.

Our hospitality career strategists understand the service-oriented culture of the hospitality industry, helping you identify hospitality management certifications, international opportunities, and strategic career moves that will enhance your guest service impact while achieving your professional and financial goals in the rewarding hospitality field.`,
  },
  marketing: {
    title: 'Marketing Career Roadmap',
    description:
      'Comprehensive career planning for marketing professionals ready to amplify their impact.',
    detailedDescription: `The Marketing Career Roadmap is tailored for digital marketers, brand managers, content creators, and marketing specialists who want to strategically advance their careers in the dynamic marketing and advertising industry. This personalized roadmap considers your campaign achievements, creative projects, and career ambitions to create a clear path for advancement in digital marketing, brand management, content strategy, or marketing leadership.

Our marketing career strategists understand the creative and analytical nature of marketing roles, helping you identify digital marketing certifications, emerging technology skills, and strategic career moves that will maximize your marketing impact and career growth potential in the evolving marketing landscape.`,
  },
  consulting: {
    title: 'Consulting Career Roadmap',
    description:
      'Strategic career planning for consultants ready to solve complex challenges and drive transformation.',
    detailedDescription: `The Consulting Career Roadmap is designed for management consultants, strategy advisors, and specialized consultants who want to strategically advance their careers in the competitive consulting industry. This personalized roadmap takes into account your problem-solving achievements, client impact, and professional aspirations to create a clear path for advancement in strategy consulting, specialized practice areas, or consulting leadership roles.

Our consulting career strategists understand the analytical and client-focused nature of consulting work, helping you identify industry certifications, thought leadership opportunities, and strategic career moves that will enhance your consulting impact while achieving your professional and financial goals in the prestigious consulting field.`,
  },
  logistics: {
    title: 'Logistics Career Roadmap',
    description:
      'Comprehensive career planning for logistics professionals optimizing global supply chains.',
    detailedDescription: `The Logistics Career Roadmap is crafted for supply chain coordinators, warehouse managers, transportation specialists, and logistics professionals who want to strategically advance their careers in the logistics and supply chain industry. This personalized roadmap considers your operational efficiency achievements, supply chain improvements, and career goals to create a clear path for advancement in supply chain management, logistics operations, transportation planning, or logistics leadership.

Our logistics career strategists understand the operational complexity of supply chain environments, helping you identify supply chain certifications, technology adoption skills, and strategic career moves that will maximize your logistics impact and career growth potential in the critical logistics industry.`,
  },
  'real-estate': {
    title: 'Real Estate Career Roadmap',
    description:
      'Strategic career planning for real estate professionals building successful property careers.',
    detailedDescription: `The Real Estate Career Roadmap is designed for real estate agents, property managers, real estate analysts, and real estate professionals who want to strategically advance their careers in the property and real estate industry. This personalized roadmap takes into account your sales achievements, property management experience, and professional aspirations to create a clear path for advancement in real estate sales, property management, real estate development, or real estate investment.

Our real estate career strategists understand the relationship-driven nature of the real estate industry, helping you identify real estate certifications, market specialization opportunities, and strategic career moves that will enhance your real estate impact while achieving your professional and financial goals in the lucrative real estate field.`,
  },
  energy: {
    title: 'Energy Career Roadmap',
    description:
      'Comprehensive career planning for energy professionals powering sustainable futures.',
    detailedDescription: `The Energy Career Roadmap is tailored for renewable energy specialists, oil and gas professionals, power plant operators, and energy industry workers who want to strategically advance their careers in the evolving energy sector. This personalized roadmap considers your technical expertise, safety achievements, and career ambitions to create a clear path for advancement in renewable energy, traditional energy operations, energy consulting, or energy project management.

Our energy career strategists understand the technical and safety-critical nature of energy operations, helping you identify energy industry certifications, emerging technology skills, and strategic career moves that will maximize your energy impact and career growth potential in the transforming energy landscape.`,
  },
  automotive: {
    title: 'Automotive Career Roadmap',
    description:
      'Strategic career planning for automotive professionals driving innovation in mobility.',
    detailedDescription: `The Automotive Career Roadmap is designed for automotive engineers, manufacturing specialists, sales professionals, and automotive industry workers who want to strategically advance their careers in the dynamic automotive sector. This personalized roadmap takes into account your technical skills, manufacturing experience, and professional goals to create a clear path for advancement in automotive engineering, manufacturing operations, automotive sales, or automotive technology development.

Our automotive career strategists understand the innovation-driven culture of the automotive industry, helping you identify automotive certifications, emerging technology skills like electric vehicles and autonomous systems, and strategic career moves that will enhance your automotive impact while achieving your professional and financial goals in the exciting automotive field.`,
  },
  aerospace: {
    title: 'Aerospace Career Roadmap',
    description:
      'Comprehensive career planning for aerospace professionals reaching new heights in aviation and space.',
    detailedDescription: `The Aerospace Career Roadmap is crafted for aerospace engineers, aviation professionals, defense contractors, and aerospace industry specialists who want to strategically advance their careers in the high-tech aerospace and defense sector. This personalized roadmap considers your technical expertise, project achievements, and career aspirations to create a clear path for advancement in aerospace engineering, aircraft manufacturing, space technology, or aerospace program management.

Our aerospace career strategists understand the precision and innovation requirements of the aerospace industry, helping you identify aerospace certifications, security clearance opportunities, and strategic career moves that will maximize your aerospace impact and career growth potential in the cutting-edge aerospace field.`,
  },
}

const CareerRoadmapPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry') || 'information-technology'

  const content =
    industryContent[industry as keyof typeof industryContent] ||
    industryContent['information-technology']

  // Create modified service data with industry-specific content
  const serviceData = {
    ...servicesData.careerRoadmap,
    service: {
      ...servicesData.careerRoadmap.service,
      title: content.title,
      description: content.description,
      detailedDescription: content.detailedDescription,
    },
  }

  return <ServiceProductPage {...serviceData} />
}

export default CareerRoadmapPageContent
