import MyFormComponent from '@/components/MyFormComponent'

export default async function CareerRoadmapForm() {
  return (
    <div className="max-w-2xl mx-auto mt-8">
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 p-8 text-white rounded-t-3xl">
        <div className="relative z-10">
          <h2 className="text-3xl font-bold mb-4">Career Roadmap Service</h2>
          <p className="text-blue-100 leading-relaxed">
            Get a personalized career roadmap designed by industry experts. We analyze your
            background, goals, and aspirations to create a step-by-step plan for your professional
            growth—helping you achieve your dream job faster and with confidence.
          </p>
        </div>
      </header>
      <MyFormComponent formId="686925fdafb0038bafb3a700" hideFormHeader={true} />
    </div>
  )
}
