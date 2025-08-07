import { Metadata } from 'next'
import KeywordFinderTool from '@/components/career-tools/KeywordFinderTool'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Free Job Description Keyword Finder - Beat ATS | Prosumely',
  description:
    'Extract key action verbs, technical skills, and soft skills from job descriptions. Optimize your resume to beat Applicant Tracking Systems (ATS) and land more interviews with our free keyword finder tool.',
  keywords: [
    'job description keywords',
    'ATS optimization',
    'resume keywords',
    'applicant tracking system',
    'resume optimization',
    'job search tools',
    'career tools',
    'free resume tools',
    'keyword extraction',
    'resume scanner',
  ],
  openGraph: {
    title: 'Free Job Description Keyword Finder - Beat ATS',
    description:
      'Extract key keywords from job descriptions to optimize your resume for ATS systems. Free tool by Prosumely.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/job-description-keyword-finder',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Job Description Keyword Finder Tool',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Job Description Keyword Finder - Beat ATS',
    description:
      'Extract key keywords from job descriptions to optimize your resume for ATS systems.',
    images: ['/prosumely-ats-resume-writing-opengraph.jpg'],
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/job-description-keyword-finder',
  },
}

export default function JobDescriptionKeywordFinderPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="max-w-4xl mx-auto px-6">
          <ol className="flex space-x-2 text-sm text-gray-600">
            <li>
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2">
              <Link href="/career-tools" className="hover:text-blue-600">
                Career Tools
              </Link>
            </li>
            <li className="before:content-['/'] before:mx-2 text-gray-900">
              Job Description Keyword Finder
            </li>
          </ol>
        </div>
      </nav>

      {/* Main Content */}
      <main className="py-8 lg:py-12">
        <KeywordFinderTool />
      </main>

      {/* SEO Content Section */}
      <section className="bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-bold mb-6">
              How to Use Job Description Keywords to Beat ATS
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-3">What is an ATS?</h3>
                <p className="text-gray-600 mb-4">
                  An Applicant Tracking System (ATS) is software used by employers to filter and
                  rank resumes before they reach human recruiters. Over 98% of Fortune 500 companies
                  use ATS to manage their hiring process.
                </p>

                <h3 className="text-xl font-semibold mb-3">Why Keywords Matter</h3>
                <p className="text-gray-600">
                  ATS systems scan resumes for specific keywords that match the job description.
                  Without the right keywords, your resume might never be seen by a human recruiter,
                  regardless of your qualifications.
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Best Practices</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>Use exact keyword matches from the job description</li>
                  <li>
                    Include both acronyms and full forms (e.g., "AI" and "Artificial Intelligence")
                  </li>
                  <li>Incorporate keywords naturally throughout your resume</li>
                  <li>Focus on relevant technical skills and certifications</li>
                  <li>Use action verbs to describe your achievements</li>
                  <li>Include soft skills mentioned in the job posting</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3 text-blue-800">
                Pro Tips for ATS Optimization
              </h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Format Correctly</h4>
                  <ul className="text-blue-600 space-y-1 list-disc list-inside">
                    <li>Use standard section headings</li>
                    <li>Avoid images and graphics</li>
                    <li>Save as .docx or .pdf</li>
                    <li>Use simple fonts</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Keyword Placement</h4>
                  <ul className="text-blue-600 space-y-1 list-disc list-inside">
                    <li>Professional summary</li>
                    <li>Skills section</li>
                    <li>Work experience</li>
                    <li>Education section</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Avoid Common Mistakes</h4>
                  <ul className="text-blue-600 space-y-1 list-disc list-inside">
                    <li>Don't stuff keywords unnaturally</li>
                    <li>Avoid typos and misspellings</li>
                    <li>Don't use headers/footers</li>
                    <li>Avoid complex formatting</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-8 text-center">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                How accurate is the keyword extraction?
              </summary>
              <p className="mt-3 text-gray-600">
                Our tool uses Google's advanced Gemini Pro AI to analyze job descriptions with high
                accuracy. The AI is trained to understand context and identify the most relevant
                keywords for each category.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                Is my data safe when using this tool?
              </summary>
              <p className="mt-3 text-gray-600">
                Yes, we prioritize your privacy. Job descriptions are processed securely and are not
                stored or shared. The text is only used temporarily to extract keywords and is
                immediately discarded.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                How should I use the extracted keywords?
              </summary>
              <p className="mt-3 text-gray-600">
                Incorporate the keywords naturally throughout your resume, especially in your
                professional summary, skills section, and work experience descriptions. Match the
                exact wording used in the job description when possible.
              </p>
            </details>

            <details className="bg-white rounded-lg p-6 shadow-sm">
              <summary className="font-semibold cursor-pointer">
                Can I use this tool for multiple job applications?
              </summary>
              <p className="mt-3 text-gray-600">
                Absolutely! We recommend analyzing each job description separately and tailoring
                your resume accordingly. Different positions may emphasize different skills and
                requirements.
              </p>
            </details>
          </div>
        </div>
      </section>
    </div>
  )
}
