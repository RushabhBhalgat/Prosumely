'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for Visual Resume
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Construction Industry Professionals',
    description: `<strong style="color: #2563eb;">Build a visually stunning resume that showcases your construction expertise! Let our Visual Resume service construct your standout career profile! 🏗️🎨</strong><br/><br/>Our design specialists create visually compelling resumes for construction professionals—combining technical expertise with creative presentation to make you stand out. 🚧✨ Creative design engineered for construction career success.`,
    detailedDescription: `In today's competitive construction job market, visual resumes can help you stand out, especially for roles that value design thinking, client interaction, or creative problem-solving. Our visual resume service creates professionally designed resumes that showcase your construction expertise in an engaging, visually appealing format.<br/><br/>Whether you're an Architect, Design-Build Professional, Construction Manager working with clients, or any construction professional who wants to make a memorable first impression, our visual resumes combine aesthetic appeal with industry-relevant content. We incorporate construction-themed design elements, project imagery, and professional layouts that reflect the quality and attention to detail expected in the construction industry.<br/><br/>Our visual resumes maintain professional standards while adding creative elements that help you stand out in a crowded field, perfect for construction professionals who work in client-facing roles or positions that value innovation and creative thinking alongside technical expertise.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy, Oil & Gas Professionals',
    description: `<strong style="color: #2563eb;">Energize your career with visually dynamic resumes! Let our Visual Resume service power your professional presentation in the energy sector! ⚡🛢️</strong><br/><br/>Our energy-focused designers create impactful visual resumes for oil, gas, and renewable energy professionals—combining technical credentials with engaging design. 🏭🎨 Visual energy for career advancement.`,
    detailedDescription: `The energy sector values both technical competency and innovative thinking. Our visual resumes showcase your technical expertise, project achievements, and safety records through compelling visual elements that demonstrate your ability to drive innovation while maintaining operational excellence.<br/><br/>Whether you're in upstream exploration, downstream processing, renewable energy development, or energy consulting, our visual resumes highlight your technical achievements while presenting them in formats that capture attention and demonstrate your forward-thinking approach to energy sector challenges.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology & IT Professionals',
    description: `<strong style="color: #2563eb;">Code your visual identity with stunning design! Let our Visual Resume service debug your career presentation for tech success! 💻🚀</strong><br/><br/>Our tech-savvy designers create cutting-edge visual resumes for software engineers, data scientists, and IT professionals—showcasing technical skills through innovative design. 🔧🎨 Digital design engineered for tech careers.`,
    detailedDescription: `Technology professionals often benefit from visual resumes that demonstrate design thinking, user experience awareness, and creative problem-solving capabilities. Our visual resumes showcase your technical skills, project portfolios, and achievements through modern, clean designs that reflect current design trends and technical sophistication.<br/><br/>Perfect for UX/UI designers, frontend developers, product managers, or any tech professional working in customer-facing roles, our visual resumes balance technical credibility with visual appeal to make you stand out in competitive tech markets.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical Professionals',
    description: `<strong style="color: #2563eb;">Prescribe visual excellence for your healthcare career! Let our Visual Resume service diagnose and cure bland career presentations! 🏥💊</strong><br/><br/>Our healthcare-focused designers create professional visual resumes for medical professionals and pharmaceutical experts—balancing clinical credibility with engaging design. 🩺🎨 Medical professionalism meets visual innovation.`,
    detailedDescription: `Healthcare and pharmaceutical professionals in certain roles can benefit from visual resumes that showcase research achievements, publication records, and clinical innovations through engaging visual formats. Our designs maintain the professionalism and credibility required in healthcare while adding visual elements that help you stand out.<br/><br/>Particularly effective for healthcare administrators, pharmaceutical marketing professionals, medical device specialists, or healthcare professionals in patient education and communication roles, our visual resumes demonstrate your commitment to clear communication and professional excellence.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Banking, Financial Services & Insurance Professionals',
    description: `<strong style="color: #2563eb;">Invest in visual presentation excellence! Let our Visual Resume service calculate your path to standout financial careers! 💰📈</strong><br/><br/>Our finance-focused designers create sophisticated visual resumes for banking, investment, and insurance professionals—combining analytical credibility with professional design. 🏦🎨 Financial sophistication meets visual appeal.`,
    detailedDescription: `Financial services professionals in client-facing roles, wealth management, or fintech can benefit from visual resumes that present complex financial achievements through clear, professional visual formats. Our designs maintain the conservative professionalism expected in finance while adding visual elements that demonstrate attention to detail and client communication skills.<br/><br/>Perfect for relationship managers, financial advisors, insurance agents, or fintech professionals, our visual resumes showcase your analytical capabilities while demonstrating your ability to communicate complex financial concepts clearly and professionally.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing Professionals',
    description: `<strong style="color: #2563eb;">Sell yourself with stunning visual impact! Let our Visual Resume service market your talents through compelling design! 📊🎯</strong><br/><br/>Our results-driven designers create persuasive visual resumes for sales and marketing professionals—showcasing achievements through engaging visual storytelling. 📈🎨 Sales performance meets visual persuasion.`,
    detailedDescription: `Sales and marketing professionals are perfectly positioned to benefit from visual resumes that demonstrate creativity, brand awareness, and communication skills. Our visual resumes showcase your revenue achievements, campaign successes, and customer engagement results through compelling visual formats that reflect current marketing trends and design principles.<br/><br/>Whether you're in digital marketing, brand management, account management, or sales leadership, our visual resumes demonstrate your understanding of visual communication while showcasing your professional achievements in formats that capture attention and drive interest.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing Professionals',
    description: `<strong style="color: #2563eb;">Engineer visual excellence with precision design! Let our Visual Resume service manufacture your standout career presentation! ⚙️🏭</strong><br/><br/>Our technical designers create robust visual resumes for engineers and manufacturing professionals—combining technical expertise with clean, professional design. 🔧🎨 Engineering precision meets visual innovation.`,
    detailedDescription: `Engineering and manufacturing professionals in design-focused roles, project management, or client-facing positions can benefit from visual resumes that showcase technical projects and achievements through clear, professional visual formats. Our designs reflect the precision and attention to detail valued in engineering while adding visual elements that demonstrate communication skills.<br/><br/>Perfect for design engineers, project managers, technical sales engineers, or manufacturing professionals working with clients, our visual resumes showcase your technical expertise while demonstrating your ability to communicate complex technical concepts clearly and professionally.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting Professionals',
    description: `<strong style="color: #2563eb;">Strategize your visual impact! Let our Visual Resume service consult on compelling career presentations! 🎯📊</strong><br/><br/>Our strategy-focused designers create analytical visual resumes for consultants and strategic professionals—showcasing insights through sophisticated design. 📈🎨 Strategic thinking meets visual execution.`,
    detailedDescription: `Strategy and consulting professionals can benefit from visual resumes that demonstrate analytical thinking, problem-solving capabilities, and client communication skills through sophisticated visual formats. Our designs reflect the analytical rigor and professionalism expected in consulting while adding visual elements that showcase your ability to present complex information clearly.<br/><br/>Whether you're a management consultant, strategy advisor, or business analyst, our visual resumes demonstrate your analytical capabilities while showcasing your understanding of effective visual communication and professional presentation standards.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Logistics & Supply Chain Professionals',
    description: `<strong style="color: #2563eb;">Deliver visual excellence with operational precision! Let our Visual Resume service optimize your career presentation supply chain! 🚚📦</strong><br/><br/>Our operations-focused designers create efficient visual resumes for logistics and supply chain professionals—showcasing operational achievements through clear design. ⚡🎨 Operational excellence meets visual optimization.`,
    detailedDescription: `Logistics and supply chain professionals in management, planning, or customer-facing roles can benefit from visual resumes that showcase operational improvements and efficiency achievements through clear, professional visual formats. Our designs reflect the efficiency and precision valued in logistics while adding visual elements that demonstrate communication and analytical skills.<br/><br/>Perfect for supply chain managers, logistics coordinators, procurement professionals, or operations analysts, our visual resumes showcase your operational expertise while demonstrating your ability to present complex operational data clearly and professionally.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism Professionals',
    description: `<strong style="color: #2563eb;">Create visually exceptional career experiences! Let our Visual Resume service host your journey to standout presentations! 🏨✈️</strong><br/><br/>Our service-focused designers create welcoming visual resumes for hospitality and tourism professionals—showcasing service excellence through engaging design. 🌟🎨 Hospitality warmth meets visual appeal.`,
    detailedDescription: `Hospitality and tourism professionals are ideally positioned to benefit from visual resumes that demonstrate creativity, cultural awareness, and service excellence through engaging visual formats. Our designs reflect the warmth and professionalism expected in hospitality while showcasing your achievements in creating memorable experiences.<br/><br/>Whether you're in hotel management, event planning, travel consulting, or tourism marketing, our visual resumes demonstrate your understanding of guest experience while showcasing your professional achievements in formats that reflect the creativity and attention to detail valued in hospitality industries.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment Professionals',
    description: `<strong style="color: #2563eb;">Direct your career spotlight with stunning visuals! Let our Visual Resume service produce award-winning career presentations! 🎬🎭</strong><br/><br/>Our creative designers craft captivating visual resumes for media and entertainment professionals—showcasing creative achievements through compelling design. 🎨✨ Creative excellence meets visual storytelling.`,
    detailedDescription: `Media and entertainment professionals are perfectly suited for visual resumes that showcase creative portfolios, collaborative achievements, and artistic vision through dynamic visual formats. Our designs reflect current creative trends while maintaining professional standards appropriate for entertainment industry networking and career advancement.<br/><br/>Whether you're a content creator, producer, marketing coordinator, or entertainment industry professional, our visual resumes demonstrate your creative capabilities while showcasing your professional achievements in formats that capture attention and reflect industry creative standards.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources Professionals',
    description: `<strong style="color: #2563eb;">Develop visually compelling HR presentations! Let our Visual Resume service recruit attention for your career! 👥💼</strong><br/><br/>Our people-focused designers create strategic visual resumes for HR professionals—showcasing people development achievements through professional design. 🎯🎨 People strategy meets visual communication.`,
    detailedDescription: `Human resources professionals in training, development, or organizational communication roles can benefit from visual resumes that demonstrate communication skills, program development, and employee engagement achievements through clear, professional visual formats. Our designs reflect the professionalism expected in HR while adding visual elements that showcase creativity and communication expertise.<br/><br/>Perfect for HR managers, training coordinators, organizational development specialists, or HR professionals involved in employee communication and engagement, our visual resumes demonstrate your people expertise while showcasing your understanding of effective visual communication in professional environments.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail Professionals',
    description: `<strong style="color: #2563eb;">Stock up on visual presentation excellence! Let our Visual Resume service retail your talents through compelling design! 🛒🏪</strong><br/><br/>Our consumer-focused designers create market-ready visual resumes for FMCG and retail professionals—showcasing commercial achievements through engaging design. 📊🎨 Consumer appeal meets visual marketing.`,
    detailedDescription: `FMCG and retail professionals are well-positioned to benefit from visual resumes that demonstrate brand awareness, consumer understanding, and marketing capabilities through engaging visual formats. Our designs reflect current consumer trends while showcasing your commercial achievements in formats that demonstrate your understanding of visual merchandising and consumer psychology.<br/><br/>Whether you're in brand management, retail operations, visual merchandising, or consumer marketing, our visual resumes demonstrate your commercial acumen while showcasing your understanding of visual appeal and consumer engagement through professional, market-aware design approaches.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance Professionals',
    description: `<strong style="color: #2563eb;">Build a compelling case for visual professionalism! Let our Visual Resume service advocate for standout career presentations! ⚖️📋</strong><br/><br/>Our legally-focused designers create authoritative visual resumes for legal and compliance professionals—balancing professional credibility with clear visual communication. 🏛️🎨 Legal authority meets visual clarity.`,
    detailedDescription: `Legal and compliance professionals in certain specializations can benefit from visual resumes that present complex achievements and qualifications through clear, professional visual formats. Our designs maintain the conservative professionalism required in legal fields while adding visual elements that demonstrate attention to detail and communication skills.<br/><br/>Particularly effective for legal professionals in corporate communications, compliance training, or client-facing roles, our visual resumes showcase your legal expertise while demonstrating your ability to communicate complex legal concepts clearly and professionally through well-organized visual presentations.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government Professionals',
    description: `<strong style="color: #2563eb;">Serve with visual distinction in public sector careers! Let our Visual Resume service govern your path to standout presentations! 🏛️🌟</strong><br/><br/>Our public service-focused designers create impactful visual resumes for government professionals—showcasing public service achievements through professional design. 📋🎨 Civic duty meets visual professionalism.`,
    detailedDescription: `Public sector and government professionals in communication, program management, or public engagement roles can benefit from visual resumes that showcase policy achievements and community impact through clear, professional visual formats. Our designs reflect the professionalism and credibility required in government while adding visual elements that demonstrate communication and organizational skills.<br/><br/>Perfect for public administrators, policy analysts, program coordinators, or government professionals involved in public communication and engagement, our visual resumes demonstrate your public service commitment while showcasing your ability to communicate effectively with diverse stakeholder groups.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials Professionals',
    description: `<strong style="color: #2563eb;">Formulate visual excellence for your scientific career! Let our Visual Resume service engineer compelling presentations for chemicals and materials! ⚗️🧪</strong><br/><br/>Our science-focused designers create precise visual resumes for chemicals and materials professionals—showcasing technical expertise through clear, professional design. 🔬🎨 Scientific precision meets visual innovation.`,
    detailedDescription: `Chemicals and materials professionals in research communication, product development, or technical sales can benefit from visual resumes that present complex technical achievements through clear, professional visual formats. Our designs reflect the precision and attention to detail valued in chemical sciences while adding visual elements that demonstrate communication and presentation skills.<br/><br/>Perfect for R&D scientists, technical managers, product development specialists, or chemical professionals involved in technical communication and client interaction, our visual resumes showcase your scientific expertise while demonstrating your ability to communicate complex technical concepts clearly and professionally.`,
  },
}

const VisualResumePageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  const serviceData = {
    ...servicesData.visualResume,
    service: {
      ...servicesData.visualResume.service,
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

export default VisualResumePageContent
