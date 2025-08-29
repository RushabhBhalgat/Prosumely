import { CheckCircle, Target, TrendingUp, Zap } from 'lucide-react'
import { serviceFAQs } from './faqData'

// New limited services data
export const limitedServicesData = {
  jobseekerCvCombo: {
    service: {
      title: "Jobseeker's CV Combo",
      price: '130',
      currency: '$',
      tagline: 'Your Complete Career Branding Kit',
      description: `<strong style="color: #2563eb;">Transform your career with the ultimate jobseeker's package! 🚀📋</strong><br/><br/>The Jobseeker's Combo is your all-in-one career branding kit—consisting of ATS friendly Executive CV, Cover letter, LinkedIn profile makeover, and a project portfolio.<br/><br/><em>Professional excellence delivered.</em>`,
      detailedDescription: `The Jobseeker's CV Combo is the ultimate career transformation package designed for ambitious professionals ready to dominate their job search.<br/><br/>🎯 <strong style="color: #2563eb;">Executive CV</strong>: Position yourself as a leader with a powerful, achievement-driven executive resume. Crafted for impactful roles, the executive CV highlights your job responsibilities with detailed impact, vision, competencies (Technical, Core and Personal) and value proposition.<br/><br/>💼 <strong style="color: #2563eb;">Professional Cover Letter</strong>: A well-crafted cover letter that complements your resume and highlights your unique qualifications and experiences. Tailored to the job you are applying for.<br/><br/>🔗 <strong style="color: #2563eb;">LinkedIn Profile makeover</strong>: We optimize your profile to attract recruiters. This service includes a complete profile review, keyword optimization, and content enhancement.<br/><br/>📊 <strong style="color: #2563eb;">Project Portfolio</strong>: Impressive and engaging document presenting each project with a visually compelling page layout, highlighting project details, Job responsibilities, key achievements and captivating viewers with infographics.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card.',
    },
    redirectLink: '/services/jobseeker-cv-combo/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'ATS-optimized Executive CV' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professional Cover Letter' },
      { icon: CheckCircle, color: 'text-green-500', text: 'LinkedIn Profile makeover' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Project Portfolio with infographics' },
      { icon: Target, color: 'text-blue-500', text: 'Complete career branding solution' },
      { icon: TrendingUp, color: 'text-purple-500', text: 'Higher interview callback rate' },
    ],
    deliveryInfo: {
      timeframe: '5-7 business days',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.jobseekerCvCombo,
  },
  jobseekerPersonalWebsite: {
    service: {
      title: "Jobseeker's Personal Website",
      price: '300',
      currency: '$',
      tagline: 'Your Digital Brand Hub',
      description: `<strong style="color: #2563eb;">Establish your digital presence with a professional personal website! 🌐💼</strong><br/><br/>We specialize in creating professional personal websites that showcase your expertise, achievements, and unique identity in the most compelling way. Position yourself as an emerging leader in your industry.<br/><br/><em>Note: Additional $10 per month for maintenance and SEO blogs.</em>`,
      detailedDescription: `In today's digital-first world, your website is more than just an online presence—it's your personal brand, a platform that works for you around the clock. The website shall help you position yourself as an emerging leader in Industry.<br/><br/>🌟 <strong style="color: #2563eb;">Personal Domain</strong>: Buying personal domain e.g., www.yourname.com<br/><br/>🎨 <strong style="color: #2563eb;">Personal Website design development</strong>: Professional design that reflects your personal brand<br/><br/>🔍 <strong style="color: #2563eb;">Google Searchability and SEO</strong>: Optimized for search engines to enhance discoverability<br/><br/>📝 <strong style="color: #2563eb;">Website content creation</strong>: Compelling content that tells your professional story<br/><br/>🔒 <strong style="color: #2563eb;">Website Security and certifications</strong>: SSL certificates and security measures<br/><br/>🚀 <strong style="color: #2563eb;">Website deployment and maintenance</strong>: Complete setup with ongoing support<br/><br/>The personal website shall highlight your story, career timeline, skills, experience, projects and accomplishments, making it easy for employers, clients, recruiters or collaborators to connect with you.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card.',
    },
    redirectLink: '/services/jobseeker-personal-website/form',
    features: [
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Personal domain registration (yourname.com)',
      },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Professional website design & development',
      },
      { icon: CheckCircle, color: 'text-green-500', text: 'Google SEO optimization' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professional content creation' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Security & SSL certificates' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Website deployment & maintenance' },
      { icon: Zap, color: 'text-yellow-500', text: '24/7 digital presence for your brand' },
    ],
    deliveryInfo: {
      timeframe: '10-14 business days',
      formats: ['Live Website'],
    },
    faqs: serviceFAQs.jobseekerPersonalWebsite,
  },
  cvPersonalWebsiteCombo: {
    service: {
      title: 'CV and Personal Website Combo',
      price: '400',
      currency: '$',
      tagline: 'Ultimate Personal Branding Package',
      description: `<strong style="color: #2563eb;">Ultimate personal branding package! Get everything you need to dominate your career! 💪🌟</strong><br/><br/>Our CV & Personal Website Combo is the ultimate personal branding package designed to position you for success and accelerate your journey toward landing your dream role.<br/><br/><em>Note: Additional $10 per month for website maintenance and SEO blogs.</em>`,
      detailedDescription: `This all-in-one solution includes a professionally crafted executive CV that highlights your achievements, a tailored cover letter that makes a lasting impression, and a complete LinkedIn profile makeover to boost your visibility with recruiters. We go further by building a polished project portfolio that showcases your expertise, and a modern, fully responsive personal website—your 24/7 digital brand hub—equipped with all the features jobseekers need to stand out.<br/><br/>🎯 <strong style="color: #2563eb;">Executive CV</strong>: Achievement-driven executive resume with detailed impact and value proposition<br/><br/>💼 <strong style="color: #2563eb;">Professional Cover Letter</strong>: Tailored cover letter highlighting your unique qualifications<br/><br/>🔗 <strong style="color: #2563eb;">LinkedIn Profile makeover</strong>: Complete optimization for maximum recruiter visibility<br/><br/>📊 <strong style="color: #2563eb;">Project Portfolio</strong>: Visual showcase of your projects with compelling infographics<br/><br/>🌐 <strong style="color: #2563eb;">Personal Website</strong>: All features included as mentioned in jobseeker's personal website<br/><br/>Together, these tools create a powerful, cohesive personal brand that communicates your value with impact and confidence, ensuring you shine in every opportunity.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card.',
    },
    redirectLink: '/services/cv-personal-website-combo/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Executive CV with achievement focus' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professional Cover Letter' },
      { icon: CheckCircle, color: 'text-green-500', text: 'LinkedIn Profile makeover' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Project Portfolio with infographics' },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Complete Personal Website (all features)',
      },
      { icon: Target, color: 'text-blue-500', text: 'Ultimate personal branding solution' },
      { icon: TrendingUp, color: 'text-purple-500', text: 'Maximum career transformation impact' },
    ],
    deliveryInfo: {
      timeframe: '14-21 business days',
      formats: ['PDF', 'Word', 'Live Website'],
    },
    faqs: serviceFAQs.cvPersonalWebsiteCombo,
  },
}

// Limited services for cards display
export const limitedServices = [
  {
    id: 1,
    name: "Jobseeker's CV Combo",
    tagline: 'Your Complete Career Branding Kit',
    price: '$130',
    color: 'bg-blue-800',
    popular: false,
    description:
      "The Jobseeker's Combo is your all-in-one career branding kit—consisting of ATS friendly Executive CV, Cover letter, LinkedIn profile makeover, and a project portfolio.",
    bestFor: 'Mid/Senior level professionals and executives',
    path: '/services/jobseeker-cv-combo',
  },
  {
    id: 2,
    name: "Jobseeker's Personal Website",
    tagline: 'Your Digital Brand Hub',
    price: '$300',
    color: 'bg-blue-800',
    popular: false,
    description:
      'Professional personal website showcasing your expertise and achievements. Includes domain, design, SEO, and maintenance. Additional $10/month for maintenance and blogs.',
    bestFor: 'Professionals wanting strong digital presence',
    path: '/services/jobseeker-personal-website',
  },
  {
    id: 3,
    name: 'CV and Personal Website Combo',
    tagline: 'Ultimate Personal Branding Package',
    price: '$400',
    color: 'bg-blue-800',
    popular: true,
    description:
      'Complete personal branding solution combining executive CV, cover letter, LinkedIn optimization, project portfolio, and professional website. Additional $10/month for website maintenance.',
    bestFor: 'Ambitious professionals seeking maximum impact',
    path: '/services/cv-personal-website-combo',
  },
]
