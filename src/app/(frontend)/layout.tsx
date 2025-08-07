import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { StructuredData } from '@/components/StructuredData'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        {/* Optimized Google Analytics - load after user interaction */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-Z7M3JGGZZM');
              
              // Load GA script only after user interaction for better performance
              let gaLoaded = false;
              function loadGA() {
                if (!gaLoaded) {
                  const script = document.createElement('script');
                  script.async = true;
                  script.src = 'https://www.googletagmanager.com/gtag/js?id=G-Z7M3JGGZZM';
                  document.head.appendChild(script);
                  gaLoaded = true;
                }
              }
              
              // Load GA on first user interaction
              ['mousedown', 'touchstart', 'scroll', 'keydown'].forEach(event => {
                document.addEventListener(event, loadGA, { once: true, passive: true });
              });
              
              // Fallback: load after 3 seconds
              setTimeout(loadGA, 3000);
            `,
          }}
        />
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        {/* Performance optimization: Resource hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Preload critical assets */}
        <link rel="preload" href="/website-template-OG.webp" as="image" type="image/webp" />
        <link rel="preload" href="/prosumely-logo-lg.png" as="image" type="image/png" />

        <StructuredData />
      </head>
      <body>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {/* <TopHeader /> */}
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: {
    template: '%s | Prosumely',
    default: 'Prosumely | Professional Resume Writing Services',
  },
  description:
    'Professional resume writing services and career consulting to help you land your dream job with ATS-optimized resumes, LinkedIn optimization, and expert career guidance.',
  keywords: [
    'resume writing services',
    'professional resume writers',
    'ATS resume',
    'CV writing',
    'career services',
    'LinkedIn optimization',
    'cover letter writing',
    'interview coaching',
  ],
  authors: [{ name: 'Prosumely' }],
  creator: 'Prosumely',
  publisher: 'Prosumely',
  openGraph: mergeOpenGraph({
    title: 'Prosumely | Professional Resume Writing Services',
    description:
      'Professional resume writing services and career consulting to help you land your dream job with ATS-optimized resumes.',
    url: 'https://www.prosumely.com',
    siteName: 'Prosumely',
    images: [
      {
        url: '/prosumely-ats-resume-writing-opengraph.jpg',
        width: 1200,
        height: 630,
        alt: 'Prosumely Professional Resume Writing Services',
      },
    ],
    locale: 'en_US',
    type: 'website',
  }),
  twitter: {
    card: 'summary_large_image',
    creator: '@prosumely',
    site: '@prosumely',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code', // Replace with actual verification code
    // Add other verification codes as needed
  },
}
