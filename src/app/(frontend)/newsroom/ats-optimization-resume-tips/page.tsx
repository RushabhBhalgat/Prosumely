import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

export const metadata = {
  title: 'ATS Optimization: The Secret to Getting Your Resume Seen | Prosumely',
  description:
    'Discover how Applicant Tracking Systems (ATS) work and how to optimize your resume for both machines and humans to maximize interview opportunities. Actionable tips for ATS-friendly resumes.',
  keywords: [
    'ATS optimization',
    'resume tips',
    'job search',
    'resume keywords',
    'resume formatting',
    'Prosumely',
    'success story',
  ],
  openGraph: {
    title: 'ATS Optimization: The Secret to Getting Your Resume Seen | Prosumely',
    description:
      'Discover how Applicant Tracking Systems (ATS) work and how to optimize your resume for both machines and humans to maximize interview opportunities. Actionable tips for ATS-friendly resumes.',
    url: 'https://prosumely.com/newsroom/ats-optimization-resume-tips',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'ATS optimization and resume',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ATS Optimization: The Secret to Getting Your Resume Seen | Prosumely',
    description:
      'Discover how Applicant Tracking Systems (ATS) work and how to optimize your resume for both machines and humans to maximize interview opportunities. Actionable tips for ATS-friendly resumes.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/newsroom/ats-optimization-resume-tips',
  },
}

export default function ATSOptimizationResumeTipsArticle() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-4">
          <Link
            href="/newsroom"
            className="inline-block text-blue-600 hover:underline text-sm px-2 py-1 rounded transition"
          >
            ← Back to Newsroom
          </Link>
        </div>
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
            The Invisible Advantage: Why ATS Optimization Is Your Secret Weapon
          </h1>
          <Image
            src="/newsroom-images/ats-optimization.jpg"
            alt="ATS optimization and resume"
            width={900}
            height={256}
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
            priority
          />
        </header>
        {/* Metrics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">95%</div>
            <div className="text-sm text-gray-600">Fortune 500 companies use ATS</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">80%</div>
            <div className="text-sm text-gray-600">Resumes rejected for formatting issues</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">70%</div>
            <div className="text-sm text-gray-600">Success rate with ATS-optimized resumes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">2x</div>
            <div className="text-sm text-gray-600">More interviews with ATS-friendly format</div>
          </div>
        </section>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Introduction</h2>
            <p className="text-gray-800">
              You might have the perfect experience, the right skills, and a well-written resume.
              But if that resume isn't ATS-optimized, it might never be seen by human eyes. Welcome
              to the reality of modern hiring: your first reviewer is a machine.
            </p>
            <p className="text-gray-800">
              Applicant Tracking Systems (ATS) are now used by over 95% of Fortune 500 companies and
              a growing number of small to medium enterprises. These systems are designed to filter,
              sort, and rank resumes based on keyword matches and structural compatibility. If your
              resume doesn't speak their language, it's game over before the game begins.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">What Is an ATS, Really?</h2>
            <p className="text-gray-800">
              An Applicant Tracking System is a software platform that streamlines the hiring
              process. It scans resumes for keywords, categorizes skills, evaluates job match, and
              eliminates candidates who don't meet the preset criteria. To the system, your resume
              is not a story—it's data.
            </p>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Whether you meet the minimum qualifications.</li>
              <li>How relevant your experience is to the job description.</li>
              <li>Where your skills align with the role.</li>
              <li>Whether your format is compatible for parsing.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Why Good Resumes Get Rejected
            </h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Use of tables, headers, or graphics that confuse parsing software.</li>
              <li>Inconsistent formatting or unconventional layouts.</li>
              <li>Lack of role-specific keywords.</li>
              <li>File types (e.g., using a PDF when only .docx is accepted).</li>
            </ul>
            <p className="text-gray-800">
              That's why even brilliant candidates can get overlooked. It's not you—it's your
              resume's compatibility with ATS.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              The Art and Science of Keywords
            </h2>
            <p className="text-gray-800">
              Keyword optimization isn't about stuffing buzzwords. It's about understanding what the
              job description is asking for and mirroring that language strategically. This
              includes:
            </p>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Hard skills (e.g., JavaScript, Excel, P&L Management).</li>
              <li>Soft skills (e.g., team leadership, adaptability).</li>
              <li>Industry terms (e.g., agile, GAAP, SEO).</li>
            </ul>
            <p className="text-gray-800">
              Tools like jobscan or Prosumely's proprietary analysis framework help identify the
              exact terms you need to integrate.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Formatting That Gets Read</h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Use standard fonts (Arial, Calibri, Times New Roman).</li>
              <li>Avoid text boxes, graphics, and icons.</li>
              <li>Label sections clearly (Work Experience, Education, Skills).</li>
              <li>Submit in .docx format unless instructed otherwise.</li>
            </ul>
            <p className="text-gray-800">
              An ATS-friendly resume is clean, structured, and scannable.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Balancing Human and Machine
            </h2>
            <p className="text-gray-800">
              Your resume must first pass the ATS, then win over a human. That's why Prosumely
              designs resumes with dual appeal: technically optimized, but also beautifully written
              and visually accessible.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              The Prosumely Edge in ATS Optimization
            </h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Conduct job description analysis.</li>
              <li>Apply intelligent keyword mapping.</li>
              <li>Build clean, parse-friendly layouts.</li>
              <li>Test resumes against multiple ATS simulators.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Conclusion</h2>
            <p className="text-gray-800">
              Don't let an algorithm stand between you and your dream job. A great resume isn't just
              persuasive—it's compatible. Let Prosumely help you create a document that's built to
              pass the first digital hurdle and impress every step of the way.
            </p>
          </div>
        </section>
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-blue-900 mb-4">
            Want Your Resume to Beat the Bots?
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Let Prosumely help you craft an ATS-optimized resume that gets seen by recruiters and
            hiring managers.
          </p>
          <Link href="/services" className="inline-block">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              Get Started
            </button>
          </Link>
        </section>
      </article>
    </main>
  )
}
