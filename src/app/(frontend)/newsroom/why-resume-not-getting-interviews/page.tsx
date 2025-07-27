import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: "Why Your Resume Isn't Getting You Interviews – And What to Do About It | Prosumely",
  description:
    'Uncover the common reasons resumes fail to get noticed and learn actionable strategies to optimize your resume for today’s competitive job market. Expert tips for ATS, keywords, and modern formatting.',
  keywords: [
    'resume tips',
    'ATS optimization',
    'resume keywords',
    'job search',
    'resume formatting',
    'career advice',
    'Prosumely',
    'success story',
  ],
  openGraph: {
    title: "Why Your Resume Isn't Getting You Interviews – And What to Do About It | Prosumely",
    description:
      'Uncover the common reasons resumes fail to get noticed and learn actionable strategies to optimize your resume for today’s competitive job market. Expert tips for ATS, keywords, and modern formatting.',
    url: 'https://www.prosumely.com/newsroom/why-resume-not-getting-interviews',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Professional resume review',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Why Your Resume Isn't Getting You Interviews – And What to Do About It | Prosumely",
    description:
      'Uncover the common reasons resumes fail to get noticed and learn actionable strategies to optimize your resume for today’s competitive job market. Expert tips for ATS, keywords, and modern formatting.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://www.prosumely.com/newsroom/why-resume-not-getting-interviews',
  },
}

export default function WhyResumeNotGettingInterviewsArticle() {
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
            Why Your Resume Isn't Getting You Interviews – And What to Do About It
          </h1>
          <Image
            src="/newsroom-images/resume-review.jpg"
            alt="Professional resume review"
            width={900}
            height={256}
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
            priority
          />
        </header>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Introduction</h2>
            <p className="text-gray-800">
              You know you're qualified. You've got the experience, the skills, and the ambition.
              Yet your job applications are disappearing into a black hole. No callbacks. No
              interview invites. Just silence. Sound familiar? You're not alone. Thousands of
              professionals experience this frustrating pattern every day, and the problem almost
              always traces back to one core issue: an ineffective resume.
            </p>
            <p className="text-gray-800">
              In today's fiercely competitive job market, your resume isn't just a summary of your
              career. It's your personal marketing document, your first impression, and your gateway
              to opportunity. Unfortunately, many resumes fail to live up to this responsibility. In
              this article, we'll explore why most resumes miss the mark and how you can fix yours
              to start landing interviews with confidence.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              The Resume Black Hole: What Recruiters Really See
            </h2>
            <p className="text-gray-800">
              Every job post today attracts an average of 250 resumes. Of those, only about 4-6
              candidates get called for interviews. Your resume has only a few seconds to make an
              impression before it's either shortlisted or discarded. Recruiters don't read resumes
              in-depth initially; they scan. According to eye-tracking studies, hiring managers
              spend about 6-8 seconds scanning a resume before making a decision.
            </p>
            <p className="text-gray-800">
              The odds are not in your favor, especially when you're up against other candidates who
              might be using professionally written, highly optimized resumes. If your document
              lacks structure, clarity, or strategic keywords, it will be filtered out—either by the
              human eye or by an ATS.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">The Keyword Disconnect</h2>
            <p className="text-gray-800">
              Many resumes are rejected simply because they fail to use the right keywords.
              Applicant Tracking Systems (ATS) scan resumes for specific terms and phrases that
              match the job description. If your resume doesn't include these keywords, it's as good
              as invisible.
            </p>
            <p className="text-gray-800">
              Here's the twist: most job seekers either overload their resumes with random keywords
              or avoid them altogether. Both are mistakes. The trick is to analyze each job posting
              carefully and tailor your resume with naturally integrated, role-specific terms. It's
              not about stuffing; it's about smart alignment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Outdated Formats That Scream "2005"
            </h2>
            <p className="text-gray-800">
              Design matters. If your resume looks like it was made in Microsoft Word 2003, it won't
              stand a chance against polished, modern resumes. Clean layouts, professional fonts,
              consistent spacing, and strategic use of white space make your resume easier to read
              and more visually appealing.
            </p>
            <p className="text-gray-800">
              Avoid flashy templates with images or graphs that ATS systems can't read. A balance of
              visual professionalism and functional structure is key. A modern resume format guides
              the reader's eye to key accomplishments and creates an impression of credibility and
              attention to detail.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Too Much Information = No Information
            </h2>
            <p className="text-gray-800">
              It's tempting to include every job you've ever had and every responsibility you've
              managed. But in reality, a cluttered resume does more harm than good. Recruiters are
              not interested in reading a biography. They want highlights.
            </p>
            <p className="text-gray-800">
              Focus on relevance. If an experience doesn't support your application for a specific
              role, consider trimming it or removing it altogether. Prioritize impact. Quantify
              results. Think in terms of "what was achieved" instead of just "what was done."
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              What Hiring Managers Are Really Looking For
            </h2>
            <p className="text-gray-800">
              Resumes that win interviews do one thing exceptionally well: they tell a clear,
              compelling story. Hiring managers are looking for evidence of performance, growth, and
              alignment with the company's mission.
            </p>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Clearly articulate your career path and progression.</li>
              <li>
                Showcase measurable achievements (increased revenue, improved efficiency, etc.).
              </li>
              <li>Use strong action verbs that convey leadership and initiative.</li>
              <li>Align your skills and experience with the company's needs.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">The Prosumely Solution</h2>
            <p className="text-gray-800">
              At Prosumely, we understand that every job seeker is unique, and so should be their
              resume. We don't just rewrite resumes; we engineer them. Our expert resume writers
              combine industry insight, keyword research, storytelling, and formatting expertise to
              create resumes that work.
            </p>
            <ul className="list-disc ml-6 text-gray-800">
              <li>One-on-one consultation to understand your goals.</li>
              <li>Strategic alignment with your target roles.</li>
              <li>Keyword optimization for ATS compatibility.</li>
              <li>Storytelling that emphasizes impact over job duties.</li>
              <li>Polished formatting for a modern, professional look.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Conclusion</h2>
            <p className="text-gray-800">
              If your resume isn't getting you interviews, it's not just a document problem—it's a
              missed opportunity. The good news? It's completely fixable. With a professional
              approach and strategic insights, your resume can become your most powerful career
              tool. At Prosumely, we help you unlock that power.
            </p>
            <p className="text-gray-800">
              Stop waiting for callbacks that never come. Let us help you craft a resume that
              commands attention and opens doors.
            </p>
          </div>
        </section>
        {/* Metrics Section */}
        <section className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">250+</div>
            <div className="text-lg text-gray-700">Resumes per job post</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">6-8s</div>
            <div className="text-lg text-gray-700">Average scan time by recruiters</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">4-6</div>
            <div className="text-lg text-gray-700">Interview calls per posting</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-8 px-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-2">Want Your Resume to Stand Out?</h3>
            <p className="text-lg text-blue-100 mb-4">
              Get a free resume review from Prosumely experts and start landing interviews. Take the
              first step toward your dream job today!
            </p>
            <a
              href="https://www.prosumely.com/free-resume-review"
              className="inline-block bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-50 transition"
            >
              Get Free Resume Review
            </a>
          </div>
        </section>
      </article>
    </main>
  )
}
