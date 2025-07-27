import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'Executive Resume Writing Service Form | Prosumely',
  description: 'Complete your executive resume writing service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ExecutiveForm() {
  return (
    <>
      <MyFormComponent formId="685942569b739d0c37fef8b8" />
    </>
  )
}
