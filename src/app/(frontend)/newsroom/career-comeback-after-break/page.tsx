import React from 'react'
import Image from 'next/image'

export const metadata = {
  title: 'Career Comeback: Returning to Work After a Break with Confidence | Prosumely',
  description:
    'Explore the inspiring journey of a professional who re-entered the workforce after a career break, using resume strategy and personal storytelling to rebuild confidence and credibility. Learn how to position career gaps and upskilling for success.',
  keywords: [
    'career comeback',
    'return to work',
    'resume strategy',
    'career gap',
    'upskilling',
    'interview tips',
    'Prosumely',
    'success story',
  ],
  openGraph: {
    title: 'Career Comeback: Returning to Work After a Break with Confidence | Prosumely',
    description:
      'Explore the inspiring journey of a professional who re-entered the workforce after a career break, using resume strategy and personal storytelling to rebuild confidence and credibility. Learn how to position career gaps and upskilling for success.',
    url: 'https://prosumely.com/newsroom/career-comeback-after-break',
    siteName: 'Prosumely',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Career comeback and confidence',
      },
    ],
    locale: 'en_US',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Career Comeback: Returning to Work After a Break with Confidence | Prosumely',
    description:
      'Explore the inspiring journey of a professional who re-entered the workforce after a career break, using resume strategy and personal storytelling to rebuild confidence and credibility. Learn how to position career gaps and upskilling for success.',
    site: '@prosumely',
  },
  alternates: {
    canonical: 'https://prosumely.com/newsroom/career-comeback-after-break',
  },
}

export default function CareerComebackArticle() {
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
            From Career Break to Comeback: Rebuilding with Confidence
          </h1>
          <p className="text-lg text-gray-700 mb-2">
            Interviewee:{' '}
            <span className="font-semibold">Nisha Kapoor, Returning to Work after 5 Years</span>
          </p>
          <p className="text-lg text-gray-700 mb-2">
            Interviewer:{' '}
            <span className="font-semibold">Jatin Agarwal, Senior Career Advisor at Prosumely</span>
          </p>
          <Image
            src="/newsroom-images/career-comeback.jpg"
            alt="Professional career comeback"
            width={900}
            height={256}
            className="rounded-xl shadow-lg w-full h-64 object-cover mb-6"
            priority
          />
        </header>
        <section className="space-y-8">
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q1: Nisha, what was your mindset when you approached Prosumely?
            </h2>
            <p className="text-gray-800">
              To be honest, I was nervous and full of self-doubt. I had taken a 5-year career break
              to raise my twins and care for elderly parents, and while it was a fulfilling time
              personally, it left me unsure of how the corporate world would perceive my gap. I knew
              I had the experience and the drive to return, but every job application I submitted
              seemed to vanish into a black hole. I wasn't getting shortlisted, and I started
              wondering if my career was over. When I found Prosumely, I hoped they would help me
              with a better-looking resume. But what I got was far more transformational—they helped
              me rebuild my confidence.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q2: How did your initial resume reflect your break?
            </h2>
            <p className="text-gray-800">
              It didn't, really. I had removed the dates altogether, hoping it wouldn't come up, and
              simply listed my previous job experiences. But that approach made my resume feel vague
              and incomplete. It lacked continuity and raised more questions than it answered.
              Recruiters had no context, and I wasn't owning my story. It also didn't mention the
              freelance consulting projects I had taken on during my break or the certification
              courses I had completed. Essentially, it failed to represent the full picture of who I
              was and what I could offer now.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q3: How did Jatin and the team help change that?
            </h2>
            <p className="text-gray-800">
              Jatin was incredibly empathetic and sharp in his approach. He told me that the break
              was nothing to hide—in fact, it could be positioned as a strength if framed the right
              way. Together, we created a "Career Sabbatical & Upskilling" section that clearly
              explained why I took the break, how I stayed engaged professionally through consulting
              and online courses, and why I was now ready to return. We updated my work experience
              to highlight leadership and problem-solving skills and included specific examples of
              impact. The resume started to reflect someone who took a purposeful pause, grew during
              it, and is now prepared to re-enter with clarity.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q4: What new sections were added to your resume?
            </h2>
            <p className="text-gray-800">
              We added a sabbatical explanation, an updated summary, and a section on upskilling and
              certifications. The new executive summary framed my comeback story beautifully. We
              also added project-based consulting work I had done during the break, which previously
              I didn't think "counted." It absolutely did. I had supported a startup with market
              research and helped a friend's company revamp their HR processes. These were valuable
              experiences that showed I hadn't been idle. We also added a tech skills section, which
              included the HRIS and analytics tools I had trained on during my time away.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q5: How did you feel after seeing the final version?
            </h2>
            <p className="text-gray-800">
              I was emotional, honestly. The new resume made me feel seen. For the first time in
              years, I felt proud of my journey instead of apologetic. The formatting, the tone, the
              language—everything reflected a version of me that was confident, capable, and ready.
              My friends who reviewed it said, "This is exactly who you are." That validation meant
              a lot. It gave me the courage to start applying again with hope instead of hesitation.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q6: Did this version open real opportunities?
            </h2>
            <p className="text-gray-800">
              Yes, and quickly too. Within three weeks of sharing the new resume, I got shortlisted
              for three roles. One of them was a people manager role in a mid-sized company where
              they specifically appreciated the consulting work I had done during my break. The
              interviews were far more engaging than before, and I felt like the new resume had
              already done half the job by establishing credibility. I eventually landed a role that
              aligns perfectly with my experience and flexibility needs.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q7: Did you do anything differently during the interview process?
            </h2>
            <p className="text-gray-800">
              Yes, I owned my story. I stopped hiding or apologizing for my break. I followed
              Prosumely's advice on positioning it as a chapter of personal growth. I talked about
              how I stayed engaged, what I learned, and why I was now ready. The interviewers
              responded well to that honesty and confidence. I also came prepared with stories and
              examples that were highlighted in the resume, which made it easier to connect the
              dots.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-blue-800 mb-2">
              Q8: Your message to women on a break looking to return?
            </h2>
            <p className="text-gray-800">
              You are not your career gap. You are the sum of your experiences, and that includes
              what you did during your break. Own it. And more importantly, don't try to do it
              alone. The job market is competitive, and how you present your story matters.
              Prosumely helped me craft a narrative that felt both true and compelling. If you're
              planning a comeback, invest in the right support. It's not just about getting a
              job—it's about rediscovering your voice and value.
            </p>
          </div>
        </section>
        {/* Metrics Section */}
        <section className="mt-12 mb-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">3</div>
            <div className="text-lg text-gray-700">Roles Shortlisted</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">5</div>
            <div className="text-lg text-gray-700">Years Career Break</div>
          </div>
          <div className="bg-blue-50 rounded-lg p-6 shadow-md animate-fade-in">
            <div className="text-4xl font-bold text-blue-700 mb-2">100%</div>
            <div className="text-lg text-gray-700">Confidence Restored</div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mt-8 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-blue-400 rounded-xl py-8 px-6 shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-2">Ready for Your Comeback?</h3>
            <p className="text-lg text-blue-100 mb-4">
              Let Prosumely help you turn your career break into a powerful comeback story. Get a
              free resume review or book a consultation today!
            </p>
            <a
              href="https://prosumely.com/free-resume-review"
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
