import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'

export const metadata: Metadata = {
  title: 'Project Portfolio Service Form | Prosumely',
  description: 'Complete your project portfolio service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function PortfolioForm() {
  return (
    <>
      <MyFormComponent formId="6859588d159e4cb70ad09ea8" />
    </>
  )
}
