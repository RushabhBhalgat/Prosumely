import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'Visual Resume Writing Service Form | Prosumely',
  description: 'Complete your visual resume writing service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function VisualForm() {
  return (
    <>
      <MyFormComponent formId="685941419b739d0c37fef827" />
    </>
  )
}
