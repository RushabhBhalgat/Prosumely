'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for Executive Resume
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Construction Industry Executives',
    description: `<strong style="color: #2563eb;">Ready to lead the construction industry to new heights? Let our Executive Resume Writing service pave the way to your next C-suite opportunity! 🏗️👔</strong><br/><br/>Our expert writers specialize in crafting powerful executive resumes for construction industry leaders—showcasing your strategic vision, operational excellence, and proven track record in driving organizational success. 🚧📈 Premium quality with executive-level impact guaranteed.`,
    detailedDescription: `Leading a construction company, project, or department requires more than technical expertise—it demands strategic vision, operational excellence, and proven leadership results. Our executive resume writing service is specifically designed for construction industry leaders who need to showcase their unique value proposition in a competitive market.<br/><br/>Whether you're a Construction General Manager, Project Director, Operations Executive, or C-suite leader in construction, your resume must demonstrate measurable impact across safety metrics, project delivery, cost management, and team leadership. We understand the nuances of construction executive roles and craft resumes that speak directly to board members, executive search firms, and senior leadership teams.<br/><br/>Our construction industry expertise ensures your executive resume highlights the specific achievements that matter most: P&L responsibility, multi-site operations management, safety record improvements, major project completions, regulatory compliance, and sustainable growth initiatives.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy Industry Executives',
    description: `<strong style="color: #2563eb;">Power your executive career in the energy sector! Let our Executive Resume Writing service fuel your path to C-suite success! ⚡🛢️</strong><br/><br/>Our specialized writers create commanding executive resumes for energy industry leaders—highlighting your strategic leadership in oil, gas, renewable energy, and utility operations. 🏭👔 Executive presence meets energy sector expertise.`,
    detailedDescription: `Energy sector leadership requires balancing operational excellence with environmental responsibility, regulatory compliance, and stakeholder management. Our executive resumes showcase your strategic vision in energy transformation, operational efficiency improvements, safety leadership, and sustainable growth initiatives.<br/><br/>Whether you're leading exploration operations, renewable energy projects, or utility infrastructure development, we position you as the executive who navigates complex energy markets while driving organizational performance and environmental stewardship in this critical industry.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology Executives',
    description: `<strong style="color: #2563eb;">Code your way to C-suite success! Let our Executive Resume Writing service debug your path to tech leadership! 💻🚀</strong><br/><br/>Our tech-savvy writers create innovative executive resumes for technology leaders—showcasing your digital transformation expertise, product innovation, and organizational scaling capabilities. 🔧💡 Technical leadership meets executive vision.`,
    detailedDescription: `Technology executive leadership requires balancing innovation with execution, scaling teams while maintaining culture, and driving digital transformation across organizations. Our executive resumes highlight your technology strategy, product development successes, team building achievements, and market expansion results.<br/><br/>Whether you're a CTO driving technical architecture, a VP of Engineering scaling development teams, or a Chief Product Officer defining market strategy, we position you as the technology executive who translates vision into measurable business impact.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical Executives',
    description: `<strong style="color: #2563eb;">Lead healthcare innovation and organizational excellence! Let our Executive Resume Writing service diagnose your path to executive success! 🏥💊</strong><br/><br/>Our healthcare-focused writers create impactful executive resumes for medical and pharmaceutical leaders—highlighting your clinical excellence, regulatory expertise, and healthcare transformation achievements. 🩺👔 Medical leadership meets executive strategy.`,
    detailedDescription: `Healthcare and pharmaceutical executive leadership requires balancing patient outcomes with operational efficiency, regulatory compliance, and innovation development. Our executive resumes showcase your clinical leadership, research achievements, regulatory navigation, and healthcare delivery improvements.<br/><br/>Whether you're a Chief Medical Officer, Pharmaceutical VP, or Healthcare Administrator, we position you as the healthcare executive who drives medical excellence while achieving organizational objectives in this life-critical industry.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Financial Services Executives',
    description: `<strong style="color: #2563eb;">Invest in executive success! Let our Executive Resume Writing service calculate your path to financial leadership! 💰📈</strong><br/><br/>Our finance-expert writers create powerful executive resumes for banking and financial services leaders—showcasing your strategic financial leadership, risk management, and organizational growth achievements. 🏦👔 Financial acumen meets executive presence.`,
    detailedDescription: `Financial services executive leadership requires balancing growth objectives with risk management, regulatory compliance, and stakeholder expectations. Our executive resumes highlight your strategic financial planning, portfolio management, regulatory navigation, and business transformation achievements.<br/><br/>Whether you're a Chief Financial Officer, Managing Director, or Insurance Executive, we position you as the financial leader who drives sustainable growth while maintaining fiduciary responsibility and regulatory excellence.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing Executives',
    description: `<strong style="color: #2563eb;">Sell your executive potential! Let our Executive Resume Writing service market your leadership to C-suite opportunities! 📊🎯</strong><br/><br/>Our results-driven writers create compelling executive resumes for sales and marketing leaders—highlighting your revenue generation, brand building, and market expansion achievements. 📈👔 Sales performance meets executive strategy.`,
    detailedDescription: `Sales and marketing executive leadership requires balancing revenue targets with brand building, customer acquisition with retention, and short-term results with long-term strategy. Our executive resumes showcase your revenue achievements, market expansion successes, team leadership, and customer experience innovations.<br/><br/>Whether you're a Chief Revenue Officer, VP of Sales, or Chief Marketing Officer, we position you as the executive who drives sustainable growth through strategic sales and marketing excellence.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing Executives',
    description: `<strong style="color: #2563eb;">Engineer executive success with precision! Let our Executive Resume Writing service manufacture your path to leadership! ⚙️🏭</strong><br/><br/>Our technical writers create robust executive resumes for engineering and manufacturing leaders—highlighting your operational excellence, innovation leadership, and organizational transformation. 🔧👔 Technical expertise meets executive vision.`,
    detailedDescription: `Engineering and manufacturing executive leadership requires balancing operational efficiency with innovation, quality with cost optimization, and traditional processes with digital transformation. Our executive resumes showcase your technical leadership, process improvements, safety achievements, and organizational scaling successes.<br/><br/>Whether you're a Chief Operating Officer, VP of Engineering, or Plant General Manager, we position you as the executive who drives operational excellence while leading technical innovation and organizational growth.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting Executives',
    description: `<strong style="color: #2563eb;">Strategize your way to executive excellence! Let our Executive Resume Writing service consult on your C-suite success! 🎯📊</strong><br/><br/>Our strategy-focused writers create analytical executive resumes for consulting and strategic leaders—highlighting your transformation expertise, client impact, and organizational leadership. 📈👔 Strategic thinking meets executive execution.`,
    detailedDescription: `Strategy and consulting executive leadership requires balancing analytical rigor with practical implementation, client value with firm growth, and individual expertise with team development. Our executive resumes showcase your strategic planning, transformation leadership, client relationship management, and practice building achievements.<br/><br/>Whether you're a Managing Partner, Practice Leader, or Chief Strategy Officer, we position you as the executive who translates strategic vision into measurable organizational and client outcomes.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Supply Chain & Logistics Executives',
    description: `<strong style="color: #2563eb;">Deliver executive success with operational precision! Let our Executive Resume Writing service optimize your supply chain to C-suite opportunity! 🚚📦</strong><br/><br/>Our operations-focused writers create efficient executive resumes for logistics and supply chain leaders—highlighting your operational excellence, cost optimization, and network transformation. ⚡👔 Operational strategy meets executive leadership.`,
    detailedDescription: `Supply chain and logistics executive leadership requires balancing efficiency with resilience, cost optimization with service quality, and traditional operations with digital transformation. Our executive resumes showcase your network optimization, cost reduction achievements, technology implementation, and operational scaling successes.<br/><br/>Whether you're a Chief Supply Chain Officer, VP of Operations, or Logistics Executive, we position you as the leader who drives operational excellence while building resilient, efficient supply networks.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism Executives',
    description: `<strong style="color: #2563eb;">Create exceptional executive experiences! Let our Executive Resume Writing service host your journey to hospitality leadership! 🏨✈️</strong><br/><br/>Our service-focused writers create welcoming executive resumes for hospitality and tourism leaders—highlighting your guest experience excellence, operational efficiency, and revenue optimization. 🌟👔 Service excellence meets executive strategy.`,
    detailedDescription: `Hospitality and tourism executive leadership requires balancing guest satisfaction with operational efficiency, revenue optimization with service quality, and traditional hospitality with digital innovation. Our executive resumes showcase your guest experience improvements, revenue growth, operational excellence, and market expansion achievements.<br/><br/>Whether you're a General Manager, Regional Director, or Tourism Executive, we position you as the leader who creates memorable experiences while driving sustainable business growth.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment Executives',
    description: `<strong style="color: #2563eb;">Direct your executive spotlight! Let our Executive Resume Writing service produce your path to entertainment leadership! 🎬🎭</strong><br/><br/>Our creative writers craft compelling executive resumes for media and entertainment leaders—highlighting your content strategy, audience development, and creative organization leadership. 🎨👔 Creative vision meets executive direction.`,
    detailedDescription: `Media and entertainment executive leadership requires balancing creative vision with business strategy, content quality with production efficiency, and traditional media with digital transformation. Our executive resumes showcase your content development, audience growth, creative team leadership, and business transformation achievements.<br/><br/>Whether you're a Studio Executive, Content Director, or Media Company CEO, we position you as the leader who creates compelling content while building sustainable entertainment businesses.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources Executives',
    description: `<strong style="color: #2563eb;">Develop your executive HR potential! Let our Executive Resume Writing service recruit success for your leadership journey! 👥💼</strong><br/><br/>Our people-focused writers create strategic executive resumes for HR leaders—highlighting your talent strategy, organizational development, and culture transformation achievements. 🎯👔 People strategy meets executive leadership.`,
    detailedDescription: `Human resources executive leadership requires balancing talent acquisition with retention, employee engagement with performance management, and traditional HR with digital transformation. Our executive resumes showcase your talent strategy, culture development, organizational change leadership, and HR technology implementation.<br/><br/>Whether you're a Chief People Officer, VP of HR, or Talent Strategy Executive, we position you as the leader who builds high-performance organizations through strategic people leadership.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail Executives',
    description: `<strong style="color: #2563eb;">Stock up on executive success! Let our Executive Resume Writing service retail your leadership to top brands! 🛒🏪</strong><br/><br/>Our consumer-focused writers create market-ready executive resumes for FMCG and retail leaders—highlighting your brand management, market expansion, and consumer strategy achievements. 📊👔 Consumer insights meet executive strategy.`,
    detailedDescription: `FMCG and retail executive leadership requires balancing brand building with sales performance, consumer insights with operational efficiency, and traditional retail with digital commerce transformation. Our executive resumes showcase your brand development, market expansion, consumer strategy, and omnichannel transformation achievements.<br/><br/>Whether you're a Brand Director, Retail Executive, or Consumer Goods CEO, we position you as the leader who drives consumer engagement while building sustainable competitive advantages.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance Executives',
    description: `<strong style="color: #2563eb;">Build a case for your executive legal career! Let our Executive Resume Writing service advocate for your leadership success! ⚖️📋</strong><br/><br/>Our legally-focused writers create authoritative executive resumes for legal and compliance leaders—highlighting your regulatory expertise, risk management, and legal strategy achievements. 🏛️👔 Legal expertise meets executive authority.`,
    detailedDescription: `Legal and compliance executive leadership requires balancing regulatory requirements with business objectives, risk management with growth enablement, and legal expertise with strategic counsel. Our executive resumes showcase your regulatory navigation, compliance program development, legal strategy, and business partnership achievements.<br/><br/>Whether you're a General Counsel, Chief Compliance Officer, or Legal Executive, we position you as the leader who provides strategic legal guidance while enabling business growth within regulatory frameworks.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government Executives',
    description: `<strong style="color: #2563eb;">Serve your community from executive leadership! Let our Executive Resume Writing service govern your path to public sector success! 🏛️🌟</strong><br/><br/>Our public service-focused writers create impactful executive resumes for government and public sector leaders—highlighting your policy leadership, stakeholder management, and public service transformation. 📋👔 Public service meets executive excellence.`,
    detailedDescription: `Public sector and government executive leadership requires balancing public interest with operational efficiency, stakeholder expectations with resource constraints, and traditional governance with digital transformation. Our executive resumes showcase your policy development, program leadership, stakeholder engagement, and public service innovation achievements.<br/><br/>Whether you're a Department Director, Public Administrator, or Government Executive, we position you as the leader who drives positive public outcomes while efficiently managing public resources.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials Executives',
    description: `<strong style="color: #2563eb;">Formulate your executive success! Let our Executive Resume Writing service engineer your path to chemicals and materials leadership! ⚗️🧪</strong><br/><br/>Our science-focused writers create precise executive resumes for chemicals and materials leaders—highlighting your R&D leadership, operational excellence, and industry innovation achievements. 🔬👔 Scientific expertise meets executive vision.`,
    detailedDescription: `Chemicals and materials executive leadership requires balancing innovation with safety, R&D investment with operational efficiency, and traditional processes with sustainable practices. Our executive resumes showcase your R&D leadership, safety excellence, operational improvements, and sustainability transformation achievements.<br/><br/>Whether you're a Chief Technology Officer, Operations Director, or Chemical Company Executive, we position you as the leader who drives scientific innovation while ensuring operational excellence and environmental responsibility.`,
  },
}

const ExecutiveResumePageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Get industry-specific content or use default
  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  // Create modified service data
  const serviceData = {
    ...servicesData.executiveResume,
    service: {
      ...servicesData.executiveResume.service,
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

export default ExecutiveResumePageContent
