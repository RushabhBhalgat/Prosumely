'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for SOP Writing
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Education Industry Professionals',
    description: `<strong style="color: #2563eb;">Build compelling academic foundations! Let our SOP Writing service construct your path to prestigious construction management and civil engineering programs! 🏗️📚</strong><br/><br/>Our construction-focused writers craft powerful statements for architecture, civil engineering, and construction management programs—showcasing technical expertise and industry passion. 🚧✨ Educational blueprints for construction career advancement.`,
    detailedDescription: `Whether you're pursuing a Master's in Construction Management, Civil Engineering, Architecture, or specialized certifications in sustainable construction, our SOP writing service creates compelling narratives that showcase your construction industry experience and academic aspirations. We understand the unique requirements of construction-related academic programs and help you articulate your technical background, project experiences, and career goals effectively.<br/><br/>Our experienced writers craft SOPs that highlight your hands-on construction experience, technical skills, leadership in project environments, and vision for advancing construction industry practices. We help you connect your practical construction experience with academic learning objectives, demonstrating how advanced education will enhance your ability to contribute to innovative construction solutions, sustainable building practices, and industry leadership.<br/><br/>From highlighting complex project management experiences to articulating your vision for advancing construction technology or sustainable building practices, we ensure your SOP positions you as a strong candidate for competitive construction and engineering programs.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy, Oil & Gas Professionals',
    description: `<strong style="color: #2563eb;">Power your academic journey with compelling narratives! Let our SOP Writing service fuel your path to prestigious energy sector programs! ⚡🛢️</strong><br/><br/>Our energy-focused writers craft dynamic statements for petroleum engineering, renewable energy, and energy management programs—showcasing technical expertise and industry vision. 🏭📚 Academic energy for sector leadership.`,
    detailedDescription: `Whether pursuing advanced degrees in Petroleum Engineering, Renewable Energy Systems, Energy Economics, or Environmental Engineering, our SOP writing service creates compelling narratives that showcase your energy sector experience and academic aspirations. We understand the evolving energy landscape and help you articulate your technical background, operational experience, and vision for energy sector innovation.<br/><br/>Our writers craft SOPs that highlight your technical expertise in upstream/downstream operations, renewable energy projects, or energy transition initiatives, demonstrating how advanced education will enhance your ability to address complex energy challenges and drive sustainable energy solutions.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology & IT Professionals',
    description: `<strong style="color: #2563eb;">Debug your academic aspirations with precision! Let our SOP Writing service code your path to top technology programs! 💻🚀</strong><br/><br/>Our tech-savvy writers develop cutting-edge statements for computer science, data science, and IT management programs—showcasing technical innovation and academic potential. 🔧📚 Digital narratives engineered for academic success.`,
    detailedDescription: `Whether pursuing advanced degrees in Computer Science, Data Science, Artificial Intelligence, Cybersecurity, or IT Management, our SOP writing service creates compelling narratives that showcase your technical expertise and academic goals. We understand the rapidly evolving technology landscape and help you articulate your programming experience, project contributions, and vision for technological innovation.<br/><br/>Our writers craft SOPs that highlight your technical skills, software development experience, research interests, and leadership in technology projects, demonstrating how advanced education will enhance your ability to drive technological innovation and solve complex computational challenges.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical Professionals',
    description: `<strong style="color: #2563eb;">Prescribe academic excellence for your healthcare journey! Let our SOP Writing service diagnose your path to prestigious medical and pharmaceutical programs! 🏥💊</strong><br/><br/>Our healthcare-focused writers create professional statements for medical, pharmaceutical, and health management programs—showcasing clinical expertise and academic dedication. 🩺📚 Medical narratives for healthcare advancement.`,
    detailedDescription: `Whether pursuing advanced degrees in Medicine, Pharmacy, Public Health, Healthcare Administration, or Biomedical Sciences, our SOP writing service creates compelling narratives that showcase your healthcare experience and academic aspirations. We understand the demanding requirements of healthcare education and help you articulate your clinical background, research interests, and commitment to improving patient outcomes.<br/><br/>Our writers craft SOPs that highlight your patient care experience, research contributions, leadership in healthcare settings, and vision for advancing medical knowledge or healthcare delivery, demonstrating how advanced education will enhance your ability to contribute to healthcare innovation and patient care excellence.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Banking, Financial Services & Insurance Professionals',
    description: `<strong style="color: #2563eb;">Invest in academic excellence with compelling narratives! Let our SOP Writing service calculate your path to prestigious finance programs! 💰📈</strong><br/><br/>Our finance-focused writers create sophisticated statements for MBA, finance, and economics programs—showcasing analytical expertise and strategic thinking. 🏦📚 Financial intelligence for academic investment.`,
    detailedDescription: `Whether pursuing MBA programs, Master's in Finance, Economics, Risk Management, or Financial Engineering, our SOP writing service creates compelling narratives that showcase your financial services experience and academic goals. We understand the analytical rigor required in finance education and help you articulate your quantitative skills, market insights, and strategic thinking abilities.<br/><br/>Our writers craft SOPs that highlight your financial analysis experience, client relationship management, market research contributions, and vision for advancing financial industry practices, demonstrating how advanced education will enhance your ability to drive financial innovation and strategic business solutions.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing Professionals',
    description: `<strong style="color: #2563eb;">Market your academic ambitions with persuasive storytelling! Let our SOP Writing service sell your potential to top business programs! 📊🎯</strong><br/><br/>Our results-driven writers create compelling statements for MBA, marketing, and business programs—showcasing commercial achievements and strategic vision. 📈📚 Sales excellence meets academic persuasion.`,
    detailedDescription: `Whether pursuing MBA programs, Master's in Marketing, Digital Marketing, or Business Administration, our SOP writing service creates compelling narratives that showcase your sales and marketing experience and academic aspirations. We understand the dynamic nature of commercial education and help you articulate your revenue achievements, market insights, and customer relationship expertise.<br/><br/>Our writers craft SOPs that highlight your sales performance, marketing campaign successes, customer engagement strategies, and vision for advancing business practices, demonstrating how advanced education will enhance your ability to drive business growth and market innovation.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing Professionals',
    description: `<strong style="color: #2563eb;">Engineer academic excellence with precision! Let our SOP Writing service manufacture your path to prestigious engineering programs! ⚙️🏭</strong><br/><br/>Our technical writers create robust statements for engineering and manufacturing programs—showcasing technical expertise and innovation potential. 🔧📚 Engineering precision for academic advancement.`,
    detailedDescription: `Whether pursuing advanced degrees in Mechanical Engineering, Industrial Engineering, Manufacturing Systems, or Engineering Management, our SOP writing service creates compelling narratives that showcase your engineering experience and academic goals. We understand the technical rigor required in engineering education and help you articulate your design experience, process improvements, and technical innovation contributions.<br/><br/>Our writers craft SOPs that highlight your engineering projects, manufacturing optimization experience, technical leadership, and vision for advancing engineering practices, demonstrating how advanced education will enhance your ability to drive technological innovation and engineering excellence.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting Professionals',
    description: `<strong style="color: #2563eb;">Strategize your academic impact with analytical precision! Let our SOP Writing service consult on your path to top business programs! 🎯📊</strong><br/><br/>Our strategy-focused writers create analytical statements for MBA, consulting, and strategy programs—showcasing problem-solving expertise and strategic insight. 📈📚 Strategic thinking for academic consulting.`,
    detailedDescription: `Whether pursuing MBA programs, Master's in Strategy, Management Consulting, or Business Analytics, our SOP writing service creates compelling narratives that showcase your consulting experience and academic aspirations. We understand the analytical rigor required in strategy education and help you articulate your problem-solving abilities, client impact, and strategic thinking capabilities.<br/><br/>Our writers craft SOPs that highlight your consulting project successes, analytical methodologies, client relationship management, and vision for advancing strategic business practices, demonstrating how advanced education will enhance your ability to solve complex business challenges and drive organizational transformation.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Logistics & Supply Chain Professionals',
    description: `<strong style="color: #2563eb;">Deliver academic excellence through operational narratives! Let our SOP Writing service optimize your path to supply chain and logistics programs! 🚚📦</strong><br/><br/>Our operations-focused writers create efficient statements for supply chain, logistics, and operations programs—showcasing operational expertise and strategic vision. ⚡📚 Operational excellence for academic optimization.`,
    detailedDescription: `Whether pursuing degrees in Supply Chain Management, Operations Research, Logistics Engineering, or Industrial Engineering, our SOP writing service creates compelling narratives that showcase your operational experience and academic goals. We understand the analytical and strategic aspects of supply chain education and help you articulate your process optimization experience, vendor management skills, and operational innovation contributions.<br/><br/>Our writers craft SOPs that highlight your supply chain optimization projects, logistics coordination experience, cost reduction achievements, and vision for advancing operational efficiency, demonstrating how advanced education will enhance your ability to drive supply chain innovation and operational excellence.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism Professionals',
    description: `<strong style="color: #2563eb;">Create memorable academic journeys with compelling narratives! Let our SOP Writing service host your path to prestigious hospitality programs! 🏨✈️</strong><br/><br/>Our service-focused writers create welcoming statements for hospitality, tourism, and service management programs—showcasing service excellence and industry passion. 🌟📚 Hospitality warmth for academic distinction.`,
    detailedDescription: `Whether pursuing degrees in Hospitality Management, Tourism Studies, Event Management, or International Business with hospitality focus, our SOP writing service creates compelling narratives that showcase your service industry experience and academic aspirations. We understand the customer-centric nature of hospitality education and help you articulate your service excellence, cultural awareness, and guest experience management skills.<br/><br/>Our writers craft SOPs that highlight your hospitality operations experience, guest satisfaction achievements, cultural competency, and vision for advancing hospitality industry practices, demonstrating how advanced education will enhance your ability to create exceptional guest experiences and drive hospitality innovation.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment Professionals',
    description: `<strong style="color: #2563eb;">Direct your academic spotlight with creative storytelling! Let our SOP Writing service produce award-worthy applications for media programs! 🎬🎭</strong><br/><br/>Our creative writers craft captivating statements for media, entertainment, and creative programs—showcasing artistic vision and academic potential. 🎨📚 Creative excellence for academic storytelling.`,
    detailedDescription: `Whether pursuing degrees in Media Studies, Film Production, Entertainment Business, Digital Media, or Creative Writing, our SOP writing service creates compelling narratives that showcase your media experience and academic aspirations. We understand the creative and business aspects of media education and help you articulate your creative projects, industry insights, and artistic vision.<br/><br/>Our writers craft SOPs that highlight your media production experience, creative collaborations, audience engagement achievements, and vision for advancing media and entertainment practices, demonstrating how advanced education will enhance your ability to create compelling content and drive creative innovation.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources Professionals',
    description: `<strong style="color: #2563eb;">Develop compelling academic narratives for HR excellence! Let our SOP Writing service recruit success for your educational journey! 👥💼</strong><br/><br/>Our people-focused writers create strategic statements for HR, organizational psychology, and management programs—showcasing people development expertise and strategic vision. 🎯📚 People strategy for academic advancement.`,
    detailedDescription: `Whether pursuing degrees in Human Resources Management, Organizational Psychology, Industrial Relations, or MBA with HR specialization, our SOP writing service creates compelling narratives that showcase your people management experience and academic goals. We understand the strategic importance of human capital in modern organizations and help you articulate your talent development, organizational change, and employee engagement expertise.<br/><br/>Our writers craft SOPs that highlight your HR program successes, employee development initiatives, organizational transformation projects, and vision for advancing people management practices, demonstrating how advanced education will enhance your ability to drive organizational effectiveness and employee success.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail Professionals',
    description: `<strong style="color: #2563eb;">Stock your academic future with compelling narratives! Let our SOP Writing service retail your potential to top business programs! 🛒🏪</strong><br/><br/>Our consumer-focused writers create market-ready statements for business, marketing, and retail programs—showcasing commercial expertise and consumer insight. 📊📚 Consumer intelligence for academic marketing.`,
    detailedDescription: `Whether pursuing MBA programs, Master's in Retail Management, Consumer Behavior, or Marketing, our SOP writing service creates compelling narratives that showcase your FMCG and retail experience and academic aspirations. We understand the fast-paced nature of consumer markets and help you articulate your brand management, consumer insights, and commercial strategy expertise.<br/><br/>Our writers craft SOPs that highlight your product launch successes, market expansion achievements, consumer engagement strategies, and vision for advancing retail and consumer goods practices, demonstrating how advanced education will enhance your ability to drive consumer market innovation and commercial success.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance Professionals',
    description: `<strong style="color: #2563eb;">Build a compelling case for academic excellence! Let our SOP Writing service advocate for your path to prestigious law programs! ⚖️📋</strong><br/><br/>Our legally-focused writers create authoritative statements for law, compliance, and legal studies programs—showcasing legal expertise and academic dedication. 🏛️📚 Legal authority for educational advocacy.`,
    detailedDescription: `Whether pursuing JD programs, LLM degrees, Legal Studies, Compliance Management, or Business Law specializations, our SOP writing service creates compelling narratives that showcase your legal experience and academic aspirations. We understand the rigorous analytical requirements of legal education and help you articulate your legal research, case analysis, and regulatory expertise.<br/><br/>Our writers craft SOPs that highlight your legal project successes, compliance program development, regulatory analysis contributions, and vision for advancing legal practice, demonstrating how advanced education will enhance your ability to navigate complex legal challenges and contribute to legal innovation.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government Professionals',
    description: `<strong style="color: #2563eb;">Serve academic distinction in public policy pursuits! Let our SOP Writing service govern your path to prestigious public administration programs! 🏛️🌟</strong><br/><br/>Our public service-focused writers create impactful statements for public administration, policy, and government programs—showcasing civic commitment and analytical expertise. 📋📚 Civic duty for academic public service.`,
    detailedDescription: `Whether pursuing degrees in Public Administration, Public Policy, International Relations, or Government Studies, our SOP writing service creates compelling narratives that showcase your public sector experience and academic goals. We understand the service-oriented nature of public administration and help you articulate your policy analysis, program management, and civic engagement expertise.<br/><br/>Our writers craft SOPs that highlight your public service contributions, policy development experience, community impact achievements, and vision for advancing public administration practices, demonstrating how advanced education will enhance your ability to drive effective governance and public service innovation.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials Professionals',
    description: `<strong style="color: #2563eb;">Formulate academic success with scientific precision! Let our SOP Writing service engineer compelling applications for chemicals and materials programs! ⚗️🧪</strong><br/><br/>Our science-focused writers create precise statements for chemistry, materials science, and chemical engineering programs—showcasing research expertise and scientific vision. 🔬📚 Scientific excellence for academic formulation.`,
    detailedDescription: `Whether pursuing advanced degrees in Chemistry, Materials Science, Chemical Engineering, or Polymer Science, our SOP writing service creates compelling narratives that showcase your scientific research experience and academic aspirations. We understand the research-intensive nature of chemical sciences education and help you articulate your laboratory experience, research contributions, and scientific innovation potential.<br/><br/>Our writers craft SOPs that highlight your research project successes, technical innovation contributions, scientific publication records, and vision for advancing chemical and materials science, demonstrating how advanced education will enhance your ability to drive scientific discovery and technological innovation.`,
  },
}

const SOPWritingPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  const serviceData = {
    ...servicesData.sopWriting,
    service: {
      ...servicesData.sopWriting.service,
      ...(industryContent && {
        description: industryContent.description,
        detailedDescription: industryContent.detailedDescription,
      }),
    },
    ...(industryContent && {
      industrySubtitle: industryContent.industrySubtitle,
    }),
  }

  return <ServiceProductPage {...serviceData} />
}

export default SOPWritingPageContent
