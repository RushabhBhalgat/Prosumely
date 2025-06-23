'use client'
import { useState, useEffect, useRef } from 'react'

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [countdown, setCountdown] = useState(0)

  // Get the form from payload
  useEffect(() => {
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
      })
      .catch((err) => {
        console.error('Error loading form:', err)
        setError('Error loading form. Please try again later.')
      })
  }, [formId])

  // Countdown effect for redirect
  useEffect(() => {
    if (isSubmitted) {
      setCountdown(25) // 2.5 seconds in deciseconds
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 100)
      return () => clearInterval(timer)
    }
  }, [isSubmitted])

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    // get the file from the form data, if it exists
    const file = formData.get('file')
    if (file) {
      // upload the file to payload
      const formDataToSend = new FormData()
      formDataToSend.append('file', file as File)
      formDataToSend.append(
        '_payload',
        JSON.stringify({
          alt: (file as File).name,
        }),
      )
      const response = await fetch('/api/media', {
        method: 'POST',
        body: formDataToSend,
      })
      if (!response.ok) {
        throw new Error('Failed to upload file')
      }
      const data = await response.json()
      fileUploadedId = data?.doc?.id
      // add the file id to the form data
    }

    // delete the file from the form data, so it's not sent to payload,
    // because it's already uploaded
    if (file) {
      formData.delete('file')
    }
    // Convert the form data to a JSON object
    const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
      field: name,
      value: value.toString(),
    }))

    try {
      // Send data to payload API
      const response = await fetch(`/api/form-submissions`, {
        method: 'POST',
        body: JSON.stringify({
          form: formId,
          submissionData: dataToSend,
          ...(cmsForm?.hasAttachment && fileUploadedId ? { file: fileUploadedId } : {}),
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        // Set submitted state to true to show success message
        setIsSubmitted(true)

        // Reset the form
        formRef.current?.reset()
        fileUploadedId = null

        // Redirect after 2.5 seconds
        setTimeout(() => {
          if (cmsForm?.redirect?.url) {
            window.location.href = cmsForm.redirect.url
          }
        }, 2500)
      } else {
        const errorData = await response.json()
        console.error('Submission failed:', errorData)
        setError('Form submission failed. Please try again.')
      }
    } catch (err) {
      console.error('Error submitting form:', err)
      setError('An error occurred. Please try again later.')
    }
  }

  if (!cmsForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#9adbf4] border-t-[#2563eb]"></div>
            <div className="text-gray-600 font-medium">Loading form...</div>
          </div>
        </div>
      </div>
    )
  }

  // Show success message if submitted
  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="animate-bounce mb-6">
            <div className="mx-auto h-16 w-16 bg-gradient-to-r from-[#2563eb] to-[#9adbf4] rounded-full flex items-center justify-center">
              <svg
                className="h-8 w-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 animate-fade-in">
            Form Submitted Successfully!
          </h2>
          <div className="space-y-4">
            <p className="text-gray-600 animate-fade-in-delay">Taking you to the payment page...</p>
            <div className="flex items-center justify-center space-x-2">
              <div className="h-2 w-2 bg-[#2563eb] rounded-full animate-pulse"></div>
              <div className="h-2 w-2 bg-[#9adbf4] rounded-full animate-pulse delay-150"></div>
              <div className="h-2 w-2 bg-[#2563eb] rounded-full animate-pulse delay-300"></div>
            </div>
            <div className="mt-4 text-sm text-gray-500">
              Redirecting in {Math.ceil(countdown / 10)} seconds...
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2563eb] to-[#9adbf4] p-6 text-white">
            <h1 className="text-2xl font-bold mb-4">CV Development Form</h1>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <span className="font-semibold">1.</span>
                <p>
                  <strong>
                    Please submit your details so that we can understand your aspirations and
                    requirements better to develop and design an excellent quality CV
                  </strong>
                </p>
              </div>
              <div className="flex items-start space-x-2">
                <span className="font-semibold">2.</span>
                <p>
                  <strong>
                    We will contact you on the following details while we design and develop your
                    CV, hence kindly fill the details accurately
                  </strong>
                </p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-6 md:p-8">
            {error && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-shake">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                  <p className="text-red-700 font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} ref={formRef} className="space-y-6">
              {cmsForm.fields?.map((field: any, index: number) => (
                <div key={field.id} className="group">
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#2563eb]"
                  >
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  <input
                    type={field.blockType}
                    name={field.name}
                    id={field.id}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm transition-all duration-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#9adbf4] focus:ring-opacity-50 focus:outline-none hover:border-gray-400 bg-gray-50 focus:bg-white"
                    required={field.required}
                    placeholder={`Enter your ${field.label.toLowerCase()}`}
                  />
                </div>
              ))}

              {cmsForm.hasAttachment && (
                <div className="group">
                  <label
                    htmlFor="file"
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#2563eb]"
                  >
                    {cmsForm.hasAttachmentLabel || 'Attachment'}
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      name="file"
                      id="file"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm transition-all duration-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#9adbf4] focus:ring-opacity-50 focus:outline-none hover:border-gray-400 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#2563eb] file:text-white hover:file:bg-[#1d4ed8] file:cursor-pointer"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#2563eb] to-[#9adbf4] hover:from-[#1d4ed8] hover:to-[#7dd3fc] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#9adbf4] focus:ring-opacity-50 active:scale-[0.98]"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>{cmsForm.submitButtonLabel || 'Submit'}</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-delay {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(-5px);
          }
          75% {
            transform: translateX(5px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in-delay 0.6s ease-out 0.3s both;
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  )
}

export default MyFormComponent
