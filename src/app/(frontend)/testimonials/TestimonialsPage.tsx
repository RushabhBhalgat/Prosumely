'use client'

import React, { useState } from 'react'
import {
  Star,
  Quote,
  MapPin,
  Briefcase,
  ArrowRight,
  Users,
  TrendingUp,
  Award,
  Zap,
} from 'lucide-react'
import Link from 'next/link'

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  location: string
  country: string
  experience: string
  service: string
  rating: number
  testimonial: string
  results: string
  image?: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Senior Software Engineer',
    company: 'Microsoft',
    location: 'Seattle, USA',
    country: '🇺🇸',
    experience: '7 years',
    service: 'Executive Resume + LinkedIn',
    rating: 5,
    testimonial:
      'Prosumely transformed my career trajectory completely! Their executive resume writing was exceptional - they highlighted my technical leadership skills and project impact in ways I never thought possible. The LinkedIn optimization was the cherry on top.',
    results: '3 interview calls in 2 weeks, 40% salary increase',
  },
  {
    id: 2,
    name: 'Ahmed Al-Rashid',
    role: 'Marketing Director',
    company: 'Emirates Group',
    location: 'Dubai, UAE',
    country: '🇦🇪',
    experience: '10 years',
    service: 'ATS Resume + Cover Letter',
    rating: 5,
    testimonial:
      'Working with Prosumely was a game-changer for my career. They understood the Middle Eastern market perfectly and crafted a resume that showcased my regional expertise. The ATS optimization was crucial for getting past initial screenings.',
    results: 'Landed dream role within 3 weeks',
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Data Scientist',
    company: 'Flipkart',
    location: 'Bangalore, India',
    country: '🇮🇳',
    experience: '4 years',
    service: 'Project Portfolio + Resume',
    rating: 5,
    testimonial:
      'The project portfolio service exceeded my expectations! They beautifully showcased my machine learning projects with compelling visuals and clear impact metrics. It was the perfect complement to my technical resume.',
    results: 'Multiple offers from top tech companies',
  },
  {
    id: 4,
    name: 'Michael Thompson',
    role: 'Financial Analyst',
    company: 'Goldman Sachs',
    location: 'London, UK',
    country: '🇬🇧',
    experience: '5 years',
    service: 'Executive Resume',
    rating: 5,
    testimonial:
      "Prosumely's attention to detail is remarkable. They captured my financial modeling expertise and client relationship management skills perfectly. The resume opened doors to senior positions I thought were out of reach.",
    results: 'Promoted to VP level within 6 months',
  },
  {
    id: 5,
    name: 'Elena Rodriguez',
    role: 'Product Manager',
    company: 'Spotify',
    location: 'Stockholm, Sweden',
    country: '🇸🇪',
    experience: '6 years',
    service: "Jobseeker's Combo",
    rating: 5,
    testimonial:
      'The complete package was exactly what I needed! Resume, cover letter, LinkedIn optimization, and career roadmap - everything was tailored perfectly for product management roles in tech. Highly professional service.',
    results: 'Transitioned from startup to Fortune 500',
  },
  {
    id: 9,
    name: 'Fatima Al-Zahra',
    role: 'Civil Engineer',
    company: 'Saudi Aramco',
    location: 'Riyadh, Saudi Arabia',
    country: '🇸🇦',
    experience: '7 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      "As a female engineer in Saudi Arabia, I needed a resume that highlighted my technical achievements and leadership potential. Prosumely delivered exactly that, with a career roadmap that's guiding my path to senior management.",
    results: 'Fast-tracked for leadership development program',
  },
  {
    id: 10,
    name: 'James Wilson',
    role: 'Sales Director',
    company: 'Salesforce',
    location: 'Toronto, Canada',
    country: '🇨🇦',
    experience: '12 years',
    service: 'ATS Resume + Cover Letter',
    rating: 5,
    testimonial:
      'After 12 years in sales, I thought my resume spoke for itself. Prosumely showed me how wrong I was! They quantified my achievements in ways that made me stand out from other senior sales professionals.',
    results: '30% salary increase in new role',
  },
  {
    id: 11,
    name: 'Aisha Okonkwo',
    role: 'HR Business Partner',
    company: 'Unilever',
    location: 'Lagos, Nigeria',
    country: '🇳🇬',
    experience: '6 years',
    service: 'Executive Resume + Interview Coaching',
    rating: 5,
    testimonial:
      'Prosumely understood the nuances of showcasing HR expertise for multinational roles. The interview coaching helped me confidently discuss complex people strategies and change management initiatives.',
    results: 'Relocated to regional role in London',
  },
  {
    id: 12,
    name: 'Hiroshi Tanaka',
    role: 'Manufacturing Engineer',
    company: 'Toyota',
    location: 'Tokyo, Japan',
    country: '🇯🇵',
    experience: '11 years',
    service: 'Project Portfolio + Resume',
    rating: 5,
    testimonial:
      'The technical portfolio perfectly captured my lean manufacturing implementations and process improvements. They presented complex engineering projects in a visually appealing and easily understandable format.',
    results: 'Promoted to Chief Engineer position',
  },
  {
    id: 13,
    name: 'Sophie Dubois',
    role: 'Brand Manager',
    company: "L'Oréal",
    location: 'Paris, France',
    country: '🇫🇷',
    experience: '4 years',
    service: "Jobseeker's Combo",
    rating: 5,
    testimonial:
      'Magnifique! The team captured my creative marketing campaigns and brand strategy expertise perfectly. The comprehensive approach with resume, LinkedIn, and career guidance was exactly what I needed for international roles.',
    results: 'Secured global brand manager role',
  },
  {
    id: 15,
    name: 'Lisa Anderson',
    role: 'Marketing Manager',
    company: 'Qantas',
    location: 'Sydney, Australia',
    country: '🇦🇺',
    experience: '5 years',
    service: 'ATS Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'The career roadmap was incredibly insightful! It helped me identify skill gaps and plan my path to senior marketing roles. The ATS-optimized resume got me through screening processes I previously struggled with.',
    results: 'Clear path to CMO role mapped out',
  },
  {
    id: 16,
    name: 'Raj Patel',
    role: 'IT Consultant',
    company: 'Accenture',
    location: 'Mumbai, India',
    country: '🇮🇳',
    experience: '9 years',
    service: 'Executive Resume + Project Portfolio',
    rating: 5,
    testimonial:
      'Perfect combination for showcasing both consulting expertise and technical delivery. The portfolio highlighted my digital transformation projects beautifully, while the resume positioned me for partner-track roles.',
    results: 'Fast-tracked to Senior Manager',
  },
  {
    id: 17,
    name: 'Anna Kowalski',
    role: 'Pharmaceutical Researcher',
    company: 'Roche',
    location: 'Basel, Switzerland',
    country: '🇨🇭',
    experience: '10 years',
    service: 'Academic CV + SOP',
    rating: 5,
    testimonial:
      'Exceptional work on my academic CV! They highlighted my drug development research and clinical trial experience perfectly. The SOP for my research fellowship application was compelling and well-crafted.',
    results: 'Awarded prestigious research fellowship',
  },
  {
    id: 18,
    name: 'Omar Hassan',
    role: 'Project Manager',
    company: 'Qatar Airways',
    location: 'Doha, Qatar',
    country: '🇶🇦',
    experience: '7 years',
    service: 'Executive Resume + Interview Coaching',
    rating: 5,
    testimonial:
      'Prosumely helped me transition from technical to strategic roles. The interview coaching was particularly valuable for executive-level conversations about transformation and operational excellence in aviation.',
    results: 'Promoted to Head of Digital Transformation',
  },
  {
    id: 19,
    name: 'Isabella Rossi',
    role: 'Fashion Designer',
    company: 'Prada',
    location: 'Milan, Italy',
    country: '🇮🇹',
    experience: '6 years',
    service: 'Project Portfolio + LinkedIn',
    rating: 5,
    testimonial:
      'Bellissimo! The creative portfolio showcased my design aesthetic and fashion collections perfectly. The LinkedIn optimization helped me connect with industry leaders and fashion houses globally.',
    results: 'Launched independent fashion label',
  },
  {
    id: 21,
    name: 'Grace Chen',
    role: 'Pediatric Nurse',
    company: 'Singapore General Hospital',
    location: 'Singapore',
    country: '🇸🇬',
    experience: '12 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'Transitioning from clinical to healthcare administration required a complete resume overhaul. Prosumely captured my patient care excellence and leadership potential perfectly. The career roadmap is my guide to CNO role.',
    results: 'Accepted into hospital leadership program',
  },
  {
    id: 22,
    name: 'Thomas Mueller',
    role: 'Automotive Engineer',
    company: 'BMW',
    location: 'Munich, Germany',
    country: '🇩🇪',
    experience: '9 years',
    service: 'Project Portfolio + Executive Resume',
    rating: 5,
    testimonial:
      'Outstanding technical portfolio! They showcased my electric vehicle development projects and sustainability initiatives beautifully. Perfect for advancing in the evolving automotive industry.',
    results: 'Leading EV development team',
  },
  {
    id: 23,
    name: 'Yuki Yamamoto',
    role: 'Game Developer',
    company: 'Nintendo',
    location: 'Kyoto, Japan',
    country: '🇯🇵',
    experience: '5 years',
    service: 'Project Portfolio + LinkedIn',
    rating: 5,
    testimonial:
      'Amazing creative portfolio! They captured my game development projects and creative process perfectly. The LinkedIn optimization helped me connect with studios worldwide and showcase my gaming portfolio.',
    results: 'Multiple offers from AAA game studios',
  },
  {
    id: 24,
    name: 'Emma Thompson',
    role: 'Sustainability Manager',
    company: 'Unilever',
    location: 'Amsterdam, Netherlands',
    country: '🇳🇱',
    experience: '6 years',
    service: "Jobseeker's Combo",
    rating: 5,
    testimonial:
      'Perfect for my niche in sustainability! They highlighted my environmental impact initiatives and ESG strategy work beautifully. The comprehensive package positioned me perfectly for senior sustainability roles.',
    results: 'Headhunted by renewable energy company',
  },
  {
    id: 26,
    name: 'Amara Okafor',
    role: 'Supply Chain Manager',
    company: 'Dangote Group',
    location: 'Lagos, Nigeria',
    country: '🇳🇬',
    experience: '8 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'Prosumely helped me showcase my supply chain optimization expertise across West Africa. The career roadmap provided clear steps for transitioning to international logistics roles.',
    results: 'Secured regional director position',
  },
  {
    id: 27,
    name: 'Kenji Nakamura',
    role: 'Robotics Engineer',
    company: 'SoftBank Robotics',
    location: 'Tokyo, Japan',
    country: '🇯🇵',
    experience: '6 years',
    service: 'Project Portfolio + LinkedIn',
    rating: 5,
    testimonial:
      'The technical portfolio beautifully showcased my AI and robotics projects. The visual presentation of complex algorithms and automation solutions impressed hiring managers at top tech companies.',
    results: 'Multiple offers from Silicon Valley companies',
  },
  {
    id: 28,
    name: 'Lucia Fernandez',
    role: 'Digital Marketing Specialist',
    company: 'Telefonica',
    location: 'Madrid, Spain',
    country: '🇪🇸',
    experience: '5 years',
    service: 'ATS Resume + Cover Letter',
    rating: 5,
    testimonial:
      'Perfect for showcasing my digital campaign successes across European markets. The ATS optimization ensured my applications reached human recruiters, and the cover letter template was incredibly effective.',
    results: 'Landed senior marketing role at Google',
  },
  {
    id: 29,
    name: 'Marcus Williams',
    role: 'Investment Analyst',
    company: 'Standard Bank',
    location: 'Johannesburg, South Africa',
    country: '🇿🇦',
    experience: '7 years',
    service: 'Executive Resume + Interview Coaching',
    rating: 5,
    testimonial:
      'Exceptional service for transitioning from traditional banking to fintech. The interview coaching prepared me for technical questions about blockchain and digital currencies.',
    results: 'Joined leading cryptocurrency exchange',
  },
  {
    id: 30,
    name: 'Ingrid Larsson',
    role: 'Environmental Scientist',
    company: 'IKEA',
    location: 'Stockholm, Sweden',
    country: '🇸🇪',
    experience: '9 years',
    service: 'Academic CV + SOP',
    rating: 5,
    testimonial:
      'Outstanding work on highlighting my sustainability research and corporate environmental initiatives. The SOP for my doctoral program application was compelling and well-structured.',
    results: 'Accepted into top environmental science PhD program',
  },
  {
    id: 31,
    name: "Ryan O'Connor",
    role: 'Software Architect',
    company: 'Shopify',
    location: 'Ottawa, Canada',
    country: '🇨🇦',
    experience: '12 years',
    service: 'Project Portfolio + Executive Resume',
    rating: 5,
    testimonial:
      'Brilliant showcase of my cloud architecture and scalability solutions. The portfolio highlighted my system design expertise, while the resume positioned me perfectly for CTO roles.',
    results: 'Promoted to Chief Technology Officer',
  },
  {
    id: 32,
    name: 'Mei Lin Zhang',
    role: 'Pharmaceutical Researcher',
    company: 'Novartis',
    location: 'Basel, Switzerland',
    country: '🇨🇭',
    experience: '8 years',
    service: 'Academic CV + Interview Coaching',
    rating: 5,
    testimonial:
      'Perfect for transitioning from research to regulatory affairs. They highlighted my drug development experience and prepared me for complex regulatory interview scenarios.',
    results: 'Secured FDA liaison position',
  },
  {
    id: 33,
    name: 'Ahmed Ben Ali',
    role: 'Petroleum Engineer',
    company: 'Qatar Petroleum',
    location: 'Doha, Qatar',
    country: '🇶🇦',
    experience: '10 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'Excellent understanding of the energy transition landscape. They positioned my traditional oil & gas experience for renewable energy opportunities while mapping a clear transition path.',
    results: 'Leading solar energy development project',
  },
  {
    id: 36,
    name: 'Rajesh Kumar',
    role: 'AI Research Scientist',
    company: 'Infosys',
    location: 'Bangalore, India',
    country: '🇮🇳',
    experience: '9 years',
    service: 'Academic CV + SOP',
    rating: 5,
    testimonial:
      'Exceptional work highlighting my machine learning research and publications. The SOP for my postdoc application perfectly captured my research vision and future goals.',
    results: 'Awarded prestigious research fellowship at MIT',
  },
  {
    id: 37,
    name: 'Emma Davies',
    role: 'Clinical Psychologist',
    company: 'NHS',
    location: 'London, UK',
    country: '🇬🇧',
    experience: '8 years',
    service: 'Executive Resume + Interview Coaching',
    rating: 5,
    testimonial:
      'Perfect for transitioning from clinical practice to healthcare leadership. The interview coaching prepared me for discussions about mental health policy and healthcare transformation.',
    results: 'Appointed as Head of Mental Health Services',
  },
  {
    id: 38,
    name: 'Hans Mueller',
    role: 'Renewable Energy Engineer',
    company: 'Siemens',
    location: 'Berlin, Germany',
    country: '🇩🇪',
    experience: '11 years',
    service: 'Project Portfolio + Executive Resume',
    rating: 5,
    testimonial:
      'Outstanding showcase of my wind energy and grid optimization projects. The portfolio highlighted my contribution to Germany energy transition with impressive visual impact.',
    results: 'Leading European renewable energy initiative',
  },
  {
    id: 39,
    name: 'Yuki Tanaka',
    role: 'UX Designer',
    company: 'Sony',
    location: 'Tokyo, Japan',
    country: '🇯🇵',
    experience: '6 years',
    service: 'Project Portfolio + LinkedIn',
    rating: 5,
    testimonial:
      'Beautiful creative portfolio showcasing my user experience design for gaming and entertainment products. The LinkedIn optimization helped me attract attention from global design teams.',
    results: 'Hired as Senior UX Designer at Apple',
  },
  {
    id: 40,
    name: 'Marco Rossi',
    role: 'Aerospace Engineer',
    company: 'Leonardo',
    location: 'Milan, Italy',
    country: '🇮🇹',
    experience: '12 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'Exceptional work highlighting my satellite and defense projects. The career roadmap provided clear guidance for transitioning to commercial space industry leadership roles.',
    results: 'Joined SpaceX as Principal Engineer',
  },
  {
    id: 41,
    name: 'Fatou Diallo',
    role: 'Public Health Specialist',
    company: 'WHO',
    location: 'Geneva, Switzerland',
    country: '🇨🇭',
    experience: '10 years',
    service: 'Academic CV + Interview Coaching',
    rating: 5,
    testimonial:
      'Perfect for showcasing my global health initiatives across Africa. The interview coaching prepared me for complex discussions about health policy and international development.',
    results: 'Promoted to Regional Director position',
  },
  {
    id: 42,
    name: 'Lars Anderson',
    role: 'Maritime Engineer',
    company: 'Maersk',
    location: 'Copenhagen, Denmark',
    country: '🇩🇰',
    experience: '9 years',
    service: 'Project Portfolio + Executive Resume',
    rating: 5,
    testimonial:
      'Impressive portfolio showcasing my shipping optimization and green maritime technology projects. They positioned my expertise perfectly for the industry carbon neutrality transition.',
    results: 'Leading sustainable shipping initiative',
  },
  {
    id: 43,
    name: 'Aisha Patel',
    role: 'Fintech Product Manager',
    company: 'Paytm',
    location: 'Mumbai, India',
    country: '🇮🇳',
    experience: '7 years',
    service: "Jobseeker's Combo",
    rating: 5,
    testimonial:
      'Comprehensive package perfect for fintech transitions. They highlighted my digital payments expertise and user growth achievements, positioning me for senior product roles in global fintech.',
    results: 'Joined Stripe as Senior Product Manager',
  },
  {
    id: 44,
    name: 'Jean-Pierre Dubois',
    role: 'Luxury Brand Manager',
    company: 'LVMH',
    location: 'Paris, France',
    country: '🇫🇷',
    experience: '8 years',
    service: 'Executive Resume + LinkedIn',
    rating: 5,
    testimonial:
      'Magnifique! They captured my luxury retail expertise and brand strategy accomplishments perfectly. The LinkedIn optimization helped me connect with global luxury brand leaders.',
    results: 'Promoted to Global Brand Director',
  },
  {
    id: 46,
    name: 'Robert Chen',
    role: 'Blockchain Developer',
    company: 'Ethereum Foundation',
    location: 'Singapore',
    country: '🇸🇬',
    experience: '5 years',
    service: 'Project Portfolio + ATS Resume',
    rating: 5,
    testimonial:
      'Excellent showcase of my DeFi and smart contract development projects. The technical portfolio impressed hiring managers at top crypto companies with clear explanations of complex blockchain solutions.',
    results: 'Lead Developer role at major DeFi protocol',
  },
  {
    id: 47,
    name: 'Victoria Smith',
    role: 'Space Systems Engineer',
    company: 'NASA',
    location: 'Houston, USA',
    country: '🇺🇸',
    experience: '11 years',
    service: 'Executive Resume + Career Roadmap',
    rating: 5,
    testimonial:
      'Perfect for transitioning from government to commercial space sector. They highlighted my mission-critical project experience while mapping a path to private aerospace leadership.',
    results: 'Joined Blue Origin as Principal Engineer',
  },
  {
    id: 48,
    name: 'Olumide Adebayo',
    role: 'Mobile App Developer',
    company: 'Jumia',
    location: 'Lagos, Nigeria',
    country: '🇳🇬',
    experience: '6 years',
    service: 'Project Portfolio + Interview Coaching',
    rating: 5,
    testimonial:
      'Impressive portfolio showcasing my e-commerce and mobile payment applications across Africa. The interview coaching prepared me for technical discussions about scalable mobile solutions.',
    results: 'Senior iOS Developer at Spotify',
  },
  {
    id: 49,
    name: 'Anna Kozlov',
    role: 'Quantum Computing Researcher',
    company: 'IBM Research',
    location: 'Zurich, Switzerland',
    country: '🇨🇭',
    experience: '8 years',
    service: 'Academic CV + SOP',
    rating: 5,
    testimonial:
      'Exceptional work highlighting my quantum algorithm research and publications. The SOP for my senior research position application perfectly captured the potential of quantum computing.',
    results: 'Appointed as Principal Research Scientist',
  },
  {
    id: 50,
    name: 'Carlos Mendez',
    role: 'Electric Vehicle Engineer',
    company: 'Tesla',
    location: 'Austin, USA',
    country: '🇺🇸',
    experience: '7 years',
    service: 'Project Portfolio + Executive Resume',
    rating: 5,
    testimonial:
      'Outstanding showcase of my battery technology and charging infrastructure projects. They positioned my expertise perfectly for the global EV market expansion and leadership roles.',
    results: 'VP of Engineering at EV startup',
  },
]

