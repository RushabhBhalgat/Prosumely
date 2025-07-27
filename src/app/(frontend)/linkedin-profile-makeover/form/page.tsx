import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'LinkedIn Profile Makeover Form | Prosumely',
  description: 'Complete your linkedin profile makeover request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function LinkedInForm() {
  return (
    <>
      <MyFormComponent formId="68594a6e9b739d0c37fefa15" />
    </>
  )
}
