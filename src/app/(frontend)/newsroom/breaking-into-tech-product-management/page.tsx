import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Breaking into Tech: A Non-Tech Professional’s Journey to Product Management | Prosumely',
  description:
    'Discover how a retail operations expert pivoted to tech product management with a resume makeover focused on transferable skills, storytelling, and career transition strategy. Learn actionable tips for career pivots and resume writing.',
  keywords: [
    'career pivot',
    'product management',
    'tech transition',
    'resume writing',
    'transferable skills',
    'interview tips',
    'Prosumely',
    'success story',
  ],
  openGraph: {
    title:
      'Breaking into Tech: A Non-Tech Professional’s Journey to Product Management | Prosumely',
    description:
      'Discover how a retail operations expert pivoted to tech product management with a resume makeover focused on transferable skills, storytelling, and career transition strategy. Learn actionable tips for career pivots and resume writing.',
    url: 'https://prosumely.com/newsroom/breaking-into-tech-product-management',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Tech interview and resume',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Breaking into Tech: A Non-Tech Professional’s Journey to Product Management | Prosumely',
    description:
      'Discover how a retail operations expert pivoted to tech product management with a resume makeover focused on transferable skills, storytelling, and career transition strategy. Learn actionable tips for career pivots and resume writing.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/newsroom/breaking-into-tech-product-management',
  },
}

export default function BreakingIntoTechArticle() {
  return (
    <main className="bg-white min-h-screen pb-16">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-4">
          <a
            href="/newsroom"
            className="inline-block text-blue-600 hover:underline text-sm px-2 py-1 rounded transition"
          >
            ← Back to Newsroom
          </a>
        </div>
        <header className="mb-10">
          <h1 className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">
            Breaking into Tech: A Non-Technical Job Seeker's Resume Makeover
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Interviewee:{' '}
            <span className="font-semibold">Rohit Khurana, Aspiring Product Manager</span>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Interviewer:{' '}
            <span className="font-semibold">Pranav Desai, Resume Coach at Prosumely</span>
          </p>
          <Image
            src="/newsroom-images/tech-product-management.jpg"
            alt="Tech interview and resume"
            width={900}
            height={256}
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
            priority
          />
        </header>
        {/* Metrics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">22%</div>
            <div className="text-sm text-gray-600">Operational overhead reduced</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">2</div>
            <div className="text-sm text-gray-600">Interviews after resume update</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">8</div>
            <div className="text-sm text-gray-600">Years in previous industry</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">100%</div>
            <div className="text-sm text-gray-600">Career pivot success</div>
          </div>
        </section>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q1: Rohit, what inspired your shift to the tech industry?
            </h2>
            <p className="text-gray-800">
              My background has always been rooted in retail operations, where I managed large-scale
              store formats, optimized processes, and led teams across different geographies.
              However, over the years, I found myself gravitating toward tech-driven solutions for
              operational challenges. I started experimenting with process automation, CRM
              integrations, and data analytics to drive better customer experiences. That's when I
              realized I wanted to be on the product side—designing the very solutions that I was
              using to solve problems. The tech industry felt dynamic, future-ready, and aligned
              with my problem-solving mindset. But the biggest hurdle was repositioning myself
              convincingly to hiring managers who were looking for prior product experience. That's
              when I turned to Prosumely.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q2: What were your fears before starting this resume journey?
            </h2>
            <p className="text-gray-800">
              My biggest fear was that I wouldn't be taken seriously for tech roles without a
              computer science degree or prior product title. I worried that my resume would
              immediately disqualify me because of my traditional background. There was also a sense
              of imposter syndrome—wondering if I could even tell a compelling story to recruiters
              without sounding like I was stretching the truth. I feared that no matter how much I
              upskilled, it wouldn't show unless it was presented the right way. The thought of
              starting from scratch and trying to break into a new field after 8 years in a
              different industry felt daunting.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q3: How did the Prosumely team tackle that challenge?
            </h2>
            <p className="text-gray-800">
              Pranav and the Prosumely team took a highly strategic approach. They didn't try to
              hide my past—instead, they helped me embrace it and extract the transferable skills
              that were aligned with product roles. We highlighted my ability to understand user
              needs, lead cross-functional teams, and implement tech-driven solutions. They also
              helped me structure a clear "Career Transition Summary" at the top of my resume, which
              told hiring managers why I was pivoting and how I was preparing for the role. The
              resume was tailored with the language and keywords from product management job
              descriptions, making it ATS-friendly while keeping it authentic.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q4: What was the most impactful change made to your resume?
            </h2>
            <p className="text-gray-800">
              The most impactful change was shifting from responsibilities to outcomes and
              narratives. Rather than listing what I did in my retail role, we focused on how I
              drove innovation, introduced digital workflows, and made data-backed decisions. For
              example, we reframed a retail scheduling challenge into a product-style problem that I
              solved using technology. That approach not only made the resume more relatable to
              product hiring managers, but it also made me realize I had already been functioning
              with a product mindset. The added section on certifications, like my Scrum and Product
              School coursework, was also positioned prominently to showcase my commitment.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q5: Did storytelling play a role in your resume?
            </h2>
            <p className="text-gray-800">
              Absolutely. Storytelling was central to the transformation. Each role was positioned
              like a case study—a challenge I faced, the action I took, and the result it generated.
              This helped make my journey memorable and persuasive. Instead of saying "handled 50+
              stores," the revised version said "led a process optimization initiative across 50
              stores, reducing operational overhead by 22% using tech-enabled scheduling." That
              shift in narrative made a huge difference. It made my resume feel like a dynamic
              roadmap rather than a static list of past tasks.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q6: Did you get any industry feedback after using the new resume?
            </h2>
            <p className="text-gray-800">
              Yes! Within two weeks of uploading the new resume to job portals and LinkedIn, I
              started getting responses from startups and tech-enabled platforms. One recruiter from
              a SaaS company even told me, "Your resume stands out because it's not just about what
              you did—it shows how you think." That feedback validated the effort and approach we
              had taken. I was also invited to two interviews for Associate Product Manager roles—a
              big step considering I had no prior experience in the title. It proved that a strong
              narrative can open doors, even in competitive industries.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q7: Were you also guided on interviews and cover letters?
            </h2>
            <p className="text-gray-800">
              Yes. Prosumely also offered guidance on my cover letter and basic interview prep. The
              cover letter followed the same narrative arc—why I was transitioning, what skills I
              brought, and how I had prepared. It helped personalize my applications and made me
              more confident going into interviews. The interview coaching also emphasized how to
              handle the "career pivot" question gracefully. I learned how to highlight my
              adaptability and continuous learning mindset, which became central to my pitch.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q8: Final thoughts for others looking to pivot careers?
            </h2>
            <p className="text-gray-800">
              If you're looking to make a career switch, don't be discouraged by what you think you
              lack. Focus instead on what you already bring to the table. And most importantly, find
              experts who can help you tell that story powerfully. Prosumely didn't just write a
              resume for me—they helped me reimagine my professional identity. That shift in mindset
              made all the difference. Breaking into tech isn't just about coding skills—it's about
              strategic thinking, user empathy, and the ability to adapt. The right resume can show
              all that if it's built with intention.
            </p>
          </div>
        </section>
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-8 px-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Pivot Your Career?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Let Prosumely help you showcase your transferable skills and land your dream role in
              tech or any industry.
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
