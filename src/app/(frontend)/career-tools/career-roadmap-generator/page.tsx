import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import CareerRoadmapGenerator from '@/components/career-tools/CareerRoadmapGenerator'

export const metadata: Metadata = {
  title: 'Free Career Roadmap Generator - AI-Powered Career Progression Planner | Prosumely',
  description:
    'Create your personalized career roadmap with our free AI-powered tool. Get a detailed progression plan with skills, certifications, milestones, timelines, and actionable steps to reach your dream role.',
  keywords: [
    'career roadmap generator',
    'career progression planner',
    'career path planning',
    'professional development plan',
    'career advancement roadmap',
    'skills development path',
    'career milestone planning',
    'AI career planning',
    'career trajectory planner',
    'job progression roadmap',
    'career growth strategy',
    'professional career roadmap',
    'career development plan',
    'career transition roadmap',
    'leadership career path',
    'technical career roadmap',
    'career planning tool',
    'free career roadmap',
  ],
  openGraph: {
    title: 'Free Career Roadmap Generator - AI-Powered Career Progression Planner',
    description:
      'Get your personalized career roadmap with phases, skills, certifications, and actionable timelines. AI-powered tool for career planning and professional development.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/career-roadmap-generator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/career-roadmap-generator',
  },
}

export default function CareerRoadmapGeneratorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-12">
        {/* Tool Component */}
        <CareerRoadmapGenerator />

        {/* SEO Content Footer */}
        <div className="max-w-4xl mx-auto mt-16 prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Why Use Our Career Roadmap Generator?
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Transform Your Career with Data-Driven Planning
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered Career Roadmap Generator creates a comprehensive, personalized career
              progression plan tailored to your unique situation. Whether you're a junior developer
              aiming to become a CTO, a marketing coordinator targeting a VP role, or transitioning
              between industries entirely, this tool provides a clear, actionable path to success.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Unlike generic career advice, our roadmap considers your current experience, skills,
              education, budget constraints, time availability, and geographic location to generate
              a realistic plan with specific timelines, skill requirements, certifications, and
              milestones. You'll receive a visual timeline showing exactly what to do and when,
              along with alternative paths if your circumstances change.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            What Makes Our Career Roadmap Tool Unique?
          </h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Visual Interactive Timeline:</strong> See your entire career journey mapped
                out with clickable phases that reveal detailed objectives, skills, certifications,
                and milestones for each stage
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Prioritized Skills Development:</strong> Get a categorized skill tree
                showing foundational, intermediate, advanced, and leadership skills with priority
                levels, estimated learning time, and curated resources
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Actionable Task Breakdown:</strong> Receive specific tasks for the next 30
                days, 3 months, 1 year, and long-term goals so you always know what to do next
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Alternative Career Paths:</strong> Explore multiple routes to your target
                role with pros, cons, and suitability criteria to choose the best path for your
                situation
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Realistic Risk Assessment:</strong> Understand potential obstacles, their
                likelihood, impact, and proven mitigation strategies so you can plan ahead
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Market Intelligence:</strong> Get insights on demand levels, competition,
                growth projections, and salary progression for your target role in your location
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="w-6 h-6 text-purple-500 mr-3 flex-shrink-0 mt-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                <strong>Networking & Personal Brand:</strong> Receive recommendations for
                communities, conferences, content creation, and mentorship opportunities to
                accelerate your progression
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Tool?</h3>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>Career Changers:</strong> Planning a transition to a new role or industry
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>Ambitious Professionals:</strong> Seeking clear path to leadership or
                  senior positions
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>Recent Graduates:</strong> Building long-term career strategy from the
                  start
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>Mid-Career Professionals:</strong> Accelerating progression to next level
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>Technical Specialists:</strong> Transitioning to management or expanding
                  expertise
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                <span>
                  <strong>International Job Seekers:</strong> Planning career moves across countries
                  and markets
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            How the Career Roadmap Generator Works
          </h3>
          <ol className="space-y-4 mb-8 pl-5">
            <li className="text-gray-700">
              <strong className="text-gray-900">1. Input Your Career Context:</strong> Tell us about
              your current role, experience, target position, industry, location, and constraints
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">2. Select Skills & Preferences:</strong> Choose your
              current skills, education level, budget, time availability, and timeline preference
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">3. AI Analysis:</strong> Our advanced AI analyzes
              thousands of career progression patterns, industry trends, and skill requirements
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">4. Receive Your Roadmap:</strong> Get a
              comprehensive, personalized plan with visual timeline, phases, skills, and actionable
              tasks
            </li>
            <li className="text-gray-700">
              <strong className="text-gray-900">5. Take Action:</strong> Follow your roadmap, track
              progress, and adjust as needed to reach your career goals
            </li>
          </ol>

          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white mb-8">
            <h3 className="text-2xl font-bold mb-4">Ready to Map Your Career Success?</h3>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of professionals who have used our Career Roadmap Generator to create
              clear, actionable plans for their career advancement. Get your free personalized
              roadmap in minutes.
            </p>
            <a
              href="#top"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              Generate Your Free Roadmap Now ↑
            </a>
          </div>

          {/* Testimonials Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              What Our Users Say
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">
                  "This tool gave me the clarity I desperately needed. I was stuck as a Senior
                  Developer for 3 years with no direction. The roadmap showed me exactly what skills
                  and certifications I needed for a Tech Lead role. I followed it for 8 months and
                  just got promoted!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold">
                    SJ
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">Sarah Johnson</p>
                    <p className="text-gray-500 text-xs">Tech Lead, San Francisco</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">
                  "Switching from finance to tech seemed impossible until I used this roadmap
                  generator. It mapped out a realistic 18-month transition plan with specific
                  courses, projects, and networking strategies. Now I'm a Product Manager at a
                  fintech startup!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    MC
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">Michael Chen</p>
                    <p className="text-gray-500 text-xs">Product Manager, Toronto</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 text-sm mb-4 italic">
                  "As a marketing coordinator aiming for a VP role, I had no idea where to start.
                  This tool broke down my 5-year journey into manageable phases with clear
                  milestones. I'm now a Marketing Manager, right on track with my roadmap!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                    EP
                  </div>
                  <div className="ml-3">
                    <p className="font-semibold text-gray-900 text-sm">Emily Patel</p>
                    <p className="text-gray-500 text-xs">Marketing Manager, London</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* How to Plan Your Career in 2026 */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-8 mb-8 border border-indigo-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How to Plan Your Career in 2026
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              In 2026, successful career planning requires a strategic blend of AI-powered insights,
              continuous skill development, and adaptability to rapidly evolving markets. Start by
              assessing your current position and defining clear, measurable goals for the next 1-5
              years. Leverage data-driven tools like our Career Roadmap Generator to identify skill
              gaps, emerging opportunities, and industry trends specific to your field. Focus on
              building both technical expertise and soft skills like leadership, communication, and
              emotional intelligence, which remain irreplaceable even as AI transforms workplaces.
              Network strategically through online communities, industry events, and mentorship
              programs while maintaining a strong personal brand on LinkedIn. Most importantly,
              create actionable quarterly milestones with specific deliverables, review your
              progress regularly, and stay flexible to pivot when new opportunities arise or market
              conditions shift.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">
                Is the Career Roadmap Generator really free?
              </h4>
              <p className="text-gray-700 text-sm">
                Yes! This tool is completely free to use with no hidden costs. You can generate
                multiple roadmaps for different career scenarios. For personalized guidance and
                expert support in implementing your roadmap, check out our premium Career Roadmap
                Service.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">
                How accurate are the timelines and recommendations?
              </h4>
              <p className="text-gray-700 text-sm">
                Our AI analyzes real career progression data, industry standards, and skill
                requirements to provide realistic estimates. However, actual timelines vary based on
                individual effort, opportunities, and market conditions. Use the roadmap as a guide
                and adjust based on your progress.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">
                Can I use this for career transitions to different industries?
              </h4>
              <p className="text-gray-700 text-sm">
                Absolutely! The tool is designed to handle both vertical progression (moving up in
                your current field) and horizontal transitions (switching to a new industry). Just
                specify both your current and target industries for tailored recommendations.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">
                What if I'm not sure about my target role?
              </h4>
              <p className="text-gray-700 text-sm">
                Try generating roadmaps for different target roles to explore various paths. You can
                also describe a general direction (e.g., "Senior Leadership in Technology") and the
                AI will provide guidance. Consider exploring the alternative paths section for
                additional options.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h4 className="font-bold text-gray-900 mb-2">
                How often should I update my career roadmap?
              </h4>
              <p className="text-gray-700 text-sm">
                We recommend reviewing and regenerating your roadmap every 6-12 months or whenever
                your circumstances significantly change (new skills acquired, role change, industry
                shift, location change, etc.). This ensures your plan stays relevant and aligned
                with your evolving goals.
              </p>
            </div>
          </div>

          {/* Premium Career Roadmap Service CTA - More Visible */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border-2 border-orange-300 shadow-xl mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Professional Career Roadmap Service - Only $20!
              </h3>
              <p className="text-lg text-gray-700 mb-2">
                🎯 <strong>Want Expert-Crafted Guidance?</strong> Get a professionally designed,
                personalized career roadmap created by our career consultants.
              </p>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Our experts will analyze your background, goals, and market opportunities to create
                a comprehensive strategic plan with industry insights, personalized mentorship
                recommendations, and ongoing support. Perfect for serious career advancement!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
                <Link
                  href="/career-roadmap-service"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-lg font-bold rounded-xl shadow-lg hover:shadow-2xl hover:from-orange-700 hover:to-amber-700 transition-all duration-300 transform hover:scale-105"
                  style={{ color: '#ffffff !important', textDecoration: 'none' }}
                >
                  Get Your Professional Roadmap - $20
                  <svg
                    className="w-5 h-5 ml-2"
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
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Expert Analysis
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Personalized Strategy
                </div>
                <div className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Ongoing Support
                </div>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
            <h4 className="font-bold text-gray-900 mb-2">Need Expert Guidance?</h4>
            <p className="text-gray-700 text-sm mb-4">
              While our AI-powered tool provides comprehensive roadmaps, working with Prosumely's
              career experts can accelerate your journey. Our consultants help refine your strategy,
              optimize your resume and LinkedIn profile, prepare for interviews, and provide ongoing
              support as you progress through each phase.
            </p>
            <Link
              href="/career-roadmap-service"
              className="inline-block bg-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              style={{ color: '#ffffff !important', textDecoration: 'none' }}
            >
              Explore Premium Career Roadmap Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
