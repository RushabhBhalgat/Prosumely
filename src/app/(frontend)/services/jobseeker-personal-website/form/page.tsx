import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'Jobseeker Personal Website Service Form | Prosumely',
  description: 'Complete your jobseeker personal website service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function JobseekerPersonalWebsiteForm() {
  return (
    <>
      <MyFormComponent formId="68b03a04e5a86bbd5b49f115" />
    </>
  )
}
