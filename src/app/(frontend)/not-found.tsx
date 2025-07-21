import Link from 'next/link'
import React from 'react'
import { Metadata } from 'next'

import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Page Not Found | Prosumely',
  description:
    'The page you are looking for could not be found. Explore our professional resume writing services and career resources.',
  robots: 'noindex, nofollow',
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-lg mx-auto text-center">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Sorry, the page you are looking for could not be found. It might have been moved, deleted,
          or you entered the wrong URL.
        </p>

        <div className="space-y-4">
          <Button asChild variant="default" className="bg-blue-600 hover:bg-blue-700">
            <Link href="/">Go to Homepage</Link>
          </Button>

          <div className="text-sm text-gray-500">Or try one of these popular pages:</div>

          <div className="flex flex-wrap gap-2 justify-center">
            <Link href="/services" className="text-blue-600 hover:text-blue-800 underline">
              Our Services
            </Link>
            <span className="text-gray-400">•</span>
            <Link
              href="/free-resume-review"
              className="text-blue-600 hover:text-blue-800 underline"
            >
              Free Resume Review
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/impact-stories" className="text-blue-600 hover:text-blue-800 underline">
              Success Stories
            </Link>
            <span className="text-gray-400">•</span>
            <Link href="/contact" className="text-blue-600 hover:text-blue-800 underline">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
