import { Metadata } from 'next'

export const formPageMetadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
  title: 'Service Form | Prosumely',
  description:
    'Complete your service request form to get started with Prosumely professional services.',
}

// This metadata should be applied to all form pages to prevent indexing
// Form pages should not appear in search results as they are not standalone content
