import { CheckCircle, Eye, Award, Target } from 'lucide-react'

export const servicesData = {
  atsResume: {
    service: {
      title: 'ATS Resume',
      price: '20',
      currency: '$',
      tagline: 'Professional Resume Writing Service',
      description: `<strong style="color: #2563eb;">Tired of silent job applications? Let us help with our ATS Resume Writing service! 💪</strong><br/><br/>Our experienced writers optimize your resume for Applicant Tracking Systems, ensuring it gets noticed. 🤖👀 Invest in your future with our fast turnaround times and personalized service.`,
      detailedDescription: `ATS Resume is a new trend in the recruitment industry wherein your CV is screened on the basis of keywords, target titles, skills, experience and overall CV Formatting. Large organizations and MNC's receive hundreds of CV's every week and it is impossible to shortlist candidates from a pile of hundreds of CV's.<br/><br/>Hence Recruiter uses ATS Software or Artificial Intelligence (AI) based screening techniques which are system based. We at Prosumely do the exact detailing by <strong style="color: #2563eb;">re-organizing</strong>, <strong style="color: #2563eb;">re-formatting</strong>, <strong style="color: #2563eb;">re-structuring</strong> & develop best quality output. We intend to make the CV consistent and clean.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/ats-resume-writing-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'A dedicated professional to your CV' },
      { icon: CheckCircle, color: 'text-green-500', text: 'ATS optimized' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professionally structured & designed' },
    ],
    deliveryInfo: {
      timeframe: '48hrs',
      formats: ['PDF', 'Word'],
    },
  },
  visualResume: {
    service: {
      title: 'Visual CV',
      price: '25',
      currency: '$',
      tagline: 'Visually Stunning Resume Design',
      description: `<strong style="color: #2563eb;">Silence the competition with our Visual CV! 🚀👁️</strong><br/><br/>Stand out effortlessly with visually stunning resumes, optimized for attention. Fast turnarounds and personalized service guaranteed. Elevate your career presence today! 🌟📄`,
      detailedDescription: `A visual CV is an infographic document based on attractive graphs and charts and well-developed graphics. It's majorly used for the interview process as a visual CV provides an excellent impression of career summary to recruiters.<br/><br/>With their Professional visuals, attractive designs and layouts, a modern styled Visual CV will always attract the eyes of a recruiter. We at Prosumely do the exact detailing by <strong style="color: #2563eb;">re-organizing</strong>, <strong style="color: #2563eb;">re-formatting</strong>, <strong style="color: #2563eb;">re-structuring</strong> & develop best quality output. We intend to make the CV polished and elegant.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through PayPal, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/visual-resume-writing-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Free Cover Letter included' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Free Cover Email included' },
      { icon: Eye, color: 'text-purple-500', text: 'Visually stunning infographic design' },
    ],
    deliveryInfo: {
      timeframe: '48hrs',
      formats: ['PDF', 'Word'],
    },
  },
  executiveResume: {
    service: {
      title: 'Executive CV',
      price: '30',
      currency: '$',
      tagline: 'Leadership-Focused Professional Resume',
      description: `<strong style="color: #2563eb;">Elevate your career with our Executive CV Writing service! 🚀</strong><br/><br/>We optimize resumes for Applicant Tracking Systems, ensuring you stand out. Fast turnaround and personalized service guaranteed. 🌟📄`,
      detailedDescription: `Prioritized information with improved navigation, quantifiable figures and numbers in a top-loaded style is something that makes executive CV's special. Executive CV's are recruiter friendly and ATS compatible.<br/><br/>Executive CV's are used by senior management professionals like CEO's, CFO's, CTO's etc. and other leadership role aspirants. We at Prosumely do the exact detailing by <strong style="color: #2563eb;">re-organizing</strong>, <strong style="color: #2563eb;">re-formatting</strong>, <strong style="color: #2563eb;">re-structuring</strong> & develop best quality output. We intend to make the CV polished and elegant.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through PayPal, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/executive-resume-writing-service/form',

    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Free Cover Letter included' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Free Cover Email included' },
      { icon: Award, color: 'text-gold-500', text: 'Executive-level professional formatting' },
    ],
    deliveryInfo: {
      timeframe: '48hrs',
      formats: ['PDF', 'Word'],
    },
  },
  linkedinProfile: {
    service: {
      title: 'LinkedIn Profile Makeover',
      price: '20',
      currency: '$',
      tagline: 'Professional LinkedIn Optimization',
      description: `<strong style="color: #2563eb;">Tired of silent job applications? Let us help with our LinkedIn Profile Makeover service! 💪</strong><br/><br/>Our experienced writers optimize your LinkedIn Profile for SEO, ensuring it gets noticed. 🤖👀 Invest in your future with our fast turnaround times and personalized service.`,
      detailedDescription: `What to expect from our LinkedIn Profile makeover service:<br/><br/><strong style="color: #2563eb;">Strategic Keyword Integration</strong>: We meticulously research and incorporate industry-relevant keywords to ensure your profile stands out in LinkedIn searches, making you more visible to recruiters and potential connections.<br/><br/><strong style="color: #2563eb;">Optimized Headline and Summary</strong>: Our experts create attention-grabbing headlines and compelling summaries that highlight your skills, accomplishments, and professional goals.<br/><br/><strong style="color: #2563eb;">Professional Branding</strong>: We focus on enhancing your professional brand by refining your profile's visual appeal, optimizing the layout, and ensuring consistency with your personal brand across all sections.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/linkedin-profile-makeover/form',

    features: [
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'A dedicated professional to develop your profile',
      },
      {
        icon: Target,
        color: 'text-blue-500',
        text: "SEO optimized so you rank higher in recruiter's searches",
      },
      { icon: CheckCircle, color: 'text-green-500', text: 'Aligned with your CV' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professionally structured & designed' },
    ],
    deliveryInfo: {
      timeframe: '48hrs',
      formats: ['LinkedIn Direct Update', 'Document Guide'],
    },
  },
}
