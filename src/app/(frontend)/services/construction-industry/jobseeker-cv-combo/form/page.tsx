import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'
import { getServicesMode } from '@/utilities/getSettings'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Construction Industry - Jobseeker CV Combo Service Form | Prosumely',
  description: 'Complete your jobseeker CV combo service request form for construction industry professionals.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ConstructionJobseekerCvComboForm() {
  const servicesMode = await getServicesMode()

  // Only show this page in limited services mode
  if (servicesMode !== 'limited') {
    redirect('/services')
  }

  return (
    <>
      <MyFormComponent formId="68b03709e5a86bbd5b49efbc" />
    </>
  )
}
