import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'CV and Personal Website Combo Service Form | Prosumely',
  description: 'Complete your CV and personal website combo service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function CvPersonalWebsiteComboForm() {
  return (
    <>
      <MyFormComponent formId="68b03b07e5a86bbd5b49f150" />
    </>
  )
}
