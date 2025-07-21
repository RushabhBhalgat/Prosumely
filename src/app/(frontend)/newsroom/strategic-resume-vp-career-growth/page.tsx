import React from 'react'
import Head from 'next/head'

export const metadata = {
  title: 'From Manager to VP: Strategic Resume Transformation for Career Growth | Prosumely',
  description:
    'Learn how a mid-level manager leveraged a strategic resume rewrite to land VP interviews and transform her career trajectory. Discover the power of metrics, storytelling, and professional branding in resume writing.',
  keywords: [
    'resume transformation',
    'VP career growth',
    'resume writing',
    'career advancement',
    'metrics in resume',
    'professional branding',
    'interview tips',
    'success story',
    'Prosumely',
  ],
  openGraph: {
    title: 'From Manager to VP: Strategic Resume Transformation for Career Growth | Prosumely',
    description:
      'Learn how a mid-level manager leveraged a strategic resume rewrite to land VP interviews and transform her career trajectory. Discover the power of metrics, storytelling, and professional branding in resume writing.',
    url: 'https://prosumely.com/newsroom/strategic-resume-vp-career-growth',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1515165562835-cf7743fb1c1c?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Resume transformation success',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From Manager to VP: Strategic Resume Transformation for Career Growth | Prosumely',
    description:
      'Learn how a mid-level manager leveraged a strategic resume rewrite to land VP interviews and transform her career trajectory. Discover the power of metrics, storytelling, and professional branding in resume writing.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/newsroom/strategic-resume-vp-career-growth',
  },
}

export default function StrategicResumeVPArticle() {
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
            From Manager to VP: How a Strategic Resume Made All the Difference
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Interviewee:{' '}
            <span className="font-semibold">Aarti Mehta, Senior Marketing Manager</span>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Interviewer:{' '}
            <span className="font-semibold">
              Tanvi Sharma, Senior Resume Strategist at Prosumely
            </span>
          </p>
          <img
            src="/newsroom-images/vp-career-growth.jpg"
            alt="Resume transformation"
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
          />
        </header>
        {/* Metrics Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">120%</div>
            <div className="text-sm text-gray-600">Increase in lead generation</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">60%</div>
            <div className="text-sm text-gray-600">Profile views growth</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">4</div>
            <div className="text-sm text-gray-600">Top-tier interview calls</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600 animate-pulse">10 Days</div>
            <div className="text-sm text-gray-600">Resume transformation time</div>
          </div>
        </section>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q1: Aarti, what made you realize it was time to revamp your resume?
            </h2>
            <p className="text-gray-800">
              After spending nearly a decade in the same organization, I realized that I had
              outgrown my role and was ready to aim for a Vice President position. Despite being a
              consistent top performer and receiving accolades for major campaign successes, I
              wasn't being shortlisted for higher-level roles. My resume was clearly failing me. It
              looked like a laundry list of responsibilities and didn't reflect my evolution as a
              strategic leader. The final straw came when a recruiter told me, "Your profile looks
              promising, but your resume doesn't do justice to your caliber." That's when I knew it
              was time to invest in professional help.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q2: What were your biggest struggles with your old resume?
            </h2>
            <p className="text-gray-800">
              My resume was outdated and largely task-oriented. It read like a job description
              rather than a strategic narrative of my achievements. It didn't articulate the
              outcomes I had delivered or the value I had created for my organization. I also lacked
              a strong executive summary and had no real formatting structure. Every time I looked
              at it, I felt it didn't represent who I had become professionally. It didn't show my
              journey from an execution-focused manager to a visionary team leader driving
              multimillion-dollar campaigns.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q3: How did Prosumely approach your resume transformation?
            </h2>
            <p className="text-gray-800">
              Tanvi and her team at Prosumely started with an in-depth strategy call where they
              tried to understand not just what I had done, but why and how I had done it. They
              looked for patterns in my success stories, identified leadership traits, and
              highlighted measurable outcomes. Instead of rewriting what was already there, they
              helped me reframe my experiences. For instance, rather than saying I "managed social
              media campaigns," we showcased how I "led a team that increased lead generation by
              120% through data-driven social strategies." The language, tone, and structure were
              elevated to mirror C-suite readiness.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q4: What was one surprising insight during the process?
            </h2>
            <p className="text-gray-800">
              The biggest "aha" moment for me was understanding how underutilized metrics were in my
              original resume. I had always considered KPIs as internal success markers, but Tanvi
              helped me see how they are key to external validation too. By quantifying
              outcomes—like revenue influenced, cost saved, audience growth, or engagement uplift—my
              resume instantly became more persuasive. It also made me realize the extent of my
              impact, which in turn boosted my own confidence. I also appreciated how storytelling
              was used to humanize achievements—not just what I did, but the challenge I solved and
              how I led others through it.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q5: How long did the process take, and what was the collaboration like?
            </h2>
            <p className="text-gray-800">
              The entire process took around 10 working days, and it was incredibly collaborative.
              It didn't feel like I handed off a task and waited passively. Prosumely made me part
              of the process. From discovery calls to reviewing drafts and providing feedback, I was
              involved every step of the way. Their team respected my time and provided thoughtful
              prompts that made reflection easy. They were also very open to iteration and tweaks,
              ensuring that the final version was something I felt truly represented my voice and
              aspirations.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q6: Did you notice any changes once you started using the new resume?
            </h2>
            <p className="text-gray-800">
              Absolutely! Within three weeks of updating my resume and LinkedIn profile, I started
              receiving more recruiter calls. I was invited to interviews with four top-tier
              companies—one of which was a Fortune 500 brand I had dreamt of working with. More than
              the number of calls, the quality of conversations improved. Recruiters engaged me as a
              strategic leader, not just another candidate. It felt like my resume finally opened
              doors that had been closed despite my capabilities.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q7: What role did your revamped LinkedIn profile play?
            </h2>
            <p className="text-gray-800">
              Prosumely didn't just stop at the resume—they optimized my LinkedIn profile to mirror
              the same professional narrative. My headline was rewritten to include power keywords,
              and my summary told a compelling story about who I am and what I bring to the table.
              They even guided me on what kind of content to engage with to increase visibility. As
              a result, my profile views increased by over 60% and I received inbound interest from
              hiring managers and industry peers alike.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q8: What advice would you give professionals looking to elevate their careers?
            </h2>
            <p className="text-gray-800">
              Don't underestimate the power of a professionally written resume. We often think our
              work will speak for itself, but in today's competitive job market, presentation
              matters just as much. A resume isn't just a document—it's a strategic tool that can
              shape your career trajectory. I wish I had made this investment earlier. If you're
              serious about moving to the next level, don't DIY. Work with experts like Prosumely
              who understand how to position you for the roles you deserve.
            </p>
          </div>
        </section>
        {/* CTA Section */}
        <section className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-8 px-6 shadow-lg">
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Transform Your Resume?</h2>
            <p className="text-lg text-blue-100 mb-6">
              Let Prosumely help you unlock your career potential with a strategic, professionally
              written resume.
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
