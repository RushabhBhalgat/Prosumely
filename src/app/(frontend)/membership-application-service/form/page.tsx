import { Metadata } from 'next'
import MyFormComponent from '@/components/MyFormComponent'


export const metadata: Metadata = {
  title: 'Membership Application Service Form | Prosumely',
  description: 'Complete your membership application service request form.',
  robots: {
    index: false,
    follow: false,
  },
}

export default async function MembershipApplicationForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Membership Application Service</h2>
          <p className="text-blue-100 leading-relaxed">
            Apply for professional memberships with confidence. Our team will help you prepare and
            submit a compelling application, highlighting your qualifications and achievements to
            maximize your chances of acceptance into top organizations and associations.
          </p>
        </div>
      </header>
      <MyFormComponent formId="68693311afb0038bafb3aa86" hideFormHeader={true} />
    </div>
  )
}
