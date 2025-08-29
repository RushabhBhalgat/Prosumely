import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'Jobseeker CV Combo Service Form | Prosumely',
  description: 'Complete your jobseeker CV combo service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function JobseekerCvComboForm() {
  return (
    <>
      <MyFormComponent formId="68b03709e5a86bbd5b49efbc" />
    </>
  )
}
