'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for Cover Letter
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Healthcare Industry Professionals',
    description: `<strong style="color: #2563eb;">Build stronger job applications with cover letters that construct opportunities! Let our Cover Letter Writing service lay the foundation for your success! 🏗️💌</strong><br/><br/>Our skilled writers craft compelling cover letters tailored for construction industry positions—highlighting your experience, safety record, and project achievements. 🚧📝 Professional communication that builds employer confidence.`,
    detailedDescription: `In the competitive construction job market, a well-crafted cover letter can be the difference between getting an interview or having your application overlooked. Our cover letter writing service specializes in creating compelling narratives that showcase your construction expertise, safety consciousness, and project achievements in a way that resonates with hiring managers.<br/><br/>Whether you're applying for positions in residential construction, commercial development, infrastructure projects, or specialty trades, we understand the unique requirements and expectations of construction employers. Our cover letters highlight your technical skills, safety certifications, project management capabilities, and commitment to quality workmanship.<br/><br/>We craft cover letters that address the specific challenges and priorities of construction companies, from meeting project deadlines and budget constraints to maintaining safety standards and building collaborative team relationships.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy, Oil & Gas Professionals',
    description: `<strong style="color: #2563eb;">Fuel your job applications with energy sector expertise! Let our Cover Letter Writing service power your path to opportunity! ⚡🛢️</strong><br/><br/>Our energy-focused writers create impactful cover letters for oil, gas, and renewable energy positions—highlighting technical expertise and safety excellence. 🏭📝 Energy sector communication that drives results.`,
    detailedDescription: `The energy sector values technical competency, safety consciousness, and operational reliability. Our cover letters showcase your experience in exploration, production, refining, or renewable energy systems while demonstrating your understanding of industry challenges and regulatory requirements.<br/><br/>Whether you're targeting upstream operations, downstream processing, or clean energy initiatives, we craft cover letters that highlight your technical achievements, safety record, and commitment to operational excellence in this critical industry.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology & IT Professionals',
    description: `<strong style="color: #2563eb;">Debug your job applications with tech-focused precision! Let our Cover Letter Writing service code your path to opportunity! 💻🚀</strong><br/><br/>Our tech-savvy writers create innovative cover letters for software engineers, data scientists, and IT professionals—showcasing technical skills and problem-solving capabilities. 🔧📝 Technical communication engineered for success.`,
    detailedDescription: `Technology roles require demonstrating both technical expertise and collaborative capabilities. Our cover letters highlight your programming skills, project contributions, technical innovations, and ability to work in agile, fast-paced environments.<br/><br/>Whether you're applying to startups, established tech companies, or technology roles in traditional industries, we craft cover letters that showcase your technical value while demonstrating your ability to translate complex technical concepts into business value.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical Professionals',
    description: `<strong style="color: #2563eb;">Prescribe success for your job applications! Let our Cover Letter Writing service diagnose your path to healthcare opportunity! 🏥💊</strong><br/><br/>Our healthcare-focused writers create compelling cover letters for medical professionals and pharmaceutical experts—emphasizing patient care and clinical excellence. 🩺📝 Medical communication with therapeutic precision.`,
    detailedDescription: `Healthcare and pharmaceutical roles require demonstrating clinical competency, patient care excellence, and regulatory knowledge. Our cover letters showcase your medical qualifications, research contributions, patient outcomes, and commitment to advancing healthcare.<br/><br/>Whether you're targeting clinical positions, research roles, or pharmaceutical opportunities, we craft cover letters that highlight your dedication to improving patient outcomes while meeting the rigorous standards expected in healthcare environments.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Banking, Financial Services & Insurance Professionals',
    description: `<strong style="color: #2563eb;">Invest in job application success! Let our Cover Letter Writing service calculate your path to financial opportunity! 💰📈</strong><br/><br/>Our finance-focused writers create authoritative cover letters for banking, investment, and insurance positions—highlighting analytical skills and client relationship expertise. 🏦📝 Financial communication that adds value.`,
    detailedDescription: `Financial services roles require demonstrating analytical rigor, risk management capabilities, and client relationship skills. Our cover letters showcase your financial expertise, regulatory knowledge, quantitative achievements, and ability to drive sustainable growth.<br/><br/>Whether you're targeting investment banking, commercial banking, or insurance positions, we craft cover letters that highlight your analytical capabilities while demonstrating your understanding of financial markets and regulatory environments.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing Professionals',
    description: `<strong style="color: #2563eb;">Sell your potential with persuasive cover letters! Let our Cover Letter Writing service market your talents effectively! 📊🎯</strong><br/><br/>Our results-driven writers create compelling cover letters for sales and marketing positions—highlighting revenue achievements and customer engagement expertise. 📈📝 Sales communication that closes opportunities.`,
    detailedDescription: `Sales and marketing success is measured in results, and your cover letter should reflect that impact. Our cover letters highlight your revenue achievements, customer acquisition successes, campaign performance, and ability to drive business growth.<br/><br/>Whether you're targeting B2B sales, digital marketing, or account management roles, we craft cover letters that showcase your proven track record while demonstrating your understanding of customer needs and market dynamics.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing Professionals',
    description: `<strong style="color: #2563eb;">Engineer compelling job applications! Let our Cover Letter Writing service manufacture your path to opportunity! ⚙️🏭</strong><br/><br/>Our technical writers create robust cover letters for engineers and manufacturing professionals—showcasing technical expertise and operational excellence. 🔧📝 Precision communication for engineering success.`,
    detailedDescription: `Engineering and manufacturing roles require demonstrating technical competency, problem-solving capabilities, and operational excellence. Our cover letters showcase your technical projects, process improvements, safety achievements, and ability to drive efficiency and quality.<br/><br/>Whether you're targeting design engineering, manufacturing operations, or technical leadership roles, we craft cover letters that highlight your technical expertise while demonstrating your ability to deliver practical solutions and operational improvements.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting Professionals',
    description: `<strong style="color: #2563eb;">Strategize your job application success! Let our Cover Letter Writing service consult on your path to opportunity! 🎯📊</strong><br/><br/>Our strategy-focused writers create analytical cover letters for consulting and strategic positions—highlighting problem-solving expertise and client impact. 📈📝 Strategic communication for consulting excellence.`,
    detailedDescription: `Strategy and consulting roles require demonstrating analytical rigor, problem-solving capabilities, and client impact delivery. Our cover letters showcase your case work, strategic insights, client transformations, and ability to drive organizational change.<br/><br/>Whether you're targeting management consulting, strategy roles, or advisory positions, we craft cover letters that highlight your analytical approach while demonstrating your ability to translate insights into actionable recommendations and measurable results.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Logistics & Supply Chain Professionals',
    description: `<strong style="color: #2563eb;">Deliver job application success with operational precision! Let our Cover Letter Writing service optimize your path to opportunity! 🚚📦</strong><br/><br/>Our operations-focused writers create efficient cover letters for logistics and supply chain positions—highlighting operational excellence and cost optimization. ⚡📝 Supply chain communication that delivers results.`,
    detailedDescription: `Logistics and supply chain roles require demonstrating operational efficiency, cost optimization, and network management capabilities. Our cover letters showcase your process improvements, cost savings, vendor relationship management, and ability to ensure seamless operations.<br/><br/>Whether you're targeting supply chain management, logistics coordination, or operations roles, we craft cover letters that highlight your operational expertise while demonstrating your ability to drive efficiency and reliability across complex supply networks.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism Professionals',
    description: `<strong style="color: #2563eb;">Create exceptional job application experiences! Let our Cover Letter Writing service host your journey to hospitality opportunity! 🏨✈️</strong><br/><br/>Our service-focused writers create welcoming cover letters for hospitality and tourism positions—emphasizing guest experience excellence and service innovation. 🌟📝 Hospitality communication that delights.`,
    detailedDescription: `Hospitality and tourism roles require demonstrating service excellence, cultural awareness, and guest satisfaction capabilities. Our cover letters showcase your guest experience innovations, operational improvements, team leadership, and commitment to creating memorable experiences.<br/><br/>Whether you're targeting hotel management, tourism operations, or service roles, we craft cover letters that highlight your service excellence while demonstrating your understanding of guest expectations and hospitality industry dynamics.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment Professionals',
    description: `<strong style="color: #2563eb;">Direct your job application spotlight! Let our Cover Letter Writing service produce compelling career narratives! 🎬🎭</strong><br/><br/>Our creative writers craft engaging cover letters for media and entertainment positions—showcasing creative vision and industry achievements. 🎨📝 Creative communication that captures attention.`,
    detailedDescription: `Media and entertainment roles require demonstrating creative capabilities, technical skills, and audience engagement expertise. Our cover letters showcase your creative projects, collaborative achievements, technical proficiencies, and understanding of audience dynamics.<br/><br/>Whether you're targeting content creation, production roles, or entertainment marketing positions, we craft cover letters that highlight your creative impact while demonstrating your ability to work collaboratively in fast-paced, creative environments.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources Professionals',
    description: `<strong style="color: #2563eb;">Develop compelling job applications! Let our Cover Letter Writing service recruit success for your career! 👥💼</strong><br/><br/>Our people-focused writers create strategic cover letters for HR positions—highlighting talent strategy and organizational development expertise. 🎯📝 HR communication that builds relationships.`,
    detailedDescription: `Human resources roles require demonstrating people strategy, organizational development, and talent management capabilities. Our cover letters showcase your talent acquisition successes, employee engagement initiatives, organizational improvements, and commitment to building high-performance cultures.<br/><br/>Whether you're targeting talent acquisition, HR business partner, or organizational development roles, we craft cover letters that highlight your people expertise while demonstrating your ability to align HR strategy with business objectives.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail Professionals',
    description: `<strong style="color: #2563eb;">Stock up on job application success! Let our Cover Letter Writing service retail your talents to top brands! 🛒🏪</strong><br/><br/>Our consumer-focused writers create market-ready cover letters for FMCG and retail positions—highlighting market insights and consumer engagement. 📊📝 Consumer communication that drives engagement.`,
    detailedDescription: `FMCG and retail roles require demonstrating market knowledge, consumer insights, and commercial capabilities. Our cover letters showcase your sales performance, brand management achievements, market expansion successes, and understanding of consumer behavior.<br/><br/>Whether you're targeting brand management, retail operations, or consumer marketing roles, we craft cover letters that highlight your commercial acumen while demonstrating your ability to drive consumer engagement and business growth.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance Professionals',
    description: `<strong style="color: #2563eb;">Build a case for your job applications! Let our Cover Letter Writing service advocate for your career success! ⚖️📋</strong><br/><br/>Our legally-focused writers create authoritative cover letters for legal and compliance positions—highlighting regulatory expertise and ethical excellence. 🏛️📝 Legal communication with professional authority.`,
    detailedDescription: `Legal and compliance roles require demonstrating analytical precision, regulatory knowledge, and ethical leadership. Our cover letters showcase your legal achievements, compliance successes, regulatory expertise, and commitment to maintaining the highest professional standards.<br/><br/>Whether you're targeting corporate law, regulatory compliance, or legal advisory roles, we craft cover letters that highlight your legal expertise while demonstrating your ability to provide strategic counsel and navigate complex regulatory environments.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government Professionals',
    description: `<strong style="color: #2563eb;">Serve your community through compelling applications! Let our Cover Letter Writing service govern your path to public service opportunity! 🏛️🌟</strong><br/><br/>Our public service-focused writers create impactful cover letters for government positions—emphasizing policy expertise and community commitment. 📋📝 Civic communication for public service excellence.`,
    detailedDescription: `Public sector and government roles require demonstrating policy expertise, stakeholder management, and public service commitment. Our cover letters showcase your policy development, program management, community engagement, and dedication to serving the public interest.<br/><br/>Whether you're targeting policy analysis, program management, or public administration roles, we craft cover letters that highlight your public service commitment while demonstrating your ability to navigate complex stakeholder environments and deliver public value.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials Professionals',
    description: `<strong style="color: #2563eb;">Formulate compelling job applications! Let our Cover Letter Writing service engineer your path to chemicals and materials opportunity! ⚗️🧪</strong><br/><br/>Our science-focused writers create precise cover letters for chemicals and materials positions—highlighting R&D expertise and technical innovation. 🔬📝 Scientific communication with technical precision.`,
    detailedDescription: `Chemicals and materials roles require demonstrating technical expertise, safety consciousness, and innovation capabilities. Our cover letters showcase your R&D contributions, process improvements, safety achievements, and commitment to advancing chemical and materials science.<br/><br/>Whether you're targeting chemical engineering, materials research, or process development roles, we craft cover letters that highlight your technical expertise while demonstrating your ability to drive innovation and maintain the highest safety and quality standards.`,
  },
}

const CoverLetterPageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  const serviceData = {
    ...servicesData.coverLetter,
    service: {
      ...servicesData.coverLetter.service,
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

export default CoverLetterPageContent
