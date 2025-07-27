import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description:
    'Professional resume writing services and career consulting to help you land your dream job with ATS-optimized resumes.',
  images: [
    {
      url: `${getServerSideURL()}/prosumely-ats-resume-writing-opengraph.jpg`,
    },
  ],
  siteName: 'Prosumely',
  title: 'Prosumely | Professional Resume Writing Services',
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
