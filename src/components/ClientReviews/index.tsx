'use client'
import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'

export default function ReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const reviews = [
    {
      id: 1,
      name: 'Ravi S.',
      location: 'Bangalore, India',
      avatar: 'RS',
      rating: 5,
      text: 'I was struggling to get interview calls even with decent experience. After getting my resume rewritten here, I saw a massive difference! Within 2 weeks, I got shortlisted by 3 companies. Prosumely is highly recommended for Indian job seekers!',
      highlight: '3 MNC shortlists in 2 weeks',
    },
    {
      id: 2,
      name: 'Sara M.',
      location: 'Dubai, UAE',
      avatar: 'SM',
      rating: 5,
      text: 'The Prosumely team completely transformed my CV to match the UAE job market. Clean, professional layout with strong keywords. I landed a job in less than a month! Very happy with the service.',
      highlight: 'Landed job in under 1 month',
    },
    {
      id: 3,
      name: 'Mohamed A.',
      location: 'Doha, Qatar',
      avatar: 'MA',
      rating: 5,
      text: 'Excellent service. My resume was outdated and not attracting any recruiters. The new format and professional language made a big impact. Great for mid-level professionals like me.',
      highlight: 'Perfect for mid-level professionals',
    },
    {
      id: 4,
      name: 'Yousef H.',
      location: 'Riyadh, KSA',
      avatar: 'YH',
      rating: 4,
      text: 'The resume I received was well written and ATS-friendly. Helped me secure an interview in a competitive field. Communication was good, though delivery was delayed by a day. Still worth it.',
      highlight: 'ATS-friendly for competitive fields',
    },
    {
      id: 5,
      name: 'Jessica L.',
      location: 'New York, USA',
      avatar: 'JL',
      rating: 5,
      text: 'Impressive turnaround and quality. They understood exactly what US employers look for. My resume finally feels modern and results-driven. I already recommended them to two friends.',
      highlight: 'Modern and results-driven approach',
    },
    {
      id: 6,
      name: 'David W.',
      location: 'London, UK',
      avatar: 'DW',
      rating: 5,
      text: 'Professional and detailed work. My CV was tailored for the UK market and had a sharp, executive tone. I appreciated the quick revisions and personal touch. Highly satisfied.',
      highlight: 'Sharp executive tone with personal touch',
    },
    {
      id: 7,
      name: 'Amina E.',
      location: 'Cairo, Egypt',
      avatar: 'AE',
      rating: 5,
      text: 'Very responsive and professional team. They created a new resume and LinkedIn profile for me that got a lot of attention. The service is affordable and worth every pound.',
      highlight: 'Complete career package with LinkedIn',
    },
    {
      id: 8,
      name: 'Karan M.',
      location: 'Dubai, UAE',
      avatar: 'KM',
      rating: 4,
      text: 'Great value for money. The content was very polished and aligned with my industry. The design was clean and professional. I got 2 interview calls within a week of using the new resume.',
      highlight: 'Polished IT industry alignment',
    },
    {
      id: 9,
      name: 'Fatima Z.',
      location: 'Abu Dhabi, UAE',
      avatar: 'FZ',
      rating: 5,
      text: 'I work in HR and I know a good CV when I see one. The one I received from this team was flawless. Highly recommended for job seekers in the Gulf region.',
      highlight: 'HR professional approved quality',
    },
    {
      id: 10,
      name: 'Ahmed R.',
      location: 'Jeddah, KSA',
      avatar: 'AR',
      rating: 5,
      text: 'My resume needed to be bilingual and focused on engineering. They delivered exactly that with perfect formatting and strong wording. Very satisfied with their service!',
      highlight: 'Bilingual engineering expertise',
    },
    {
      id: 11,
      name: 'Priya K.',
      location: 'Mumbai, India',
      avatar: 'PK',
      rating: 5,
      text: 'As a finance professional, I needed my resume to showcase complex analytical skills. The team did an outstanding job highlighting my achievements with quantified results. Got 5 interview calls in one week!',
      highlight: '5 finance interviews in 1 week',
    },
    {
      id: 12,
      name: 'Michael T.',
      location: 'Toronto, Canada',
      avatar: 'MT',
      rating: 5,
      text: 'The Canadian job market is tough, but this team knew exactly how to position my skills. My new resume opened doors I never thought possible. The investment was absolutely worth it!',
      highlight: 'Cracked competitive Canadian market',
    },
  ]

  // Group reviews into slides of 3
  const slides = []
  for (let i = 0; i < reviews.length; i += 3) {
    slides.push(reviews.slice(i, i + 3))
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white py-20 overflow-hidden -mt-8 md:mt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-300 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-cyan-200 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 fill-current" />
            <span>Trusted by Professionals Worldwide</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Reviews, trusted
            <span className="block">
              <span className="text-blue-600">by Jobseekers</span>{' '}
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Join thousands of professionals who've transformed their careers with our expert resume
            services
          </p>
        </div>

        {/* Reviews Slider Container */}
        <div className="relative max-w-7xl mx-auto mb-12">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-blue-200 hover:border-blue-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group -ml-6"
          >
            <ChevronLeft className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm border border-blue-200 hover:border-blue-300 p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group -mr-6"
          >
            <ChevronRight className="w-5 h-5 text-blue-600 group-hover:text-blue-700" />
          </button>

          {/* Reviews Grid */}
          <div className="overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, slideIndex) => (
                <div key={slideIndex} className="w-full flex-shrink-0">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-2">
                    {slide.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white/80 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative group"
                      >
                        {/* Quote Icon */}
                        <div className="absolute -top-3 -left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="bg-gradient-to-r from-cyan-400 to-blue-500 p-2 rounded-xl shadow-lg">
                            <Quote className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Review Text */}
                        <blockquote className="text-gray-700 text-sm leading-relaxed mb-4 line-clamp-6">
                          "{review.text}"
                        </blockquote>

                        {/* Key Impact */}
                        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg mb-4">
                          <p className="text-blue-700 font-medium text-xs">
                            💡 Key Impact: {review.highlight}
                          </p>
                        </div>

                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {review.avatar}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm">{review.name}</h4>
                            <p className="text-gray-500 text-xs">{review.location}</p>
                          </div>
                          {/* Rating */}
                          <div
                            className="flex gap-1 ml-12
"
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mb-12">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-500 w-8' : 'bg-blue-200 hover:bg-blue-300 w-2'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600 text-sm">Client Satisfaction</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-2">3x</div>
            <div className="text-gray-600 text-sm">More Interviews</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600 text-sm">Countries Served</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-2">2 Days</div>
            <div className="text-gray-600 text-sm">Avg Turnaround</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Explore our services →
          </button>
        </div>
      </div>
    </section>
  )
}
