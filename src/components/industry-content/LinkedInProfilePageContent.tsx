'use client'

import { useSearchParams } from 'next/navigation'
import ServiceProductPage from '../ServiceProductPage'
import { servicesData } from '@/data/servicesData'

// Industry-specific content for LinkedIn Profile
const industrySpecificContent = {
  'construction-industry': {
    industrySubtitle: 'For Marketing & Sales Professionals',
    description: `<strong style="color: #2563eb;">Transform your construction career with a LinkedIn profile that builds opportunities! Let our LinkedIn Profile Makeover service construct your path to success! 🏗️💼</strong><br/><br/>Our specialists craft powerful LinkedIn profiles tailored for construction professionals—optimized to attract recruiters, clients, and industry connections. 🚧🔗 Professional networking elevated for the construction sector.`,
    detailedDescription: `In the construction industry, your LinkedIn profile is your digital business card and professional showcase. Whether you're a Project Manager, Site Supervisor, Construction Engineer, or Skilled Tradesperson, a well-optimized LinkedIn profile can open doors to lucrative opportunities and establish you as a trusted professional in your field.<br/><br/>Our LinkedIn profile makeover service understands the unique networking dynamics of the construction industry. We craft profiles that showcase your technical expertise, safety record, project successes, and leadership capabilities in a way that resonates with construction recruiters, project owners, and industry peers.<br/><br/>From highlighting major projects and certifications to showcasing your expertise in specific construction methodologies, sustainable building practices, or project management systems, we ensure your LinkedIn profile positions you as the go-to professional in your construction specialty.`,
  },
  'energy-oil-gas': {
    industrySubtitle: 'For Energy, Oil & Gas Professionals',
    description: `<strong style="color: #2563eb;">Energize your professional network! Let our LinkedIn Profile Makeover service fuel your connections in the energy sector! ⚡🛢️</strong><br/><br/>Our energy-focused specialists optimize LinkedIn profiles for oil, gas, and renewable energy professionals—maximizing visibility with industry leaders and energy companies. 🏭🔗 Network power for energy professionals.`,
    detailedDescription: `The energy sector thrives on professional relationships, technical expertise, and industry reputation. Our LinkedIn profile optimization showcases your technical capabilities, project achievements, safety record, and industry knowledge in ways that attract energy sector recruiters, contractors, and industry partners.<br/><br/>Whether you're in upstream exploration, downstream refining, renewable energy development, or energy consulting, we position your LinkedIn profile to demonstrate your value in driving energy sector innovation, operational excellence, and sustainable energy solutions.`,
  },
  'tech-it': {
    industrySubtitle: 'For Technology & IT Professionals',
    description: `<strong style="color: #2563eb;">Debug your networking potential! Let our LinkedIn Profile Makeover service code your connections to tech success! 💻🚀</strong><br/><br/>Our tech-savvy specialists create cutting-edge LinkedIn profiles for software engineers, data scientists, and IT professionals—optimized for tech industry networking. 🔧💡 Digital networking engineered for tech professionals.`,
    detailedDescription: `Technology professionals need LinkedIn profiles that showcase both technical expertise and collaborative capabilities. Our optimization highlights your programming skills, project contributions, technical achievements, and thought leadership in ways that resonate with tech recruiters, startup founders, and engineering managers.<br/><br/>From showcasing your GitHub contributions and technical blog posts to highlighting your role in product launches and system architectures, we ensure your LinkedIn profile positions you as the technical talent that drives innovation and delivers scalable solutions.`,
  },
  'healthcare-pharma': {
    industrySubtitle: 'For Healthcare & Pharmaceutical Professionals',
    description: `<strong style="color: #2563eb;">Prescribe success for your professional network! Let our LinkedIn Profile Makeover service diagnose your path to healthcare connections! 🏥💊</strong><br/><br/>Our healthcare-focused specialists optimize LinkedIn profiles for medical professionals, researchers, and pharmaceutical experts—enhancing visibility within healthcare networks. 🩺🔗 Professional networking for healthcare excellence.`,
    detailedDescription: `Healthcare and pharmaceutical professionals require LinkedIn profiles that balance clinical expertise with professional credibility. Our optimization showcases your medical qualifications, research contributions, patient care excellence, and industry involvement in ways that attract healthcare recruiters, medical institutions, and pharmaceutical companies.<br/><br/>Whether you're a practicing physician, clinical researcher, or pharmaceutical professional, we position your LinkedIn profile to demonstrate your commitment to advancing healthcare outcomes while building meaningful professional relationships within the medical community.`,
  },
  'banking-financial-services-insurance': {
    industrySubtitle: 'For Banking, Financial Services & Insurance Professionals',
    description: `<strong style="color: #2563eb;">Invest in your professional network! Let our LinkedIn Profile Makeover service calculate your connections to financial success! 💰📈</strong><br/><br/>Our finance-focused specialists optimize LinkedIn profiles for banking, investment, and insurance professionals—maximizing visibility within financial services networks. 🏦🔗 Strategic networking for financial professionals.`,
    detailedDescription: `Financial services professionals need LinkedIn profiles that demonstrate analytical capabilities, regulatory knowledge, and client relationship expertise. Our optimization highlights your financial achievements, analytical insights, client successes, and industry certifications in ways that attract financial recruiters, investment firms, and insurance companies.<br/><br/>From showcasing portfolio performance and risk management expertise to highlighting client relationship building and regulatory compliance, we ensure your LinkedIn profile positions you as the financial professional who drives sustainable growth and client value.`,
  },
  'sales-marketing': {
    industrySubtitle: 'For Sales & Marketing Professionals',
    description: `<strong style="color: #2563eb;">Sell your networking potential! Let our LinkedIn Profile Makeover service market your connections to success! 📊🎯</strong><br/><br/>Our results-driven specialists optimize LinkedIn profiles for sales and marketing professionals—maximizing visibility and lead generation potential. 📈🔗 Network marketing for sales professionals.`,
    detailedDescription: `Sales and marketing professionals leverage LinkedIn for lead generation, relationship building, and thought leadership. Our optimization showcases your sales achievements, marketing campaign successes, client relationships, and industry insights in ways that attract prospects, partners, and hiring managers.<br/><br/>From highlighting revenue achievements and campaign ROI to demonstrating thought leadership and industry expertise, we ensure your LinkedIn profile becomes a powerful tool for both professional networking and business development.`,
  },
  'engineering-manufacturing': {
    industrySubtitle: 'For Engineering & Manufacturing Professionals',
    description: `<strong style="color: #2563eb;">Engineer your professional connections! Let our LinkedIn Profile Makeover service manufacture your network success! ⚙️🏭</strong><br/><br/>Our technical specialists optimize LinkedIn profiles for engineers and manufacturing professionals—showcasing technical expertise and operational excellence. 🔧🔗 Precision networking for engineering professionals.`,
    detailedDescription: `Engineering and manufacturing professionals need LinkedIn profiles that demonstrate technical competency, problem-solving capabilities, and operational achievements. Our optimization highlights your engineering projects, process improvements, technical innovations, and safety records in ways that attract engineering recruiters, manufacturing companies, and technical teams.<br/><br/>Whether you're in design engineering, process optimization, or manufacturing leadership, we position your LinkedIn profile to showcase your technical expertise while building valuable professional relationships within the engineering community.`,
  },
  'strategy-consulting': {
    industrySubtitle: 'For Strategy & Consulting Professionals',
    description: `<strong style="color: #2563eb;">Strategize your networking success! Let our LinkedIn Profile Makeover service consult on your professional connections! 🎯📊</strong><br/><br/>Our strategy-focused specialists optimize LinkedIn profiles for consultants and strategic advisors—showcasing analytical thinking and client impact. 📈🔗 Strategic networking for consulting professionals.`,
    detailedDescription: `Strategy and consulting professionals use LinkedIn to demonstrate thought leadership, analytical capabilities, and client impact. Our optimization highlights your case work, strategic insights, client transformations, and industry expertise in ways that attract consulting firms, corporate clients, and professional networks.<br/><br/>From showcasing problem-solving methodologies and client results to demonstrating industry thought leadership and analytical rigor, we ensure your LinkedIn profile positions you as the strategic advisor who drives transformational change.`,
  },
  'logistics-supply-chain': {
    industrySubtitle: 'For Logistics & Supply Chain Professionals',
    description: `<strong style="color: #2563eb;">Deliver networking success with operational precision! Let our LinkedIn Profile Makeover service optimize your supply chain connections! 🚚📦</strong><br/><br/>Our operations-focused specialists optimize LinkedIn profiles for logistics and supply chain professionals—highlighting efficiency and reliability. ⚡🔗 Network optimization for logistics professionals.`,
    detailedDescription: `Logistics and supply chain professionals need LinkedIn profiles that demonstrate operational excellence, cost optimization, and network management capabilities. Our optimization showcases your efficiency improvements, cost savings, vendor relationships, and operational achievements in ways that attract logistics companies, supply chain partners, and operations teams.<br/><br/>Whether you're managing global supply chains or local logistics operations, we position your LinkedIn profile to highlight your ability to drive operational efficiency while building valuable relationships across supply networks.`,
  },
  'hospitality-tourism': {
    industrySubtitle: 'For Hospitality & Tourism Professionals',
    description: `<strong style="color: #2563eb;">Create networking experiences that delight! Let our LinkedIn Profile Makeover service host your journey to hospitality connections! 🏨✈️</strong><br/><br/>Our service-focused specialists optimize LinkedIn profiles for hospitality and tourism professionals—showcasing guest experience excellence and service innovation. 🌟🔗 Exceptional networking for hospitality professionals.`,
    detailedDescription: `Hospitality and tourism professionals leverage LinkedIn to showcase service excellence, guest satisfaction achievements, and industry relationships. Our optimization highlights your guest experience innovations, operational improvements, team leadership, and service quality in ways that attract hospitality recruiters, tourism companies, and industry partners.<br/><br/>From demonstrating exceptional guest service and cultural awareness to showcasing revenue optimization and team development, we ensure your LinkedIn profile reflects your commitment to creating memorable experiences while building meaningful industry connections.`,
  },
  'media-entertainment': {
    industrySubtitle: 'For Media & Entertainment Professionals',
    description: `<strong style="color: #2563eb;">Spotlight your creative network! Let our LinkedIn Profile Makeover service direct your connections to entertainment success! 🎬🎭</strong><br/><br/>Our creative specialists optimize LinkedIn profiles for media and entertainment professionals—showcasing creative vision and industry achievements. 🎨🔗 Creative networking for entertainment professionals.`,
    detailedDescription: `Media and entertainment professionals use LinkedIn to showcase creative portfolios, industry collaborations, and professional achievements. Our optimization highlights your creative projects, audience engagement, technical skills, and industry relationships in ways that attract entertainment companies, production teams, and creative collaborators.<br/><br/>Whether you're in content creation, production management, or entertainment marketing, we position your LinkedIn profile to demonstrate your creative impact while building valuable relationships within the entertainment ecosystem.`,
  },
  'human-resources': {
    industrySubtitle: 'For Human Resources Professionals',
    description: `<strong style="color: #2563eb;">Develop your HR networking potential! Let our LinkedIn Profile Makeover service recruit connections for your professional success! 👥💼</strong><br/><br/>Our people-focused specialists optimize LinkedIn profiles for HR professionals—showcasing talent strategy and organizational development expertise. 🎯🔗 Strategic networking for HR professionals.`,
    detailedDescription: `Human resources professionals leverage LinkedIn for talent acquisition, industry networking, and thought leadership in people strategy. Our optimization showcases your talent development achievements, organizational improvements, employee engagement initiatives, and HR innovations in ways that attract HR leaders, corporate executives, and industry professionals.<br/><br/>From demonstrating successful talent acquisition and retention strategies to showcasing organizational culture development and change management, we ensure your LinkedIn profile positions you as the HR professional who drives organizational success through people excellence.`,
  },
  'fmcg-retail': {
    industrySubtitle: 'For FMCG & Retail Professionals',
    description: `<strong style="color: #2563eb;">Stock up on networking success! Let our LinkedIn Profile Makeover service retail your connections to top brands! 🛒🏪</strong><br/><br/>Our consumer-focused specialists optimize LinkedIn profiles for FMCG and retail professionals—showcasing market insights and consumer engagement expertise. 📊🔗 Consumer-centric networking for retail professionals.`,
    detailedDescription: `FMCG and retail professionals use LinkedIn to demonstrate market knowledge, consumer insights, and commercial achievements. Our optimization showcases your sales performance, brand management successes, market expansion, and consumer strategy in ways that attract retail companies, consumer brands, and industry partners.<br/><br/>Whether you're in brand management, retail operations, or consumer marketing, we position your LinkedIn profile to highlight your understanding of consumer behavior while building valuable relationships within the retail ecosystem.`,
  },
  'legal-compliance': {
    industrySubtitle: 'For Legal & Compliance Professionals',
    description: `<strong style="color: #2563eb;">Build a case for your professional network! Let our LinkedIn Profile Makeover service advocate for your legal connections! ⚖️📋</strong><br/><br/>Our legally-focused specialists optimize LinkedIn profiles for legal and compliance professionals—showcasing regulatory expertise and legal excellence. 🏛️🔗 Authoritative networking for legal professionals.`,
    detailedDescription: `Legal and compliance professionals leverage LinkedIn to demonstrate expertise, thought leadership, and professional credibility. Our optimization showcases your legal achievements, regulatory knowledge, compliance successes, and professional involvement in ways that attract law firms, corporate legal departments, and industry clients.<br/><br/>From highlighting complex case work and regulatory expertise to demonstrating thought leadership and professional ethics, we ensure your LinkedIn profile positions you as the legal professional who provides strategic counsel while maintaining the highest professional standards.`,
  },
  'public-sector-government': {
    industrySubtitle: 'For Public Sector & Government Professionals',
    description: `<strong style="color: #2563eb;">Serve your community through professional networking! Let our LinkedIn Profile Makeover service govern your connections to public sector success! 🏛️🌟</strong><br/><br/>Our public service-focused specialists optimize LinkedIn profiles for government and public sector professionals—showcasing policy expertise and public service commitment. 📋🔗 Civic networking for public service professionals.`,
    detailedDescription: `Public sector and government professionals use LinkedIn to demonstrate policy expertise, stakeholder engagement, and public service achievements. Our optimization showcases your policy development, program management, community impact, and public administration in ways that attract government agencies, non-profit organizations, and public service networks.<br/><br/>Whether you're in policy analysis, program management, or public administration, we position your LinkedIn profile to highlight your commitment to public service while building meaningful relationships within the civic and policy community.`,
  },
  'chemicals-materials': {
    industrySubtitle: 'For Chemicals & Materials Professionals',
    description: `<strong style="color: #2563eb;">Formulate your networking success! Let our LinkedIn Profile Makeover service engineer your connections in chemicals and materials! ⚗️🧪</strong><br/><br/>Our science-focused specialists optimize LinkedIn profiles for chemicals and materials professionals—showcasing R&D expertise and technical innovation. 🔬🔗 Scientific networking for chemical professionals.`,
    detailedDescription: `Chemicals and materials professionals leverage LinkedIn to showcase technical expertise, research achievements, and industry innovations. Our optimization highlights your R&D contributions, process improvements, safety excellence, and technical leadership in ways that attract chemical companies, research institutions, and technical teams.<br/><br/>Whether you're in chemical engineering, materials research, or process development, we position your LinkedIn profile to demonstrate your scientific impact while building valuable relationships within the chemicals and materials community.`,
  },
}

const LinkedInProfilePageContent = () => {
  const searchParams = useSearchParams()
  const industry = searchParams.get('industry')

  // Get industry-specific content or use default
  const industryContent =
    industry && industrySpecificContent[industry as keyof typeof industrySpecificContent]

  // Create modified service data
  const serviceData = {
    ...servicesData.linkedinProfile,
    service: {
      ...servicesData.linkedinProfile.service,
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

export default LinkedInProfilePageContent
