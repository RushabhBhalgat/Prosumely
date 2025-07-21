import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'From Rejection to Results: How a Great Resume Changes Everything | Prosumely',
  description:
    'See how a professionally crafted resume can turn job search rejection into interview success, with real stories and proven strategies from Prosumely experts. Actionable tips for resume transformation and career growth.',
  keywords: [
    'resume transformation',
    'job search',
    'resume tips',
    'career growth',
    'interview success',
    'Prosumely',
    'success story',
  ],
  openGraph: {
    title: 'From Rejection to Results: How a Great Resume Changes Everything | Prosumely',
    description:
      'See how a professionally crafted resume can turn job search rejection into interview success, with real stories and proven strategies from Prosumely experts. Actionable tips for resume transformation and career growth.',
    url: 'https://prosumely.com/newsroom/resume-rejection-to-success',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1465101178521-cce3a325a5c3?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Resume success and interview',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Rejection to Results: How a Great Resume Changes Everything | Prosumely',
    description:
      'See how a professionally crafted resume can turn job search rejection into interview success, with real stories and proven strategies from Prosumely experts. Actionable tips for resume transformation and career growth.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/newsroom/resume-rejection-to-success',
  },
}

export default function ResumeRejectionToSuccessArticle() {
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
            From Rejection to Results: How a Great Resume Transforms Job Search Outcomes
          </h1>
          <Image
            src="/newsroom-images/resume-success.jpg"
            alt="Resume success and interview"
            width={900}
            height={256}
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
            priority
          />
        </header>
        {/* Metrics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">3x</div>
            <div className="text-sm text-gray-600">More interviews after resume rewrite</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">95%</div>
            <div className="text-sm text-gray-600">Clients report higher confidence</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">2 Weeks</div>
            <div className="text-sm text-gray-600">Average time to first interview</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">50%</div>
            <div className="text-sm text-gray-600">Salary increase after resume update</div>
          </div>
        </section>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Introduction</h2>
            <p className="text-gray-800">
              Job search rejection hurts. It's disheartening to send out application after
              application and hear nothing back. But rejection doesn't always reflect your
              ability—it often reflects your presentation. A powerful resume has the ability to
              shift that dynamic entirely.
            </p>
            <p className="text-gray-800">
              In this article, we uncover how transforming your resume can change your entire job
              search experience—from getting ghosted to getting offers.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              The Resume's Role in First Impressions
            </h2>
            <p className="text-gray-800">
              You never get a second chance to make a first impression. For recruiters and hiring
              managers, your resume is that first impression. A great resume captures attention,
              tells a compelling story, and creates curiosity.
            </p>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Weak resumes lack clarity and focus.</li>
              <li>Bury the best achievements.</li>
              <li>Fail to connect with the job description.</li>
              <li>Strong resumes highlight accomplishments.</li>
              <li>Reflect career progression.</li>
              <li>Align with the employer's needs.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Before and After: A Resume Transformation
            </h2>
            <p className="text-gray-800">
              Example: John, a project manager, had a generic resume with bullet points like
              "Managed team projects." After working with Prosumely, his resume read: "Led
              cross-functional teams of 12 to deliver $4.5M infrastructure upgrade ahead of
              deadline, improving system efficiency by 23%." Same experience. Different impact.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">The Confidence Shift</h2>
            <p className="text-gray-800">
              When your resume reflects your value, it builds internal belief. Many clients report
              feeling more confident in interviews and negotiations after seeing their new resume.
              That confidence translates to stronger performance and better results.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Success Stories from the Field
            </h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>
                A client stuck in a 6-month job hunt got three interviews within a week after their
                resume overhaul.
              </li>
              <li>
                A returning mom re-entered the workforce with a resume that emphasized transferable
                skills, landing a flexible role in two weeks.
              </li>
              <li>
                A tech professional got promoted internally after sharing their new
                Prosumely-crafted resume with leadership.
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Why Resumes Still Matter in a Digital World
            </h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Required for most applications.</li>
              <li>Shared internally by hiring teams.</li>
              <li>Used in salary benchmarking.</li>
              <li>Requested for visa and compliance checks.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">The Prosumely Difference</h2>
            <ul className="list-disc ml-6 text-gray-800">
              <li>Discovery sessions to uncover achievements.</li>
              <li>Strategic storytelling.</li>
              <li>ATS-friendly formatting.</li>
              <li>Industry-specific customization.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">Conclusion</h2>
            <p className="text-gray-800">
              Rejection isn't a sign you're not good enough. Often, it means your value wasn't
              communicated clearly. A great resume bridges that gap. At Prosumely, we turn silence
              into success—one resume at a time.
            </p>
          </div>
        </section>
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-8 px-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to Turn Rejection into Success?
            </h2>
            <p className="text-lg text-blue-100 mb-6">
              Let Prosumely help you craft a resume that gets results and opens new career
              opportunities.
            </p>
            <a href="https://prosumely.com/free-resume-review" className="inline-block">
              <button className="bg-white text-blue-700 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                Get Free Resume Review
              </button>
            </a>
          </div>
        </section>
      </article>
    </main>
  )
}
