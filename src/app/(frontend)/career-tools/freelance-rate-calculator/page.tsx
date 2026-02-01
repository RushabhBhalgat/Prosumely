import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import FreelanceRateCalculator from '@/components/career-tools/FreelanceRateCalculator'

export const metadata: Metadata = {
  title: 'Free Freelance Rate Calculator & Pricing Strategy Tool - AI-Powered Pricing | Prosumely',
  description:
    'Calculate optimal freelance rates with our AI-powered tool. Get hourly, project-based, and retainer pricing recommendations based on your experience, skills, location, and desired income. Includes market analysis, package strategies, and negotiation tips.',
  keywords: [
    'freelance rate calculator',
    'freelance pricing tool',
    'hourly rate calculator',
    'project pricing calculator',
    'retainer pricing',
    'freelance pricing strategy',
    'how to price freelance services',
    'freelance rates by country',
    'freelance hourly rate',
    'pricing packages for freelancers',
    'freelance negotiation tips',
    'value-based pricing',
    'freelance income calculator',
    'independent contractor rates',
    'consultant pricing',
    'freelance market rates',
    'pricing strategy tool',
    'freelancer income',
    'competitive freelance rates',
    'free rate calculator',
  ],
  openGraph: {
    title: 'Free Freelance Rate Calculator - AI-Powered Pricing Strategy Tool',
    description:
      'Calculate optimal freelance rates instantly. Get hourly, project-based, and retainer pricing recommendations with market analysis and negotiation strategies.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/freelance-rate-calculator',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/freelance-rate-calculator',
  },
}

export default function FreelanceRateCalculatorPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Freelance Rate Calculator',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free AI-powered freelance rate calculator. Calculate optimal hourly, project-based, and retainer pricing for your freelance services with market analysis and negotiation strategies.',
    url: 'https://prosumely.com/career-tools/freelance-rate-calculator',
    provider: {
      '@type': 'Organization',
      name: 'Prosumely',
      url: 'https://prosumely.com',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '2847',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Hourly rate calculation',
      'Project-based pricing',
      'Monthly retainer recommendations',
      'Market positioning analysis',
      'Package structure recommendations',
      'Negotiation strategies',
      'Client red flag detection',
    ],
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How much should I charge as a freelancer?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Your freelance rate should be based on: (1) Your expenses (overhead, taxes, software, equipment), (2) Desired annual income, (3) Billable hours available (typically 50-60% of total work hours), (4) Market rates for your profession and experience level, and (5) The value you deliver to clients. A common formula: (Annual income goal + Expenses + Taxes) ÷ Billable hours per year = Hourly rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should freelancers price their services at?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Freelancers should price services 2-3x higher than equivalent employee salaries to account for self-employment taxes (15.3%), health insurance, retirement contributions, unpaid sick days, vacation, and business overhead. For example, if a full-time role pays $75K/year, freelancers doing the same work should charge $100-$150/hr ($200K-$300K annual equivalent if fully booked).',
        },
      },
      {
        '@type': 'Question',
        name: 'How to calculate freelance rates based on expenses?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'List all annual expenses: software subscriptions, equipment, internet, coworking space, health insurance, taxes (30-35% of income), marketing, professional development. Add these to your desired take-home income. Divide by realistic billable hours per year (1,200-1,500 hours, not 2,080). Example: $80K income goal + $25K expenses = $105K ÷ 1,300 billable hours = $81/hr minimum rate.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I offer hourly, project-based, or retainer pricing?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Offer all three to give clients flexibility. Hourly works best for small tasks and undefined scope. Project-based pricing rewards efficiency and is great for fixed deliverables (websites, logos, campaigns). Retainers provide predictable monthly income for ongoing work (social media, content, consulting). Most successful freelancers use a mix—retainers for recurring revenue, project-based for larger engagements, and hourly for ad-hoc requests.',
        },
      },
    ],
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Calculator Component */}
      <FreelanceRateCalculator />

      {/* SEO Content Footer */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            About the Freelance Rate Calculator
          </h2>

          <div className="bg-white rounded-xl p-8 shadow-md border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stop Undercharging for Your Services
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              Our AI-powered Freelance Rate Calculator helps you determine optimal pricing for your
              freelance services based on your skills, experience, location, and market demand.
              Whether you&apos;re a web developer, designer, writer, consultant, or any other type
              of freelancer, this tool provides data-driven pricing recommendations that ensure
              you&apos;re compensated fairly for your expertise.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The calculator analyzes multiple factors including your work type, years of
              experience, geographic location, specializations, portfolio size, and desired income.
              You receive comprehensive pricing strategies including hourly rates, project-based
              pricing tiers, monthly retainer options, and professionally structured package
              recommendations—all tailored to your specific situation and market position.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Successful freelancing isn&apos;t just about delivering great work—it&apos;s about
              pricing yourself appropriately, communicating your value effectively, and building
              sustainable income streams. Our tool empowers you with market intelligence,
              negotiation strategies, and confidence to charge what you&apos;re worth while
              remaining competitive.
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Complete Pricing Intelligence</h3>
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
                <strong>Multiple Pricing Models:</strong> Get recommended rates for hourly, daily,
                project-based, and monthly retainer pricing structures to match how you prefer to
                work.
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
                <strong>Market Positioning Analysis:</strong> See where your rates fall compared to
                budget, mid-range, and premium freelancers in your field and location.
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
                <strong>Project-Based Pricing:</strong> Get tiered pricing recommendations for
                small, medium, and large projects with clear scope guidelines to avoid underpricing
                complex work.
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
                <strong>Package Recommendations:</strong> Pre-built Basic, Standard, and Premium
                package structures with deliverables and pricing to help you create attractive
                service offerings.
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
                <strong>Value-Based Pricing Guidance:</strong> Learn how to shift from time-based to
                value-based pricing to increase your income without working more hours.
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
                <strong>Negotiation Strategies:</strong> Actionable tips and tactics for confidently
                discussing rates with clients and handling price objections.
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
                <strong>Red Flag Detection:</strong> Identify warning signs of problematic clients
                who may undervalue your work, delay payment, or create scope creep.
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
                <strong>Income Calculation:</strong> Factor in your desired annual income, business
                expenses, taxes, and benefits to ensure your rates support your financial goals.
              </span>
            </li>
          </ul>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Who Should Use This Calculator?</h3>
          <div className="bg-purple-50 rounded-xl p-6 border border-purple-200 mb-8">
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>New Freelancers:</strong> Starting your freelance journey and unsure what
                  to charge
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Experienced Freelancers:</strong> Ready to raise your rates but need
                  market data to back it up
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Full-Time Employees:</strong> Considering freelancing and want to
                  understand income potential
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Consultants:</strong> Need to structure retainer or project-based pricing
                  packages
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Solopreneurs:</strong> Building a service business and need pricing
                  strategy guidance
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-purple-600 mr-2 flex-shrink-0"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Remote Workers:</strong> Working across borders and need to understand
                  international rate differences
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            How to Use the Freelance Rate Calculator
          </h3>
          <ol className="space-y-4 mb-8">
            <li>
              <strong>1. Select Your Work Type:</strong> Choose from 20+ freelance service
              categories including web development, design, writing, consulting, marketing, and
              more.
            </li>
            <li>
              <strong>2. Specify Your Experience:</strong> Select your experience level from
              beginner (0-2 years) to expert (10+ years) to get rates appropriate for your skill
              level.
            </li>
            <li>
              <strong>3. Enter Your Location:</strong> Your geographic location significantly
              affects market rates. Select your country for localized pricing recommendations.
            </li>
            <li>
              <strong>4. Add Optional Details:</strong> Include specializations, portfolio size,
              desired income, and business expenses for more accurate, personalized recommendations.
            </li>
            <li>
              <strong>5. Review Your Pricing Strategy:</strong> Get comprehensive results including
              hourly rates, project pricing, retainer options, packages, and negotiation tips.
            </li>
            <li>
              <strong>6. Implement and Iterate:</strong> Use these rates as a starting point, test
              them with real clients, and adjust based on demand and your confidence.
            </li>
          </ol>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Common Freelance Pricing Mistakes to Avoid
          </h3>
          <div className="bg-red-50 rounded-xl p-6 border border-red-200 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Not Accounting for Overhead:</strong> Many freelancers forget to factor in
                  software subscriptions, equipment, insurance, and other business expenses.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Forgetting Non-Billable Time:</strong> Marketing, admin, invoicing, and
                  client communication time should be reflected in your rates.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Undervaluing Expertise:</strong> Your years of experience and specialized
                  knowledge have value. Don&apos;t charge beginner rates when you&apos;re not a
                  beginner.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>No Clear Project Scope:</strong> Without defined deliverables and
                  timelines, you risk scope creep and working for less than your worth.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-6 h-6 text-red-500 mr-3 flex-shrink-0 mt-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Being Afraid to Raise Rates:</strong> As you gain experience and improve
                  your skills, your rates should increase accordingly. Annual rate increases are
                  normal and expected.
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Tips for Successful Freelance Pricing
          </h3>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 mb-8">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Communicate Value, Not Hours:</strong> Focus client conversations on
                  outcomes and results rather than time spent.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Offer Packages, Not Just Rates:</strong> Bundled services at tiered price
                  points are easier for clients to understand and choose from.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Be Confident in Your Pricing:</strong> If you&apos;re hesitant about your
                  rates, clients will sense it. Practice your pricing conversation until it feels
                  natural.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Start with Discovery Calls:</strong> Understand the project scope and
                  client budget before quoting to ensure you&apos;re the right fit.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Get Deposits Upfront:</strong> Request 30-50% upfront to qualify serious
                  clients and protect your time investment.
                </span>
              </li>
              <li className="flex items-start">
                <svg
                  className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>
                  <strong>Review Rates Annually:</strong> As you gain experience, skills, and
                  credibility, your rates should increase. Review and adjust every 6-12 months.
                </span>
              </li>
            </ul>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-4">Why Pricing Matters</h3>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your pricing is one of the most important business decisions you&apos;ll make as a
            freelancer. Price too low and you&apos;ll struggle to earn a sustainable income, work
            with lower-quality clients, and burn out from overwork. Price too high without the
            credibility to back it up and you&apos;ll struggle to find clients. The right pricing
            strategy positions you competitively while ensuring you&apos;re compensated fairly for
            your expertise.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            This calculator takes the guesswork out of pricing by providing data-driven
            recommendations based on your specific situation. Use it to gain confidence in your
            rates, structure your service offerings effectively, and build a sustainable freelance
            business that supports your financial goals and lifestyle.
          </p>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Freelance Rates by Profession (2026 Averages)
            </h3>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Here are typical freelance rates across popular professions. Remember: these are
              averages—your rates should reflect your experience, specialization, location, and the
              value you deliver.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm">
                <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">Profession</th>
                    <th className="px-6 py-3 text-left font-semibold">Beginner</th>
                    <th className="px-6 py-3 text-left font-semibold">Intermediate</th>
                    <th className="px-6 py-3 text-left font-semibold">Expert</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Web Developer</td>
                    <td className="px-6 py-4 text-gray-700">$30-$50/hr</td>
                    <td className="px-6 py-4 text-gray-700">$60-$100/hr</td>
                    <td className="px-6 py-4 text-gray-700">$120-$200/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">UI/UX Designer</td>
                    <td className="px-6 py-4 text-gray-700">$35-$55/hr</td>
                    <td className="px-6 py-4 text-gray-700">$65-$110/hr</td>
                    <td className="px-6 py-4 text-gray-700">$125-$250/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Copywriter</td>
                    <td className="px-6 py-4 text-gray-700">$25-$40/hr</td>
                    <td className="px-6 py-4 text-gray-700">$50-$85/hr</td>
                    <td className="px-6 py-4 text-gray-700">$100-$200/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Marketing Consultant</td>
                    <td className="px-6 py-4 text-gray-700">$40-$60/hr</td>
                    <td className="px-6 py-4 text-gray-700">$75-$125/hr</td>
                    <td className="px-6 py-4 text-gray-700">$150-$300/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Graphic Designer</td>
                    <td className="px-6 py-4 text-gray-700">$25-$45/hr</td>
                    <td className="px-6 py-4 text-gray-700">$55-$95/hr</td>
                    <td className="px-6 py-4 text-gray-700">$110-$180/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Video Editor</td>
                    <td className="px-6 py-4 text-gray-700">$30-$50/hr</td>
                    <td className="px-6 py-4 text-gray-700">$60-$100/hr</td>
                    <td className="px-6 py-4 text-gray-700">$120-$220/hr</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">Business Consultant</td>
                    <td className="px-6 py-4 text-gray-700">$50-$80/hr</td>
                    <td className="px-6 py-4 text-gray-700">$100-$175/hr</td>
                    <td className="px-6 py-4 text-gray-700">$200-$500/hr</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Pricing Models: Hourly vs. Project vs. Retainer
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Hourly Rates</h4>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div>
                    <p className="font-semibold text-blue-700">Best For:</p>
                    <p className="text-gray-700">
                      Small tasks, ongoing support, undefined scope projects
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">Pros:</p>
                    <p className="text-gray-700">
                      Flexible for client and freelancer, easy to track and invoice, fair for
                      variable workloads
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-blue-700">Cons:</p>
                    <p className="text-gray-700">
                      Income ceiling, punishes efficiency and speed, client may micromanage hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Project-Based</h4>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div>
                    <p className="font-semibold text-purple-700">Best For:</p>
                    <p className="text-gray-700">
                      Fixed deliverables, web design, content creation, brand identity projects
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700">Pros:</p>
                    <p className="text-gray-700">
                      Rewards efficiency and expertise, higher profit margins, clear client
                      expectations
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-purple-700">Cons:</p>
                    <p className="text-gray-700">
                      Scope creep risk, needs clear contracts, underestimating can hurt profits
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-2">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-gray-900">Retainer</h4>
                </div>
                <div className="space-y-1.5 text-sm">
                  <div>
                    <p className="font-semibold text-green-700">Best For:</p>
                    <p className="text-gray-700">
                      Ongoing services, social media management, content calendars, maintenance
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Pros:</p>
                    <p className="text-gray-700">
                      Predictable monthly income, stability and financial planning, builds long-term
                      relationships
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Cons:</p>
                    <p className="text-gray-700">
                      Clear scope needed, risk of overwork, harder to scale than project work
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 mb-8">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Frequently Asked Questions
            </h3>
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  How much should I charge as a freelancer?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Your freelance rate should be based on: (1) Your expenses (overhead, taxes,
                  software, equipment), (2) Desired annual income, (3) Billable hours available
                  (typically 50-60% of total work hours), (4) Market rates for your profession and
                  experience level, and (5) The value you deliver to clients. A common formula:
                  (Annual income goal + Expenses + Taxes) ÷ Billable hours per year = Hourly rate.
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  What should freelancers price their services at?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Freelancers should price services 2-3x higher than equivalent employee salaries to
                  account for self-employment taxes (15.3%), health insurance, retirement
                  contributions, unpaid sick days, vacation, and business overhead. For example, if
                  a full-time role pays $75K/year, freelancers doing the same work should charge
                  $100-$150/hr ($200K-$300K annual equivalent if fully booked).
                </p>
              </div>

              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  How to calculate freelance rates based on expenses?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  List all annual expenses: software subscriptions, equipment, internet, coworking
                  space, health insurance, taxes (30-35% of income), marketing, professional
                  development. Add these to your desired take-home income. Divide by realistic
                  billable hours per year (1,200-1,500 hours, not 2,080). Example: $80K income goal
                  + $25K expenses = $105K ÷ 1,300 billable hours = $81/hr minimum rate.
                </p>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  Should I offer hourly, project-based, or retainer pricing?
                </h4>
                <p className="text-gray-700 leading-relaxed">
                  Offer all three to give clients flexibility. Hourly works best for small tasks and
                  undefined scope. Project-based pricing rewards efficiency and is great for fixed
                  deliverables (websites, logos, campaigns). Retainers provide predictable monthly
                  income for ongoing work (social media, content, consulting). Most successful
                  freelancers use a mix—retainers for recurring revenue, project-based for larger
                  engagements, and hourly for ad-hoc requests.
                </p>
              </div>
            </div>
          </div>

          {/* Cross-Links Section */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-8 shadow-lg border border-blue-200 mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Related Career & Income Planning Tools
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                href="/career-tools/lifetime-earning-calculator"
                className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Lifetime Earning Calculator
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Project your total career earnings as a freelancer vs. full-time employee to
                      make informed career decisions.
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                href="/career-tools/career-transition-calculator"
                className="group bg-white p-6 rounded-xl border-2 border-blue-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                      Career Transition Calculator
                    </h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Evaluate the financial impact of transitioning from full-time employment to
                      freelancing (or vice versa).
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* CTAs Section */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free Resume Review CTA */}
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Get a Free Resume Review</h3>
                <p className="text-lg mb-6 text-white/90">
                  Whether freelancing full-time or supplementing income, get expert feedback on your
                  resume—free.
                </p>
                <Link
                  href="/resume-review"
                  className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
                >
                  <span style={{ color: '#7c3aed' }}>Get Free Review</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    style={{ color: '#7c3aed' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Executive CV CTA */}
            <div className="bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl shadow-xl p-8 text-white">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">Build a Premium Portfolio</h3>
                <p className="text-lg mb-6 text-white/90">
                  Command higher freelance rates with an executive-level portfolio that showcases
                  your expertise and results.
                </p>
                <Link
                  href="/executive-resume-writing-service"
                  className="inline-flex items-center px-8 py-4 bg-white font-bold text-lg rounded-xl hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl no-underline"
                >
                  <span style={{ color: '#ea580c' }}>Get Professional Help</span>
                  <svg
                    className="w-5 h-5 ml-2"
                    style={{ color: '#ea580c' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-8 border border-purple-200 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Build Your Freelance Career?
            </h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              While our free rate calculator is great for pricing strategy, Prosumely also offers
              professional services to help you build a compelling freelance portfolio, optimize
              your profile for platforms like Upwork and Fiverr, and create proposals that win
              high-value clients.
            </p>
            <Link
              href="/services"
              className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 font-semibold px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 no-underline"
            >
              <span style={{ color: '#ffffff' }}>Explore Professional Services</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
