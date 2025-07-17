import { CheckCircle, Eye, Award, Target, Briefcase, TrendingUp } from 'lucide-react'
import { serviceFAQs } from './faqData'

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
    faqs: serviceFAQs.atsResume,
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
    faqs: serviceFAQs.visualResume,
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
    faqs: serviceFAQs.executiveResume,
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
    faqs: serviceFAQs.linkedinProfile,
  },
  projectPortfolio: {
    service: {
      title: 'Project Portfolio',
      price: '40',
      currency: '$',
      tagline: 'Your Personal Brand, Amplified!',
      description: `<strong style="color: #2563eb;">Transform Your Career with a Professional Portfolio! 🚀</strong><br/><br/>Your skills, achievements, and experience deserve a powerful presentation. A project portfolio is your ultimate personal brand—crafted to showcase your expertise, stand out in job applications, and attract high-value opportunities. 💼✨`,
      detailedDescription: `<strong style="color: #2563eb;">Why You Need a Project Portfolio?</strong><br/><br/>✅ <strong>More Than a Resume</strong> – Resumes tell, but portfolios show! Impress recruiters with proof of your expertise.<br/>✅ <strong>Personal Brand Authority</strong> – Establish yourself as an industry leader with a well-structured, compelling portfolio.<br/>✅ <strong>Higher Interview Chances</strong> – 3X your callbacks by providing an in-depth look at your skills and achievements.<br/>✅ <strong>Attract Clients & Employers</strong> – Whether job hunting or freelancing, a project portfolio gets you noticed.<br/>✅ <strong>Showcase Your Work & Impact</strong> – Present past projects, client testimonials, and certifications effectively.<br/><br/>We at Prosumely create comprehensive project portfolios by <strong style="color: #2563eb;">strategically organizing</strong>, <strong style="color: #2563eb;">professionally designing</strong>, <strong style="color: #2563eb;">content optimizing</strong> & develop industry-leading output. We intend to make your portfolio compelling and impactful.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through PayPal, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/project-portfolio/form',
    features: [
      {
        icon: Briefcase,
        color: 'text-blue-500',
        text: 'Comprehensive project showcase & testimonials',
      },
      { icon: TrendingUp, color: 'text-purple-500', text: '3X higher interview callback rate' },
    ],
    deliveryInfo: {
      timeframe: '72hrs',
      formats: ['PDF Portfolio'],
    },
    faqs: serviceFAQs.projectPortfolio,
  },
  jobseekersCombo: {
    service: {
      title: 'Jobseekers Combo',
      price: '50',
      currency: '$',
      tagline: 'Your Complete Career Branding Kit',
      description: `<strong style="color: #2563eb;">Stand out in every stage of your job hunt with our all-in-one Jobseekers Combo! 🚀</strong><br/><br/>This powerful package includes an ATS/Executive CV, tailored cover letter, attention-grabbing cover email, LinkedIn profile makeover, and a custom career roadmap. Perfect for professionals ready to take charge of their career journey. ✨`,
      detailedDescription: `The Jobseekers Combo is a holistic branding solution designed for ambitious professionals who want to create a lasting impression on recruiters. <br/><br/>We combine the power of an <strong style="color: #2563eb;">ATS-optimized resume</strong>, a <strong style="color: #2563eb;">tailored cover letter & email</strong>, a fully revamped <strong style="color: #2563eb;">LinkedIn profile</strong>, and a <strong style="color: #2563eb;">personalized career roadmap</strong> to guide your professional growth.<br/><br/>This comprehensive kit ensures you’re not just ready for the job search—you’re unforgettable.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/jobseekers-combo-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'ATS/Executive Resume included' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Tailored Cover Letter & Email' },
      { icon: CheckCircle, color: 'text-green-500', text: 'LinkedIn Profile Makeover' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Personalized Career Roadmap' },
    ],
    deliveryInfo: {
      timeframe: '72hrs',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.jobseekersCombo,
  },
  sopWriting: {
    service: {
      title: 'SOP Writing',
      price: '25',
      currency: '$',
      tagline: 'Compelling Statements of Purpose for Global Admissions',
      description: `<strong style="color: #2563eb;">Struggling to express your academic and career goals? Let us craft a powerful SOP for you! 🎓✍️</strong><br/><br/>Our expert writers work closely with you to understand your background, experiences, and aspirations, delivering a personalized Statement of Purpose that resonates with admission committees.`,
      detailedDescription: `The SOP (Statement of Purpose) is a critical component in your university application, especially for graduate programs and international admissions. It reflects your personality, achievements, and career vision in your own voice.<br/><br/>At Prosumely, we specialize in writing customized SOPs that are not only well-structured and grammatically sound, but also strategically aligned with your target program and university.<br/><br/>We help you highlight your <strong style="color: #2563eb;">academic strengths</strong>, <strong style="color: #2563eb;">career aspirations</strong>, and <strong style="color: #2563eb;">personal motivations</strong>—all while maintaining authenticity and impact.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/sop-writing-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Custom SOP tailored to your goals' },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Perfect for graduate & international admissions',
      },
      { icon: CheckCircle, color: 'text-green-500', text: 'Reviewed by expert academic writers' },
    ],
    deliveryInfo: {
      timeframe: '72hrs',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.sopWriting,
  },
  careerRoadmap: {
    service: {
      title: 'Career Roadmap',
      price: '20',
      currency: '$',
      tagline: 'Plan Bold. Move Smart. Achieve More.',
      description: `<strong style="color: #2563eb;">Confused about your next career move? Let us design a personalized Career Roadmap just for you. 🎯🚀</strong><br/><br/>Whether you're switching careers or leveling up, we provide a step-by-step strategic plan tailored to your long-term goals—so you can move forward with clarity and confidence.`,
      detailedDescription: `The Career Roadmap is your personalized blueprint for success. Perfect for mid-level professionals and career changers, this service helps you align your strengths, interests, and ambitions into an actionable plan.<br/><br/>We work with you to define <strong style="color: #2563eb;">realistic milestones</strong>, identify <strong style="color: #2563eb;">key skills to develop</strong>, and choose the right roles or industries to pursue. Your final roadmap will be a clear, structured path that eliminates guesswork and accelerates growth.<br/><br/>Don’t just dream big—<strong style="color: #2563eb;">plan smart</strong> and take bold steps toward your dream career.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/career-roadmap-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Personalized step-by-step career plan' },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Ideal for professionals and career switchers',
      },
      { icon: CheckCircle, color: 'text-green-500', text: 'Built around your long-term goals' },
    ],
    deliveryInfo: {
      timeframe: '48hrs',
      formats: ['PDF'],
    },
    faqs: serviceFAQs.careerRoadmap,
  },
  coverLetter: {
    service: {
      title: 'Cover Letter',
      price: '10',
      currency: '$',
      tagline: 'Craft a Compelling Introduction',
      description: `<strong style="color: #2563eb;">Make a powerful first impression with a tailored Cover Letter! 📄🔥</strong><br/><br/>We create personalized cover letters that complement your resume and highlight what makes you the perfect candidate for the role. Leave no room for doubt in the recruiter's mind.`,
      detailedDescription: `A strong cover letter can be the key to unlocking job opportunities. It allows you to introduce yourself beyond the resume, express your enthusiasm, and show alignment with the company’s goals.<br/><br/>At Prosumely, we craft <strong style="color: #2563eb;">job-specific</strong>, <strong style="color: #2563eb;">professionally written</strong> cover letters that speak directly to hiring managers.<br/><br/>Each letter is tailored to the job role, showcasing your strengths, motivation, and fit for the company—making sure your application rises to the top.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/cover-letter-writing-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'Customized to the job role' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Professionally written & formatted' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Complements your resume perfectly' },
    ],
    deliveryInfo: {
      timeframe: '24hrs',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.coverLetter,
  },
  interviewCoaching: {
    service: {
      title: 'Interview Coaching',
      price: '20',
      currency: '$',
      tagline: 'Crack Interviews with Confidence',
      description: `<strong style="color: #2563eb;">Nervous about your next interview? Let us coach you to success! 🎤💼</strong><br/><br/>Our personalized Interview Coaching sessions prepare you to answer confidently, present yourself professionally, and leave a lasting impression—so you walk in ready and walk out with the offer.`,
      detailedDescription: `Interviews can be daunting, but with the right guidance, you can turn them into your strongest asset. Our Interview Coaching is tailored to your industry, role, and experience level.<br/><br/>We help you master <strong style="color: #2563eb;">frequently asked questions</strong>, refine your <strong style="color: #2563eb;">body language</strong>, boost your <strong style="color: #2563eb;">confidence and mindset</strong>, and tackle even the toughest scenarios.<br/><br/>Whether it's a phone screen, video call, or panel interview, our coaching ensures you’re always one step ahead.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/interview-coaching-service/form',
    features: [
      { icon: CheckCircle, color: 'text-green-500', text: 'One-on-one personalized coaching' },
      { icon: CheckCircle, color: 'text-green-500', text: 'Mock interview practice & feedback' },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Tips on mindset, answers, and body language',
      },
    ],
    deliveryInfo: {
      timeframe: 'Scheduled within 48hrs',
      formats: ['Video Call', 'PDF Notes (Optional)'],
    },
    faqs: serviceFAQs.interviewCoaching,
  },
  academicCvWriting: {
    service: {
      title: 'Academic CV Writing',
      price: '30',
      currency: '$',
      tagline: 'Reflect Your Scholarly Excellence',
      description: `<strong style="color: #2563eb;">Showcase your academic journey with precision and clarity. 🎓📚</strong><br/><br/>We craft highly detailed Academic CVs for researchers, professors, and PhD candidates—perfectly tailored for fellowships, grants, publications, and academic roles worldwide.`,
      detailedDescription: `Academic CVs are distinct from professional resumes. They require in-depth documentation of your academic accomplishments, including publications, research, grants, presentations, and teaching experience.<br/><br/>At Prosumely, we specialize in building <strong style="color: #2563eb;">well-structured, comprehensive</strong> CVs that highlight your <strong style="color: #2563eb;">academic impact and credentials</strong>. Whether you're applying for a postdoctoral position, academic job, or fellowship, we ensure your profile stands out in scholarly circles.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/academic-cv-writing-service/form',
    features: [
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Tailored for research, grants, and academic roles',
      },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Detailed documentation of scholarly work',
      },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Structured and publication-ready formatting',
      },
    ],
    deliveryInfo: {
      timeframe: '72hrs',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.academicCvWriting,
  },
  membershipApplication: {
    service: {
      title: 'Membership Application',
      price: '30',
      currency: '$',
      tagline: 'Gateway to Prestigious Memberships',
      description: `<strong style="color: #2563eb;">Seeking membership in a top-tier industry or academic body? We’ve got you covered. 🏛️✨</strong><br/><br/>Our expertly written membership applications highlight your qualifications and achievements—positioning you as a strong candidate for acceptance into elite professional and academic associations.`,
      detailedDescription: `Gaining membership in a prestigious professional or academic body can be a turning point in your career. From IEEE and ACM to medical boards, academic societies, and industry councils—each requires a thoughtful, well-documented application.<br/><br/>At Prosumely, we specialize in writing <strong style="color: #2563eb;">strategic and compelling applications</strong> that reflect your expertise, experience, and alignment with the organization’s values. Whether it’s for <strong style="color: #2563eb;">professional recognition</strong> or <strong style="color: #2563eb;">academic advancement</strong>, we help you present your best case.`,
    },
    contact: {
      whatsapp: '+91 7559112241',
      email: 'contact@prosumely.com',
      note: 'International payments can be made through Debit/Credit card, offering a convenient option for those without an Indian bank account.',
    },
    redirectLink: '/membership-application-service/form',
    features: [
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Tailored for specific membership criteria',
      },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Crafted by experts with industry insight',
      },
      {
        icon: CheckCircle,
        color: 'text-green-500',
        text: 'Perfect for academic & professional bodies',
      },
    ],
    deliveryInfo: {
      timeframe: '72hrs',
      formats: ['PDF', 'Word'],
    },
    faqs: serviceFAQs.membershipApplication,
  },
}
