import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'


export const metadata: Metadata = {
  title: 'Academic CV Writing Service Form | Prosumely',
  description: 'Complete your academic cv writing service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function AcademicCvWritingForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Academic CV Writing Service</h2>
          <p className="text-blue-100 leading-relaxed">
            Get a professionally crafted Academic CV tailored for research, teaching, or academic
            positions. Our experts highlight your publications, achievements, and
            credentials—ensuring your CV stands out to universities and research institutions
            worldwide.
          </p>
        </div>
      </header>
      <MyFormComponent formId="6869316aafb0038bafb3a972" hideFormHeader={true} />
    </div>
  )
}
