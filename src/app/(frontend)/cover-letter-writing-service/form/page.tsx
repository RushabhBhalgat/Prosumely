import MyFormComponent from '@/components/MyFormComponent'

export default async function CoverLetterPage() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Cover Letter Service</h2>
          <p className="text-blue-100 leading-relaxed">
            Get a custom, professionally written cover letter tailored to your target job and
            industry. Our experts will highlight your strengths, experience, and motivation—helping
            you stand out to employers and land more interviews.
          </p>
        </div>
      </header>
      <MyFormComponent formId="6869294dafb0038bafb3a7fa" hideFormHeader={true} />
    </div>
  )
}
