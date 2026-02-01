import React from 'react'
import { Metadata } from 'next'
import CoverLetterGenerator from '@/components/career-tools/CoverLetterGenerator'

export const metadata: Metadata = {
  title: 'Free AI Cover Letter Generator - Create Professional Cover Letters | Prosumely',
  description:
    'Generate tailored, professional cover letters in seconds with our free AI-powered tool. Simply paste your resume and job description to create a compelling cover letter optimized for any role.',
  keywords: [
    'cover letter generator',
    'AI cover letter',
    'free cover letter tool',
    'professional cover letter',
    'job application letter',
    'cover letter writer',
    'automated cover letter',
    'cover letter template',
    'career tools',
  ],
  openGraph: {
    title: 'Free AI Cover Letter Generator - Create Professional Cover Letters',
    description:
      'Generate tailored, professional cover letters in seconds. Our AI analyzes your resume and the job description to create compelling cover letters.',
    type: 'website',
    url: 'https://prosumely.com/career-tools/cover-letter-generator',
    images: [
      {
        url: 'https://prosumely.com/og-cover-letter-generator.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Cover Letter Generator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI Cover Letter Generator - Professional Cover Letters',
    description: 'Generate tailored cover letters instantly with AI. Perfect for job applications.',
  },
  alternates: {
    canonical: 'https://prosumely.com/career-tools/cover-letter-generator',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function CoverLetterGeneratorPage() {
  // FAQ Schema Markup for SEO
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes a good cover letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A good cover letter is tailored to the specific job, demonstrates genuine interest in the company, highlights 2-3 relevant achievements, maintains a professional yet personable tone, and is concise (250-400 words). It should complement—not repeat—your resume by providing context and personality. The best cover letters show you have researched the company and explain why you are uniquely qualified for the role.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long should a cover letter be?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A cover letter should be between 250-400 words, or about three to four paragraphs. It should fit on a single page with proper formatting. Hiring managers typically spend 30 seconds to 2 minutes reading a cover letter, so brevity and impact are essential. Focus on quality over quantity—every sentence should add value.',
        },
      },
      {
        '@type': 'Question',
        name: 'Should I customize my cover letter for each job?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Customization is crucial. Generic cover letters are easy to spot and often lead to rejection. Tailor each cover letter by referencing the specific job title, company name, and requirements. Mention how your skills align with their needs and why you are interested in that particular company. This shows effort, genuine interest, and attention to detail.',
        },
      },
      {
        '@type': 'Question',
        name: 'What should I avoid in a cover letter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Avoid: Generic templates without customization, repeating your resume verbatim, focusing too much on what the job offers you rather than what you offer the company, typos or grammatical errors, negative comments about previous employers, salary requirements (unless requested), and overly casual language. Also avoid starting with "To Whom It May Concern"—research to find the hiring manager\'s name.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do cover letters really matter in 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! While some companies may not require cover letters, when they do, it is your opportunity to stand out. A well-crafted cover letter can be the deciding factor between similar candidates. It demonstrates communication skills, professionalism, and genuine interest. Even when optional, submitting a strong cover letter shows initiative and can give you an edge over candidates who skip it.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this cover letter generator really free?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Our AI cover letter generator is completely free to use. There are no hidden fees, subscriptions, or premium versions. We offer this tool to help job seekers succeed in their career journey.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does the AI cover letter generator work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our tool uses advanced artificial intelligence (Google's Gemini 2.0 Flash) to analyze both your resume and the job description. It identifies relevant skills, experience, and achievements, then crafts a compelling narrative that demonstrates your fit for the role. The AI follows professional writing standards and creates cover letters optimized for both ATS systems and human readers.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use the generated cover letter as-is?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Absolutely! Our AI generates professional-quality cover letters that are ready to submit. However, we always recommend reviewing the content and adding any personal touches or specific examples that make your application unique. Think of it as a strong first draft that you can enhance with your personal voice.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many cover letters can I generate?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can generate up to 3 cover letters per hour with our free tool. This limit ensures quality service for all users. If you need unlimited generations or professional refinement, check out our professional cover letter writing service.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is my data safe and private?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Yes, we take your privacy seriously. We don't store your resume or job descriptions on our servers. The data is processed securely to generate your cover letter and then discarded. We never share your information with third parties.",
        },
      },
    ],
  }

  return (
    <>
      {/* FAQ Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* JSON-LD Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Prosumely Cover Letter Generator',
            description:
              'Free AI-powered cover letter generator that creates professional, tailored cover letters based on your resume and job description.',
            url: 'https://prosumely.com/career-tools/cover-letter-generator',
            applicationCategory: 'BusinessApplication',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'USD',
            },
            featureList: [
              'AI-powered cover letter generation',
              'Tailored to specific job descriptions',
              'Professional writing quality',
              'Free to use',
              'Instant results',
            ],
            provider: {
              '@type': 'Organization',
              name: 'Prosumely',
              url: 'https://prosumely.com',
            },
          }),
        }}
      />
      <CoverLetterGenerator />
    </>
  )
}