const services = [
  'All Services',
  'ATS Resume',
  'Executive Resume',
  'Project Portfolio',
  'LinkedIn Optimization',
  "Jobseeker's Combo",
  'Academic CV',
  'Interview Coaching',
  'Career Roadmap',
  'SOP Writing',
  'Cover Letter',
]

export default function TestimonialsPage() {
  const [filter, setFilter] = useState('All Services')
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false)

  const filteredTestimonials = testimonials.filter((testimonial) => {
    const serviceMatch = filter === 'All Services' || testimonial.service.includes(filter)
    return serviceMatch
  })

  const loadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCount((prev) => Math.min(prev + 6, filteredTestimonials.length))
      setIsLoading(false)
    }, 500)
  }

  const stats = [
    { icon: Users, value: '1000+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' },
    { icon: Award, value: '25+', label: 'Countries Served' },
    { icon: Zap, value: '2 Weeks', label: 'Avg. Time to Interview' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-600 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Success Stories That
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">
                Inspire & Transform
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Real professionals, real results. Discover how our career services have transformed
              careers across 25+ countries and helped professionals achieve their dream jobs.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
                >
                  <stat.icon className="w-8 h-8 text-cyan-300 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-blue-200 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Client Testimonials
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Browse through testimonials from professionals across various industries and locations
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            {/* Service Filter */}
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Service
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-8">
            <p className="text-gray-600">
              Showing {Math.min(visibleCount, filteredTestimonials.length)} of{' '}
              {filteredTestimonials.length} testimonials
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.slice(0, visibleCount).map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards' }}
              >
                {/* Quote Icon */}
                <Quote className="w-6 h-6 text-blue-500 mb-4" />

                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-sm">
                  "
                  {testimonial.testimonial.length > 150
                    ? testimonial.testimonial.substring(0, 150) + '...'
                    : testimonial.testimonial}
                  "
                </blockquote>

                {/* Results */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                  <div className="flex items-center mb-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs font-semibold text-green-800">Results</span>
                  </div>
                  <p className="text-green-700 text-xs">{testimonial.results}</p>
                </div>

                {/* Author Info */}
                <div className="border-t pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-blue-600 text-xs font-medium mb-1">
                        {testimonial.role}
                      </div>
                      <div className="text-gray-600 text-xs mb-2">{testimonial.company}</div>
                      <div className="flex items-center text-gray-500 text-xs">
                        <MapPin className="w-3 h-3 mr-1" />
                        <span className="mr-1">{testimonial.country}</span>
                        {testimonial.location}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium mb-2 text-center">
                        {testimonial.service.split(' + ')[0]}
                      </div>
                      <div className="flex items-center text-gray-500 text-xs justify-center">
                        <Briefcase className="w-3 h-3 mr-1" />
                        {testimonial.experience}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredTestimonials.length && (
            <div className="text-center mt-12">
              <button
                onClick={loadMore}
                disabled={isLoading}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold rounded-full hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Loading...
                  </>
                ) : (
                  <>
                    Load More Testimonials
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-900 to-cyan-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Write Your Success Story?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our expert
            services. Your success story could be featured next!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-900 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105"
            >
              View Our Services
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
            <Link
              href="/free-resume-review"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-blue-900 transition-all duration-300"
            >
              Get Free Resume Review
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
