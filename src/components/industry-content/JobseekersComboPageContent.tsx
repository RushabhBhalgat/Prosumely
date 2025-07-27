'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '../../data/servicesData'

// Industry-specific content for Jobseekers Combo Service
const industryContent = {
  'information-technology': {
    title: 'IT Jobseekers Combo',
    description:
      'Complete career package for IT professionals ready to dominate the tech landscape.',
    detailedDescription: `The IT Jobseekers Combo is specifically designed for technology professionals who want to stand out in a competitive market. This comprehensive package includes an ATS-optimized tech resume highlighting your programming skills, technical projects, and certifications; a tailored cover letter that speaks to hiring managers in tech companies; a cover email template for direct applications; a LinkedIn profile optimized for tech recruiters; and a personalized IT career roadmap outlining growth paths in software development, DevOps, data science, cybersecurity, or other tech specializations.

Our expert writers understand the nuances of the technology industry and ensure your application materials showcase your technical expertise, problem-solving abilities, and innovative mindset that tech companies value most.`,
  },
  healthcare: {
    title: 'Healthcare Jobseekers Combo',
    description:
      'Comprehensive career kit for healthcare professionals committed to making a difference.',
    detailedDescription: `The Healthcare Jobseekers Combo is tailored for medical professionals, nurses, healthcare administrators, and allied health workers who want to advance their careers in the healthcare industry. This complete package includes a healthcare-focused resume that highlights your clinical experience, certifications, and patient care achievements; a compelling cover letter that demonstrates your commitment to healthcare excellence; a professional cover email for healthcare applications; a LinkedIn profile optimized for healthcare recruiters and networks; and a personalized healthcare career roadmap that outlines advancement opportunities in clinical practice, healthcare administration, specialization tracks, or leadership roles.

Our healthcare writing specialists understand the unique requirements of healthcare employers and ensure your materials reflect your dedication to patient care, clinical competency, and professional growth.`,
  },
  finance: {
    title: 'Finance Jobseekers Combo',
    description:
      'Strategic career package for finance professionals ready to maximize their market value.',
    detailedDescription: `The Finance Jobseekers Combo is designed for banking professionals, financial analysts, accountants, and investment specialists who want to excel in the financial services industry. This comprehensive package includes a finance-focused resume that showcases your analytical skills, financial modeling expertise, and quantitative achievements; a persuasive cover letter that demonstrates your understanding of financial markets and business acumen; a professional cover email for finance applications; a LinkedIn profile optimized for finance recruiters and industry networks; and a personalized finance career roadmap that outlines advancement paths in investment banking, corporate finance, wealth management, fintech, or financial planning.

Our finance writing experts understand the competitive nature of the financial industry and ensure your materials highlight your analytical thinking, attention to detail, and results-driven approach that finance employers seek.`,
  },
  construction: {
    title: 'Construction Jobseekers Combo',
    description:
      'Complete career package for construction professionals building successful careers.',
    detailedDescription: `The Construction Jobseekers Combo is specifically crafted for construction workers, project managers, engineers, and supervisors who want to advance in the construction and infrastructure industry. This comprehensive package includes a construction-focused resume that highlights your project experience, safety certifications, and technical skills; a compelling cover letter that demonstrates your project management abilities and commitment to quality construction; a professional cover email for construction applications; a LinkedIn profile optimized for construction recruiters and industry networks; and a personalized construction career roadmap that outlines advancement opportunities in project management, construction supervision, specialty trades, or construction business ownership.

Our construction industry writers understand the unique demands of the construction sector and ensure your materials showcase your hands-on experience, safety consciousness, and ability to deliver projects on time and within budget.`,
  },
  education: {
    title: 'Education Jobseekers Combo',
    description:
      'Comprehensive career kit for educators and academic professionals shaping future generations.',
    detailedDescription: `The Education Jobseekers Combo is designed for teachers, administrators, curriculum specialists, and educational support staff who want to advance their careers in educational institutions. This complete package includes an education-focused resume that highlights your teaching experience, educational achievements, and student impact; a compelling cover letter that demonstrates your passion for education and student success; a professional cover email for educational applications; a LinkedIn profile optimized for education recruiters and academic networks; and a personalized education career roadmap that outlines advancement paths in classroom teaching, educational administration, curriculum development, or specialized education roles.

Our education writing specialists understand the unique culture of educational institutions and ensure your materials reflect your dedication to student learning, educational innovation, and professional development in academia.`,
  },
  engineering: {
    title: 'Engineering Jobseekers Combo',
    description:
      'Strategic career package for engineers ready to build innovative solutions and advance their careers.',
    detailedDescription: `The Engineering Jobseekers Combo is tailored for mechanical, electrical, civil, software, and other engineering professionals who want to excel in technical and leadership roles. This comprehensive package includes an engineering-focused resume that showcases your technical expertise, project achievements, and problem-solving capabilities; a persuasive cover letter that demonstrates your engineering mindset and innovation abilities; a professional cover email for engineering applications; a LinkedIn profile optimized for engineering recruiters and technical networks; and a personalized engineering career roadmap that outlines advancement opportunities in design engineering, project management, technical leadership, or engineering consultancy.

Our engineering writing experts understand the technical nature of engineering roles and ensure your materials highlight your analytical skills, attention to detail, and ability to deliver engineering solutions that meet complex requirements.`,
  },
  manufacturing: {
    title: 'Manufacturing Jobseekers Combo',
    description:
      'Complete career package for manufacturing professionals driving operational excellence.',
    detailedDescription: `The Manufacturing Jobseekers Combo is designed for production workers, quality engineers, plant managers, and manufacturing specialists who want to advance in the manufacturing and industrial sector. This comprehensive package includes a manufacturing-focused resume that highlights your production experience, quality achievements, and operational improvements; a compelling cover letter that demonstrates your commitment to manufacturing excellence and continuous improvement; a professional cover email for manufacturing applications; a LinkedIn profile optimized for manufacturing recruiters and industry networks; and a personalized manufacturing career roadmap that outlines advancement paths in production management, quality assurance, lean manufacturing, or operations leadership.

Our manufacturing industry writers understand the operational focus of manufacturing environments and ensure your materials showcase your hands-on experience, quality mindset, and ability to drive efficiency and productivity improvements.`,
  },
  retail: {
    title: 'Retail Jobseekers Combo',
    description:
      'Comprehensive career kit for retail professionals excelling in customer experience and sales.',
    detailedDescription: `The Retail Jobseekers Combo is crafted for sales associates, store managers, buyers, and retail specialists who want to advance their careers in the retail and customer service industry. This complete package includes a retail-focused resume that highlights your customer service achievements, sales performance, and retail management experience; a compelling cover letter that demonstrates your customer-centric approach and sales abilities; a professional cover email for retail applications; a LinkedIn profile optimized for retail recruiters and industry networks; and a personalized retail career roadmap that outlines advancement opportunities in store management, regional leadership, merchandising, or retail operations.

Our retail writing specialists understand the customer-focused nature of retail environments and ensure your materials reflect your sales skills, customer service excellence, and ability to drive retail success through team leadership and operational efficiency.`,
  },
  hospitality: {
    title: 'Hospitality Jobseekers Combo',
    description:
      'Strategic career package for hospitality professionals delivering exceptional guest experiences.',
    detailedDescription: `The Hospitality Jobseekers Combo is designed for hotel staff, restaurant professionals, event coordinators, and hospitality managers who want to excel in the hospitality and tourism industry. This comprehensive package includes a hospitality-focused resume that showcases your guest service experience, hospitality skills, and customer satisfaction achievements; a persuasive cover letter that demonstrates your commitment to exceptional guest experiences and hospitality excellence; a professional cover email for hospitality applications; a LinkedIn profile optimized for hospitality recruiters and industry networks; and a personalized hospitality career roadmap that outlines advancement paths in hotel management, food service leadership, event planning, or hospitality operations.

Our hospitality writing experts understand the service-oriented culture of the hospitality industry and ensure your materials highlight your guest service skills, cultural awareness, and ability to create memorable experiences that drive customer loyalty and business success.`,
  },
  marketing: {
    title: 'Marketing Jobseekers Combo',
    description:
      'Complete career package for marketing professionals ready to amplify their brand and career.',
    detailedDescription: `The Marketing Jobseekers Combo is tailored for digital marketers, brand managers, content creators, and marketing specialists who want to advance in the dynamic marketing and advertising industry. This comprehensive package includes a marketing-focused resume that highlights your campaign achievements, creative projects, and marketing ROI; a compelling cover letter that demonstrates your marketing acumen and brand-building abilities; a professional cover email for marketing applications; a LinkedIn profile optimized for marketing recruiters and creative networks; and a personalized marketing career roadmap that outlines advancement opportunities in digital marketing, brand management, content strategy, or marketing leadership.

Our marketing writing specialists understand the creative and analytical nature of marketing roles and ensure your materials showcase your strategic thinking, creative abilities, and proven track record of driving marketing success through innovative campaigns and measurable results.`,
  },
  consulting: {
    title: 'Consulting Jobseekers Combo',
    description:
      'Strategic career package for consultants ready to solve complex challenges and drive client success.',
    detailedDescription: `The Consulting Jobseekers Combo is designed for management consultants, strategy advisors, and specialized consultants who want to excel in the competitive consulting industry. This comprehensive package includes a consulting-focused resume that showcases your problem-solving achievements, client impact, and analytical capabilities; a persuasive cover letter that demonstrates your consulting mindset and client-focused approach; a professional cover email for consulting applications; a LinkedIn profile optimized for consulting recruiters and professional networks; and a personalized consulting career roadmap that outlines advancement paths in strategy consulting, specialized practice areas, or consulting leadership roles.

Our consulting writing experts understand the analytical and client-focused nature of consulting work and ensure your materials highlight your strategic thinking, problem-solving abilities, and proven track record of delivering high-impact solutions that drive client success and business transformation.`,
  },
  logistics: {
    title: 'Logistics Jobseekers Combo',
    description:
      'Comprehensive career kit for logistics professionals optimizing supply chain operations.',
    detailedDescription: `The Logistics Jobseekers Combo is crafted for supply chain coordinators, warehouse managers, transportation specialists, and logistics professionals who want to advance in the logistics and supply chain industry. This complete package includes a logistics-focused resume that highlights your operational efficiency achievements, supply chain improvements, and logistics coordination experience; a compelling cover letter that demonstrates your understanding of supply chain optimization and operational excellence; a professional cover email for logistics applications; a LinkedIn profile optimized for logistics recruiters and industry networks; and a personalized logistics career roadmap that outlines advancement opportunities in supply chain management, logistics operations, transportation planning, or logistics leadership.

Our logistics writing specialists understand the operational complexity of supply chain environments and ensure your materials reflect your analytical skills, attention to detail, and ability to optimize logistics operations for efficiency, cost reduction, and customer satisfaction.`,
  },
  'real-estate': {
    title: 'Real Estate Jobseekers Combo',
    description:
      'Strategic career package for real estate professionals building successful property careers.',
    detailedDescription: `The Real Estate Jobseekers Combo is designed for real estate agents, property managers, real estate analysts, and real estate professionals who want to excel in the property and real estate industry. This comprehensive package includes a real estate-focused resume that showcases your sales achievements, property management experience, and market knowledge; a persuasive cover letter that demonstrates your real estate expertise and client service abilities; a professional cover email for real estate applications; a LinkedIn profile optimized for real estate recruiters and industry networks; and a personalized real estate career roadmap that outlines advancement paths in real estate sales, property management, real estate development, or real estate investment.

Our real estate writing experts understand the relationship-driven nature of the real estate industry and ensure your materials highlight your sales skills, market knowledge, and ability to build client relationships that drive successful property transactions and long-term business growth.`,
  },
  energy: {
    title: 'Energy Jobseekers Combo',
    description: 'Complete career package for energy professionals powering sustainable futures.',
    detailedDescription: `The Energy Jobseekers Combo is tailored for renewable energy specialists, oil and gas professionals, power plant operators, and energy industry workers who want to advance in the evolving energy sector. This comprehensive package includes an energy-focused resume that highlights your technical expertise, safety achievements, and energy project experience; a compelling cover letter that demonstrates your commitment to energy innovation and operational excellence; a professional cover email for energy applications; a LinkedIn profile optimized for energy recruiters and industry networks; and a personalized energy career roadmap that outlines advancement opportunities in renewable energy, traditional energy operations, energy consulting, or energy project management.

Our energy industry writers understand the technical and safety-critical nature of energy operations and ensure your materials showcase your technical competency, safety consciousness, and ability to contribute to reliable and sustainable energy production and distribution.`,
  },
  automotive: {
    title: 'Automotive Jobseekers Combo',
    description:
      'Comprehensive career kit for automotive professionals driving innovation in mobility.',
    detailedDescription: `The Automotive Jobseekers Combo is designed for automotive engineers, manufacturing specialists, sales professionals, and automotive industry workers who want to advance in the dynamic automotive sector. This complete package includes an automotive-focused resume that highlights your technical skills, manufacturing experience, and automotive achievements; a compelling cover letter that demonstrates your passion for automotive innovation and quality excellence; a professional cover email for automotive applications; a LinkedIn profile optimized for automotive recruiters and industry networks; and a personalized automotive career roadmap that outlines advancement paths in automotive engineering, manufacturing operations, automotive sales, or automotive technology development.

Our automotive writing specialists understand the innovation-driven culture of the automotive industry and ensure your materials reflect your technical expertise, quality focus, and ability to contribute to the development and production of next-generation vehicles and automotive technologies.`,
  },
  aerospace: {
    title: 'Aerospace Jobseekers Combo',
    description:
      'Strategic career package for aerospace professionals reaching new heights in aviation and space.',
    detailedDescription: `The Aerospace Jobseekers Combo is crafted for aerospace engineers, aviation professionals, defense contractors, and aerospace industry specialists who want to excel in the high-tech aerospace and defense sector. This comprehensive package includes an aerospace-focused resume that showcases your technical expertise, project achievements, and aerospace experience; a persuasive cover letter that demonstrates your commitment to aerospace excellence and innovation; a professional cover email for aerospace applications; a LinkedIn profile optimized for aerospace recruiters and defense networks; and a personalized aerospace career roadmap that outlines advancement opportunities in aerospace engineering, aircraft manufacturing, space technology, or aerospace program management.

Our aerospace writing experts understand the precision and innovation requirements of the aerospace industry and ensure your materials highlight your technical capabilities, attention to detail, and ability to contribute to cutting-edge aerospace projects that push the boundaries of flight and space exploration.`,
  },
}

const JobseekersComboPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  const content =
    industry && industryContent[industry as keyof typeof industryContent]

  // Create modified service data with industry-specific content
  const serviceData = {
    ...servicesData.jobseekersCombo,
    service: {
      ...servicesData.jobseekersCombo.service,
      ...(content && {
        title: content.title,
        description: content.description,
        detailedDescription: content.detailedDescription,
      }),
    },
  }

  return <ServiceProductPage {...serviceData} />
}

export default JobseekersComboPageContent
