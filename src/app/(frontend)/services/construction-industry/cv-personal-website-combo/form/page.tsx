import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'
import { getServicesMode } from '@/utilities/getSettings'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: 'Construction Industry - CV and Personal Website Combo Service Form | Prosumely',
  description: 'Complete your CV and personal website combo service request form for construction industry professionals.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ConstructionCvPersonalWebsiteComboForm() {
  const servicesMode = await getServicesMode()

  // Only show this page in limited services mode
  if (servicesMode !== 'limited') {
    redirect('/services')
  }

  return (
    <>
      <MyFormComponent formId="68b03b07e5a86bbd5b49f150" />
    </>
  )
}
