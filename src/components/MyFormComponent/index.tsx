'use client'
import { useState, useEffect, useRef } from 'react'
import DOMPurify from 'dompurify' // You'll need to install this package

// Define proper TypeScript interfaces
interface FormField {
  id: string
  name: string
  label: string
  blockType: string
  required?: boolean
}

interface RedirectConfig {
  url: string
}

interface CmsForm {
  fields?: FormField[]
  hasAttachment?: boolean
  hasAttachmentLabel?: string
  submitButtonLabel?: string
  redirect?: RedirectConfig
}

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<CmsForm | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // Rate limiting
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [countdown, setCountdown] = useState(0)

  // Get the form from payload
  useEffect(() => {
    fetch(`/api/forms/${formId}`, {
      credentials: 'include',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json()
      })
      .then((data) => {
        setCmsForm(data)
      })
      .catch((err) => {
        // More secure error logging - don't expose full error details
        if (process.env.NODE_ENV !== 'production') {
          console.error('Error loading form:', err)
        }
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

  // Validate file type and size
  const validateFile = (file: File | null): boolean => {
    if (!file || file.size === 0) return true

    // Restrict file types
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ]
    const fileExtension = file.name.split('.').pop()?.toLowerCase()

    if (
      !allowedTypes.includes(file.type) &&
      !['pdf', 'doc', 'docx'].includes(fileExtension || '')
    ) {
      setError('Only PDF and Word documents (.pdf, .doc, .docx) are allowed')
      return false
    }

    // Restrict file size to 1MB
    if (file.size > 1 * 1024 * 1024) {
      setError('File size must be less than 1MB')
      return false
    }

    return true
  }

  // Sanitize input values
  const sanitizeValue = (value: string): string => {
    return DOMPurify.sanitize(value)
  }

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    // Rate limiting - prevent multiple submissions
    if (isSubmitting) return
    setIsSubmitting(true)

    let fileUploadedId = null
    setError(null)

    try {
      const formData = new FormData(event.currentTarget)

      // Validate the form data
      const hasRequiredFields = cmsForm?.fields?.filter((field) => field.required) || []

      for (const field of hasRequiredFields) {
        const value = formData.get(field.name)
        if (!value || (typeof value === 'string' && value.trim() === '')) {
          setError(`${field.label} is required.`)
          setIsSubmitting(false)
          return
        }
      }

      // Get and validate the file from the form data, if it exists
      const file = formData.get('file') as File
      if (file && file.size > 0) {
        if (!validateFile(file)) {
          setIsSubmitting(false)
          return
        }

        // Upload the file to payload
        const formDataToSend = new FormData()
        formDataToSend.append('file', file)
        formDataToSend.append(
          '_payload',
          JSON.stringify({
            alt: sanitizeValue(file.name),
          }),
        )

        const response = await fetch('/api/media', {
          method: 'POST',
          // Include credentials to send the auth cookie
          credentials: 'include',
          body: formDataToSend,
        })

        if (!response.ok) {
          throw new Error('Failed to upload file')
        }

        const data = await response.json()
        fileUploadedId = data?.doc?.id
      }

      // Delete the file from the form data, so it's not sent to payload
      if (file && file.size > 0) {
        formData.delete('file')
      }

      // Convert the form data to a JSON object and sanitize values
      const dataToSend = Array.from(formData.entries()).map(([name, value]) => ({
        field: name,
        value: sanitizeValue(value.toString()),
      }))

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
        credentials: 'include', // Include credentials to send the auth cookie
      })

      if (response.ok) {
        // Set submitted state to true to show success message
        setIsSubmitted(true)

        // Reset the form
        formRef.current?.reset()

        // Redirect after 2.5 seconds
        setTimeout(() => {
          if (cmsForm?.redirect?.url) {
            window.location.href = cmsForm.redirect.url
          }
        }, 2500)
      } else {
        const errorData = await response.json()
        // Don't expose detailed errors to the client
        setError('Form submission failed. Please try again.')
      }
    } catch (err) {
      // Don't expose internal errors to console in production
      if (process.env.NODE_ENV !== 'production') {
        console.error('Error submitting form:', err)
      }
      setError('An error occurred. Please try again later.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!cmsForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center space-y-4" aria-live="polite">
            <div
              className="animate-spin rounded-full h-12 w-12 border-4 border-[#9adbf4] border-t-[#2563eb]"
              aria-hidden="true"
            ></div>
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
        <div
          className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center"
          role="status"
          aria-live="polite"
        >
          <div className="animate-bounce mb-6">
            <div
              className="mx-auto h-16 w-16 bg-gradient-to-r from-[#2563eb] to-[#9adbf4] rounded-full flex items-center justify-center"
              aria-hidden="true"
            >
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
            <div className="flex items-center justify-center space-x-2" aria-hidden="true">
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
          <header className="bg-gradient-to-r from-[#2563eb] to-[#9adbf4] p-6 text-white">
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
          </header>

          {/* Form Content */}
          <main className="p-6 md:p-8">
            {error && (
              <div
                className="mb-6 bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg animate-shake"
                role="alert"
                aria-live="assertive"
              >
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 text-red-400 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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

            <form
              onSubmit={handleSubmit}
              ref={formRef}
              className="space-y-6"
              aria-label="CV Development Form"
            >
              {cmsForm.fields?.map((field: FormField) => (
                <div key={field.id} className="group">
                  <label
                    htmlFor={field.id}
                    className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-[#2563eb]"
                  >
                    {field.label}
                    {field.required && (
                      <span className="text-red-500 ml-1" aria-hidden="true">
                        *
                      </span>
                    )}
                  </label>
                  <input
                    type={field.blockType}
                    name={field.name}
                    id={field.id}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm transition-all duration-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#9adbf4] focus:ring-opacity-50 focus:outline-none hover:border-gray-400 bg-gray-50 focus:bg-white"
                    required={field.required}
                    aria-required={field.required ? 'true' : 'false'}
                    aria-label={field.label}
                    aria-invalid={error?.includes(field.label) ? 'true' : 'false'}
                    placeholder={`${field.label.toLowerCase()}`}
                    maxLength={field.blockType === 'text' ? 255 : undefined}
                    pattern={
                      field.blockType === 'email'
                        ? '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
                        : undefined
                    }
                    autoComplete={
                      field.blockType === 'email'
                        ? 'email'
                        : field.name.toLowerCase().includes('name')
                          ? 'name'
                          : field.name.toLowerCase().includes('phone')
                            ? 'tel'
                            : 'on'
                    }
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
                      accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm transition-all duration-300 focus:border-[#2563eb] focus:ring-2 focus:ring-[#9adbf4] focus:ring-opacity-50 focus:outline-none hover:border-gray-400 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#2563eb] file:text-white hover:file:bg-[#1d4ed8] file:cursor-pointer"
                      aria-describedby="file-format-help"
                    />
                    <p className="mt-1 text-xs text-gray-500" id="file-format-help">
                      Accepted file types: PDF, DOC, DOCX. Maximum size: 1MB
                    </p>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                aria-busy={isSubmitting}
                className={`w-full bg-gradient-to-r from-[#2563eb] to-[#9adbf4] ${
                  isSubmitting
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:from-[#1d4ed8] hover:to-[#7dd3fc] hover:scale-[1.02]'
                } text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#9adbf4] focus:ring-opacity-50 active:scale-[0.98]`}
              >
                <span className="flex items-center justify-center space-x-2">
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <span>{cmsForm.submitButtonLabel || 'Submit'}</span>
                      <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </>
                  )}
                </span>
              </button>
            </form>
          </main>
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
