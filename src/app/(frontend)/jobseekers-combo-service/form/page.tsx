import MyFormComponent from '@/components/MyFormComponent'

export default async function ATSForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Jobseeker's Combo Form</h2>
          <p className="text-blue-100 leading-relaxed">
            Fill out the form below to get your all-in-one career branding kit—ATS/Executive CV,
            cover letter, LinkedIn profile, and a personalized career roadmap. Our experts will
            guide you every step of the way.
          </p>
        </div>
      </header>
      <MyFormComponent formId="68691c7ae57cecdee0e157e8" hideFormHeader={true} />
    </div>
  )
}
