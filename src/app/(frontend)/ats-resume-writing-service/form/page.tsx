import MyFormComponent from '@/components/MyFormComponent'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ATS Resume Writing Service Form | Prosumely',
  description: 'Complete your ATS resume writing service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ATSForm() {
  return (
    <>
      <MyFormComponent formId="6858f3c31e712f293ffca45f" />
    </>
  )
}
