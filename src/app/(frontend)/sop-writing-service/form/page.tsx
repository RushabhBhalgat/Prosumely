import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'


export const metadata: Metadata = {
  title: 'SOP Writing Service Form | Prosumely',
  description: 'Complete your sop writing service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function ATSForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">SOP Writing</h2>
          <p className="text-blue-100 leading-relaxed">
            Get a compelling, personalized Statement of Purpose (SOP) for your university or visa
            application. Our expert writers will highlight your academic strengths, career
            aspirations, and personal motivations—ensuring your SOP stands out to admission
            committees worldwide.
          </p>
        </div>
      </header>
      <MyFormComponent formId="68692354afb0038bafb3a590" hideFormHeader={true} />
    </div>
  )
}
