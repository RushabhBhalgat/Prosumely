import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'


export const metadata: Metadata = {
  title: 'Interview Coaching Service Form | Prosumely',
  description: 'Complete your interview coaching service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function InterviewCoachingForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Interview Coaching Service</h2>
          <p className="text-blue-100 leading-relaxed">
            Get personalized interview coaching from industry experts. We help you master common and
            role-specific questions, boost your confidence, and develop winning strategies—so you
            can ace your next interview and land your dream job.
          </p>
        </div>
      </header>
      <MyFormComponent formId="68692fd3afb0038bafb3a8b8" hideFormHeader={true} />
    </div>
  )
}
