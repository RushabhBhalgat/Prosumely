'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for ATS Resume
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Construction Industry professionals',
    description: `<strong style="color: #2563eb;">Struggling to get shortlisted for construction jobs? Let our ATS Resume Writing service build the path to your next opportunity! 🏗️⚡</strong><br/><br/>Our skilled writers specialize in crafting resumes tailored for the construction sector—optimized for Applicant Tracking Systems (ATS) to boost visibility and get you noticed by top employers. 🚧📌 Fast turnarounds and personalized support guaranteed.`,
    detailedDescription: `ATS-friendly resumes are now essential in today's hiring process. Your resume is scanned for industry-specific keywords, relevant job titles, tools, certifications, and formatting. In large EPC companies and real estate firms, HR teams sift through hundreds of applications—and most are filtered out before a human sees them.<br/><br/>That's where we step in. At Prosumely, we carefully <strong style="color: #2563eb;">revise</strong>, <strong style="color: #2563eb;">reformat</strong>, and <strong style="color: #2563eb;">fine-tune</strong> your construction resume—whether you're a Site Engineer, Project Manager, or Quantity Surveyor—ensuring a clean, consistent, and standout profile ready for any AI screening.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy, Oil & Gas professionals',
    description: `<strong style="color: #2563eb;">Ready to fuel your career in the energy sector? Let our ATS Resume Writing service power your path to success! ⚡🛢️</strong><br/><br/>Our expert writers craft specialized resumes for oil, gas, and renewable energy professionals—optimized for industry-specific ATS systems to maximize your visibility with energy companies. 🏭⚡ Technical expertise meets strategic career positioning.`,
    detailedDescription: `The energy sector is highly competitive and technical, requiring resumes that showcase your expertise in exploration, production, refining, or renewable energy systems. Our ATS-optimized resumes highlight your technical certifications, safety records, project experience, and industry knowledge in formats that pass through energy company screening systems.<br/><br/>Whether you're a Petroleum Engineer, HSE Manager, or Operations Specialist, we understand the unique requirements of energy sector employers and craft resumes that demonstrate your value in driving operational excellence, safety compliance, and project success in this critical industry.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology & IT professionals',
    description: `<strong style="color: #2563eb;">Ready to code your way to career success? Let our ATS Resume Writing service debug your path to top tech opportunities! 💻🚀</strong><br/><br/>Our tech-savvy writers create cutting-edge resumes for software engineers, data scientists, and IT professionals—optimized for ATS systems used by leading tech companies. 🔧💡 Innovation meets strategic career positioning.`,
    detailedDescription: `The technology industry moves fast, and your resume needs to keep pace. Our ATS-optimized resumes showcase your technical skills, programming languages, frameworks, and project achievements in formats that resonate with tech recruiters and hiring managers.<br/><br/>From startups to Fortune 500 companies, we understand what tech employers value: clean code, scalable solutions, and innovative thinking. Whether you're a Frontend Developer, DevOps Engineer, or Product Manager, we position you as the technical talent that drives digital transformation.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical professionals',
    description: `<strong style="color: #2563eb;">Dedicated to advancing healthcare careers? Let our ATS Resume Writing service diagnose and cure your job search challenges! 🏥💊</strong><br/><br/>Our specialized writers create impactful resumes for medical professionals, researchers, and pharmaceutical experts—optimized for healthcare industry ATS systems. 🩺📋 Clinical expertise meets career excellence.`,
    detailedDescription: `Healthcare and pharmaceutical organizations require precise, detail-oriented professionals who can navigate complex regulatory environments while delivering exceptional patient outcomes. Our ATS-optimized resumes highlight your clinical experience, research contributions, regulatory knowledge, and patient care expertise.<br/><br/>Whether you're a Medical Doctor, Clinical Research Associate, or Pharmaceutical Sales Representative, we understand the unique requirements of healthcare employers and craft resumes that demonstrate your commitment to improving lives through medical excellence.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Banking, Financial Services & Insurance professionals',
    description: `<strong style="color: #2563eb;">Invest in your financial services career! Let our ATS Resume Writing service calculate your path to success! 💰📈</strong><br/><br/>Our finance-focused writers create powerful resumes for banking, investment, and insurance professionals—optimized for financial services ATS systems. 🏦💼 Financial acumen meets strategic career positioning.`,
    detailedDescription: `The financial services industry demands precision, analytical thinking, and strong risk management capabilities. Our ATS-optimized resumes showcase your financial expertise, regulatory knowledge, client relationship skills, and quantitative achievements in formats that impress financial services recruiters.<br/><br/>From investment banking to insurance underwriting, we understand what financial employers value: analytical rigor, ethical standards, and results-driven performance. Whether you're a Financial Analyst, Risk Manager, or Relationship Manager, we position you as the financial professional who drives sustainable growth.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing professionals',
    description: `<strong style="color: #2563eb;">Ready to sell your way to success? Let our ATS Resume Writing service market your talents to top employers! 📊🎯</strong><br/><br/>Our results-driven writers create compelling resumes for sales and marketing professionals—optimized for ATS systems that recognize revenue generation and brand building expertise. 📈💼 Performance metrics meet strategic positioning.`,
    detailedDescription: `Sales and marketing success is measured in numbers, and your resume should reflect that impact. Our ATS-optimized resumes highlight your revenue achievements, campaign successes, customer acquisition results, and brand building capabilities in quantifiable terms that resonate with hiring managers.<br/><br/>Whether you're crushing quotas in B2B sales or driving digital marketing campaigns, we understand what sales and marketing leaders value: proven results, strategic thinking, and customer-centric approaches that drive business growth.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing professionals',
    description: `<strong style="color: #2563eb;">Engineer your career success with precision! Let our ATS Resume Writing service manufacture your path to opportunity! ⚙️🏭</strong><br/><br/>Our technical writers create robust resumes for engineers and manufacturing professionals—optimized for industry-specific ATS systems. 🔧📐 Technical excellence meets career engineering.`,
    detailedDescription: `Engineering and manufacturing require technical precision, problem-solving capabilities, and continuous improvement mindset. Our ATS-optimized resumes showcase your technical expertise, project achievements, process improvements, and safety records in formats that demonstrate your engineering excellence.<br/><br/>From design engineering to production management, we understand what manufacturing employers value: technical competency, efficiency optimization, and quality assurance. Whether you're a Mechanical Engineer or Plant Manager, we position you as the technical leader who drives operational excellence.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting professionals',
    description: `<strong style="color: #2563eb;">Strategize your way to consulting excellence! Let our ATS Resume Writing service consult on your career success! 🎯📊</strong><br/><br/>Our strategy-focused writers create analytical resumes for consultants and strategic advisors—optimized for top-tier consulting firm ATS systems. 📈🔍 Strategic thinking meets career positioning.`,
    detailedDescription: `Management consulting demands analytical rigor, strategic thinking, and client impact delivery. Our ATS-optimized resumes highlight your case work, analytical capabilities, client results, and industry expertise in formats that resonate with consulting firm recruiters and partners.<br/><br/>From strategy development to implementation, we understand what consulting firms value: structured thinking, quantifiable impact, and leadership potential. Whether you're a Business Analyst or Principal Consultant, we position you as the strategic advisor who drives transformational change.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Logistics & Supply Chain professionals',
    description: `<strong style="color: #2563eb;">Deliver career success with logistics precision! Let our ATS Resume Writing service optimize your supply chain to opportunity! 🚚📦</strong><br/><br/>Our operations-focused writers create efficient resumes for logistics and supply chain professionals—optimized for industry ATS systems. ⚡🔗 Operational excellence meets strategic positioning.`,
    detailedDescription: `Supply chain and logistics operations require efficiency, cost optimization, and seamless coordination across complex networks. Our ATS-optimized resumes showcase your operational improvements, cost savings, inventory management, and vendor relationship expertise.<br/><br/>From warehouse operations to global supply chain strategy, we understand what logistics employers value: operational efficiency, problem-solving capabilities, and continuous improvement. Whether you're a Supply Chain Manager or Logistics Coordinator, we position you as the operations professional who drives efficiency and reliability.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism professionals',
    description: `<strong style="color: #2563eb;">Create exceptional career experiences! Let our ATS Resume Writing service host your journey to hospitality success! 🏨✈️</strong><br/><br/>Our service-focused writers create welcoming resumes for hospitality and tourism professionals—optimized for industry ATS systems. 🌟🎉 Guest experience excellence meets career positioning.`,
    detailedDescription: `Hospitality and tourism thrive on exceptional service delivery, cultural awareness, and operational excellence. Our ATS-optimized resumes highlight your guest satisfaction scores, operational improvements, team leadership, and service innovation in formats that showcase your hospitality expertise.<br/><br/>From hotel management to travel consulting, we understand what hospitality employers value: service excellence, cultural sensitivity, and revenue optimization. Whether you're a Hotel Manager or Event Coordinator, we position you as the hospitality professional who creates memorable experiences.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment professionals',
    description: `<strong style="color: #2563eb;">Spotlight your creative career! Let our ATS Resume Writing service direct your path to entertainment success! 🎬🎭</strong><br/><br/>Our creative writers craft compelling resumes for media and entertainment professionals—optimized for industry ATS systems. 🎨📺 Creative excellence meets strategic positioning.`,
    detailedDescription: `Media and entertainment require creative vision, technical expertise, and audience engagement capabilities. Our ATS-optimized resumes showcase your creative projects, audience metrics, technical skills, and collaborative achievements in formats that demonstrate your entertainment industry impact.<br/><br/>From content creation to production management, we understand what media employers value: creative innovation, technical proficiency, and audience connection. Whether you're a Content Creator or Producer, we position you as the creative professional who captivates audiences.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources professionals',
    description: `<strong style="color: #2563eb;">Develop your HR career potential! Let our ATS Resume Writing service recruit success for your professional journey! 👥💼</strong><br/><br/>Our people-focused writers create strategic resumes for HR professionals—optimized for human resources ATS systems. 🎯📋 People strategy meets career development.`,
    detailedDescription: `Human resources requires strategic thinking, people development expertise, and organizational psychology understanding. Our ATS-optimized resumes highlight your talent acquisition success, employee engagement initiatives, policy development, and organizational impact.<br/><br/>From recruitment to organizational development, we understand what HR leaders value: strategic thinking, data-driven decisions, and people-centric approaches. Whether you're an HR Manager or Talent Acquisition Specialist, we position you as the people professional who drives organizational success.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail professionals',
    description: `<strong style="color: #2563eb;">Stock up on career success! Let our ATS Resume Writing service retail your talents to top brands! 🛒🏪</strong><br/><br/>Our consumer-focused writers create market-ready resumes for FMCG and retail professionals—optimized for consumer industry ATS systems. 📊🛍️ Consumer insights meet career positioning.`,
    detailedDescription: `FMCG and retail success depends on consumer understanding, market trends analysis, and operational efficiency. Our ATS-optimized resumes showcase your sales performance, brand management achievements, inventory optimization, and customer experience improvements.<br/><br/>From brand management to retail operations, we understand what consumer companies value: market insights, sales performance, and customer-centric strategies. Whether you're a Brand Manager or Store Manager, we position you as the retail professional who drives consumer engagement and business growth.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance professionals',
    description: `<strong style="color: #2563eb;">Build a case for your legal career! Let our ATS Resume Writing service advocate for your professional success! ⚖️📋</strong><br/><br/>Our legally-focused writers create authoritative resumes for legal and compliance professionals—optimized for law firm and corporate legal ATS systems. 🏛️💼 Legal expertise meets strategic positioning.`,
    detailedDescription: `Legal and compliance roles require analytical precision, regulatory expertise, and ethical leadership. Our ATS-optimized resumes highlight your case work, regulatory knowledge, compliance achievements, and legal writing capabilities in formats that demonstrate your legal acumen.<br/><br/>From corporate law to regulatory compliance, we understand what legal employers value: analytical rigor, attention to detail, and ethical standards. Whether you're a Corporate Lawyer or Compliance Officer, we position you as the legal professional who navigates complex regulatory landscapes.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government professionals',
    description: `<strong style="color: #2563eb;">Serve your community and advance your career! Let our ATS Resume Writing service govern your path to public sector success! 🏛️🌟</strong><br/><br/>Our public service-focused writers create impactful resumes for government and public sector professionals—optimized for public sector ATS systems. 📋⚖️ Public service excellence meets career advancement.`,
    detailedDescription: `Public sector and government roles require policy expertise, stakeholder management, and public service commitment. Our ATS-optimized resumes highlight your policy development, program management, community engagement, and public administration achievements.<br/><br/>From policy analysis to program implementation, we understand what public sector employers value: analytical capabilities, ethical leadership, and community impact. Whether you're a Policy Analyst or Program Manager, we position you as the public service professional who drives positive change.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials professionals',
    description: `<strong style="color: #2563eb;">Formulate your career success! Let our ATS Resume Writing service engineer your path in chemicals and materials! ⚗️🧪</strong><br/><br/>Our science-focused writers create precise resumes for chemicals and materials professionals—optimized for industry ATS systems. 🔬⚙️ Scientific excellence meets career chemistry.`,
    detailedDescription: `Chemicals and materials science require technical precision, safety expertise, and innovation capabilities. Our ATS-optimized resumes showcase your R&D achievements, process improvements, safety records, and technical expertise in formats that demonstrate your scientific impact.<br/><br/>From chemical engineering to materials research, we understand what chemical companies value: technical competency, safety consciousness, and innovation potential. Whether you're a Chemical Engineer or R&D Scientist, we position you as the technical professional who drives scientific advancement.`,
  },
}

const ATSResumePageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Get industry-specific content or use default
  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  // Create modified service data - keep original title for right side, use custom subtitle for left side
  const serviceData = {
    ...servicesData.atsResume,
    service: {
      ...servicesData.atsResume.service,
      // Keep original title for right side (button and right column title)
      // Only modify description and detailedDescription for left side
      ...(industryContent && {
        description: industryContent.description,
        detailedDescription: industryContent.detailedDescription,
      }),
    },
    // Add custom industry subtitle if industry content exists
    ...(industryContent && {
      industrySubtitle: industryContent.industrySubtitle,
    }),
  }

  return <ServiceProductPage {...serviceData} />
}

export default ATSResumePageContent
