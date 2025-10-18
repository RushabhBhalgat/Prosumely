'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote, X } from 'lucide-react'
import Link from 'next/link'
export default function ReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [expandedReviewId, setExpandedReviewId] = useState<number | null>(null)
  const textRefs = useRef<Record<number, HTMLQuoteElement | null>>({})
  const [overflowing, setOverflowing] = useState<Record<number, boolean>>({})

  const reviews = [
    {
      id: 1,
      name: 'Joo Kamal',
      location: 'Egypt',
      avatar: 'RS',
      rating: 5,
      text: 'I am delighted to share that I have recently received a highly competitive CV, cover letter, project portfolio, and professional LinkedIn profile that exceeded my expectations. I was truly impressed by the quality and professionalism of the work delivered. I am deeply grateful to the working team and the career strategy advisor for their incredible guidance and support throughout the update process. I extend my sincere gratitude to everyone who contributed to the development of my professional CV and project portfolio. This outstanding outcome is a direct result of the support and effort you have all provided.',
      highlight: '3 MNC shortlists in 2 weeks',
    },
    {
      id: 2,
      name: 'Lance Pretorius',
      location: 'Egypt',
      avatar: 'SM',
      rating: 5,
      text: 'I recently had my professional resume, globally acceptable CV, cover letter, LinkedIn profile, and project portfolio updated, and I am extremely pleased with the outcome. As someone originally from South Africa but currently living abroad, I truly value how the team tailored my professional CV and portfolio to reflect my international ecperience and aspirations. The guidance, expertise, and support I received from the career strategy advisors and team have been invaluable in presenting my career journey at a global standard.',
      highlight: 'Landed job in under 1 month',
    },
    {
      id: 3,
      name: 'Mike Barry',
      location: 'United Kingdom',
      avatar: 'MA',
      rating: 5,
      text: 'Great service and excellent communications. The portfolio that was created is a fantastic document and gives a thorough visual and descriptive view of my skills and experience . The CV got rid of my old bloated document and now it looks modern and fresh. I have already recommended to a few colleagues . Well worth the price.',
      highlight: 'Perfect for mid-level professionals',
    },
    {
      id: 4,
      name: 'Syafri Joni',
      location: 'Indonesia',
      avatar: 'YH',
      rating: 5,
      text: 'This has been extremely valuable, I believe my CV is now more refined, ATS-compliant, and positioned to capture greater interest from agencies. The addition of a comprehensive portfolio further enables hiring managers to gain a clearer and more complete understanding of my experience and professional profile. I am confident that these enhancements will bring me closer to securing the target role I aspire to',
      highlight: 'ATS-friendly for competitive fields',
    },
    {
      id: 5,
      name: 'Gill Bradley',
      location: 'United Kingdom',
      avatar: 'JL',
      rating: 5,
      text: 'I recently used the services of Malcolm Garrington at Presumely to enhance my CV and create a Project Portfolio. I am thoroughly impressed with the attention to detail and the overall professionalism applied in their consultation. From start to finish the entire process was smooth and highly collaborative. He took the time to understand my background, my professional goals and achievements and show them in a highly structured CV and Portfolio. The final documents were visually appealing as well as being suitable for digital screening tools. I would highly recommend this company’s services to anyone who is seeking to obtain a competitive edge in today’s employment market.',
      highlight: 'Modern and results-driven approach',
    },
    {
      id: 6,
      name: 'Gamal Gawad',
      location: 'Egypt',
      avatar: 'DW',
      rating: 5,
      text: 'I am delighted to share that I have recently received my globally acceptable CV, cover letter, LinkedIn profile and project portfolio. I am confident that this step will contribute to the growth of my career and what I aspire it to be. I am deeply grateful to the working team and Career strategy advisor for giving me this incredible guidance and their support during the updating process. I extend my sincere gratitude to all those who have taken part in the development of my professional CV and my projects portfolio. This awesome outcome is a result of all the support you have given me.',
      highlight: 'Sharp executive tone with personal touch',
    },
    {
      id: 7,
      name: 'Reda Zaghloul',
      location: 'Egypt',
      avatar: 'AE',
      rating: 5,
      text: 'Throughout my 23+ year career in the Oil & Gas industry, I’ve consistently faced challenges in crafting a professional CV—I was liaising with Mr. Malcolm Garrington, Prosumely Advisor. The Prosumely team created a highly competitive CV, cover letter, project portfolio, and Professional LinkedIn profile that exceeded my expectations. I was truly impressed by the quality and professionalism of Prosumely’s work. I would like to acknowledge their team is fully dedicated, detail-oriented, and I would highly recommend their services to anyone seeking an impactful, ATS-friendly CV. Special thanks to Mr. Malcolm Garrington and the entire Prosumely team for their outstanding support! Reda Zaghloul - Egypt',
      highlight: 'Complete career package with LinkedIn',
    },
    {
      id: 8,
      name: 'Bob Albania (Ehab)',
      location: 'United Kingdom',
      avatar: 'KM',
      rating: 5,
      text: 'After 29 years of experience i found out i did not know how to write my CV until it was done for me by PROSUMELY in the most professional way. Ehab.',
      highlight: 'Polished IT industry alignment',
    },
    {
      id: 9,
      name: 'greg clark',
      location: 'United Kingdom',
      avatar: 'FZ',
      rating: 5,
      text: 'Great professional service from start to finish and a very quick turnaround to get my new cv out and about.',
      highlight: 'HR professional approved quality',
    },
    {
      id: 10,
      name: 'A W',
      location: 'Indonesia',
      avatar: 'FZ',
      rating: 5,
      text: 'For Oil and gas Industries QC Inspectors, I’m impressed by how my CV highlights the relevant experience, measurable outcomes, and skills that align with the position. I highly recommend leveraging this CV to support targeted applications and conversations with hiring managers.Agung Widodo.',
      highlight: 'HR professional approved quality',
    },
    {
      id: 11,
      name: 'danang sanyoto',
      location: 'Indonesia',
      avatar: 'FZ',
      rating: 5,
      text: 'Thanks to Prosumely team. All documents are well structured and eye-catching. I believe these documents will help me a lot in getting my dream job.',
      highlight: 'HR professional approved quality',
    },
    {
      id: 12,
      name: 'MD. Ahmed',
      location: 'UAE',
      avatar: 'FZ',
      rating: 5,
      text: 'I am very happy with my CV, cover letter, LinkedIn profile, and project portfolio that Prosumely team created for me. The team was very professional and responsive throughout the process. I would highly recommend their services to anyone looking to improve their job search materials.',
      highlight: 'HR professional approved quality',
    },
  ]

  // Group reviews into slides of 3
  const slides = useMemo(() => {
    const groups: (typeof reviews)[] = []
    for (let i = 0; i < reviews.length; i += 3) {
      groups.push(reviews.slice(i, i + 3))
    }
    return groups
  }, [reviews])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  // Helpers
  const getInitials = (name: string | undefined) => {
    if (!name) return '—'
    try {
      // Normalize whitespace and split words; handle names with special chars
      const parts = name.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean)
      const first = parts[0]?.charAt(0)
      const last = parts.length > 1 ? parts[parts.length - 1]?.charAt(0) : ''
      return `${first ?? ''}${last ?? ''}`.toUpperCase() || '—'
    } catch {
      return '—'
    }
  }

  const selectedReview = useMemo(
    () => reviews.find((r) => r.id === expandedReviewId) || null,
    [expandedReviewId, reviews],
  )

  // Measure which reviews overflow the clamped height
  useEffect(() => {
    const measure = () => {
      const map: Record<number, boolean> = {}
      for (const r of reviews) {
        const el = textRefs.current[r.id]
        if (el) {
          // A tiny epsilon accounts for subpixel rounding
          map[r.id] = el.scrollHeight - el.clientHeight > 1
        }
      }
      setOverflowing(map)
    }

    // Small delay to ensure DOM has rendered after slide change
    const timer = setTimeout(measure, 0)
    window.addEventListener('resize', measure)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', measure)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSlide])

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
                        <blockquote
                          ref={(el) => {
                            textRefs.current[review.id] = el
                          }}
                          className="text-gray-700 text-sm leading-relaxed mb-3 line-clamp-4 md:line-clamp-5 break-words"
                        >
                          {review.text}
                        </blockquote>
                        {overflowing[review.id] && (
                          <div className="flex justify-end mb-4">
                            <button
                              onClick={() => setExpandedReviewId(review.id)}
                              className="text-blue-600/80 hover:text-blue-700 text-xs underline-offset-2 hover:underline transition-colors"
                              aria-label={`Read full review from ${review.name}`}
                            >
                              Know more
                            </button>
                          </div>
                        )}

                        {/* Removed highlight section as requested */}

                        {/* Author Info */}
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                            {getInitials(review.name)}
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
            <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-2">3x</div>
            <div className="text-gray-600 text-sm">More job offers</div>
          </div>

          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-cyan-500 mb-2">4x</div>
            <div className="text-gray-600 text-sm">More Interviews</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">25+</div>
            <div className="text-gray-600 text-sm">Countries Served</div>
          </div>
          <div className="text-center bg-white/60 backdrop-blur-sm border border-blue-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300">
            <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-2">1.5x</div>
            <div className="text-gray-600 text-sm">Average hike in salary</div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Link href="/services">
            <button className="group relative inline-flex items-center justify-center px-3 py-1.5 lg:px-4 lg:py-2 text-base lg:text-lg font-semibold text-slate-800 bg-gradient-to-br from-cyan-300 via-sky-200 to-blue-300 rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-400/60 focus:outline-none focus:ring-4 focus:ring-cyan-300/60 border-2 border-cyan-400/40 backdrop-blur-sm hover:from-cyan-400 hover:via-sky-300 hover:to-blue-400">
              {/* Crystalline shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

              {/* Ice crystal facet effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-200/60 via-transparent via-40% to-blue-400/30 opacity-70"></div>

              {/* Frosted ice texture */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>

              <span className="relative z-10 flex items-center drop-shadow-sm">
                Explore services
                <svg
                  className="ml-2 w-4 h-4 lg:w-5 lg:h-5 transform group-hover:translate-x-1 transition-transform duration-300 text-slate-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </Link>
        </div>
      </div>

      {/* Full Review Modal */}
      {expandedReviewId !== null && selectedReview && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          role="dialog"
          aria-modal="true"
          aria-label={`Full review from ${selectedReview.name}`}
          onClick={() => setExpandedReviewId(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-blue-100 p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 p-2 rounded-full hover:bg-slate-100 text-slate-500 hover:text-slate-700"
              aria-label="Close"
              onClick={() => setExpandedReviewId(null)}
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md">
                {getInitials(selectedReview.name)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{selectedReview.name}</h3>
                {selectedReview.location && (
                  <p className="text-xs text-gray-500">{selectedReview.location}</p>
                )}
              </div>
            </div>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < (selectedReview?.rating ?? 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line break-words">
              {selectedReview.text}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
