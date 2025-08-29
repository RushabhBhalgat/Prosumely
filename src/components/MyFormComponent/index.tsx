'use client'
import { useState, useEffect, useRef } from 'react'
import { Check } from 'lucide-react' // Changed from CheckIcon to Check

// Lazy load DOMPurify for better performance
let DOMPurify: typeof import('dompurify').default | null = null
const loadDOMPurify = async () => {
  if (!DOMPurify && typeof window !== 'undefined') {
    const domPurifyModule = await import('dompurify')
    DOMPurify = domPurifyModule.default
  }
  return DOMPurify
}

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
  confirmationMessage?: string
}

interface MyFormComponentProps {
  formId: string
  hideFormHeader?: boolean
  preventRedirect?: boolean // Add this new prop
}

const MyFormComponent = ({
  formId,
  hideFormHeader = false,
  preventRedirect = false,
}: MyFormComponentProps) => {
  const [cmsForm, setCmsForm] = useState<CmsForm | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false) // Rate limiting
  const formRef = useRef<HTMLFormElement>(null)
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
  const sanitizeValue = async (value: string): Promise<string> => {
    const purify = await loadDOMPurify()
    return purify ? purify.sanitize(value) : value
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
            alt: await sanitizeValue(file.name),
          }),
        )

        const response = await fetch('/api/media', {
          method: 'POST',
          // Include credentials to send the auth cookie
          credentials: 'include',
          body: formDataToSend,
        })

        if (!response.ok) {
          const errorText = await response.text()
          console.error('File upload failed:', {
            status: response.status,
            statusText: response.statusText,
            error: errorText,
          })
          throw new Error(
            `Failed to upload file: ${response.status} ${response.statusText} - ${errorText}`,
          )
        }

        const data = await response.json()
        // File upload successful, extract ID
        fileUploadedId = data?.id || data?.doc?.id || data?._id

        if (!fileUploadedId) {
          console.error('Could not extract file ID from response:', data)
        }
      }

      // Delete the file from the form data, so it's not sent to payload
      if (file && file.size > 0) {
        formData.delete('file')
      }

      // Convert the form data to a JSON object and sanitize values
      const dataToSend = await Promise.all(
        Array.from(formData.entries()).map(async ([name, value]) => {
          // Skip file fields as they're handled separately
          if (value instanceof File) {
            return null
          }

          // Convert value to string safely
          const stringValue = typeof value === 'string' ? value : String(value)

          return {
            field: name,
            value: await sanitizeValue(stringValue),
          }
        }),
      )

      // Filter out null values (file fields)
      const filteredDataToSend = dataToSend.filter((item) => item !== null)

      // Prepare submission data
      const submissionPayload = {
        form: formId,
        submissionData: filteredDataToSend,
        ...(cmsForm?.hasAttachment && fileUploadedId ? { file: fileUploadedId } : {}),
      }

      // Debug logging
      console.log('🔍 Form submission debug:')
      console.log('📋 Form has attachment?', cmsForm?.hasAttachment)
      console.log('📎 File uploaded ID:', fileUploadedId)
      console.log('� File from form:', file)
      console.log('📎 File size:', file?.size)
      console.log('🔧 CMS Form object:', cmsForm)
      console.log('�📦 Complete submission payload:', submissionPayload)

      // Send data to payload API
      const response = await fetch(`/api/form-submissions`, {
        method: 'POST',
        body: JSON.stringify(submissionPayload),
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

        // Only redirect if not prevented and URL exists
        if (!preventRedirect && cmsForm?.redirect?.url) {
          setTimeout(() => {
            window.location.href = cmsForm.redirect?.url ?? ''
          }, 2500)
        }
      } else {
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

  // Add this helper function to extract text from the confirmation message structure
  const extractConfirmationText = (confirmationMessage: unknown): string => {
    try {
      // Type guard to check if the message has the expected structure
      if (
        confirmationMessage &&
        typeof confirmationMessage === 'object' &&
        'root' in confirmationMessage &&
        confirmationMessage.root &&
        typeof confirmationMessage.root === 'object' &&
        'children' in confirmationMessage.root &&
        Array.isArray(confirmationMessage.root.children) &&
        confirmationMessage.root.children[0] &&
        typeof confirmationMessage.root.children[0] === 'object' &&
        'children' in confirmationMessage.root.children[0] &&
        Array.isArray(confirmationMessage.root.children[0].children) &&
        confirmationMessage.root.children[0].children[0] &&
        typeof confirmationMessage.root.children[0].children[0] === 'object' &&
        'text' in confirmationMessage.root.children[0].children[0] &&
        typeof confirmationMessage.root.children[0].children[0].text === 'string'
      ) {
        return confirmationMessage.root.children[0].children[0].text
      }
      // Fallback message if structure isn't as expected
      return 'Message sent successfully! We will get back to you soon!'
    } catch {
      // Fallback if any errors occur during extraction
      return 'Message sent successfully! We will get back to you soon!'
    }
  }

  const renderSuccessMessage = () => {
    if (!isSubmitted) return null

    return (
      <div className="fixed inset-0 bg-gradient-to-br from-emerald-50 via-white to-blue-50 flex items-center justify-center p-4 z-50">
        <div className="w-full max-w-2xl mx-auto">
          {/* Main Success Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12 text-center">
            {/* Success Icon with Animation */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <Check className="w-10 h-10 md:w-12 md:h-12 text-white" />
                </div>
                {/* Ripple Effect */}
                <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-emerald-400/30 rounded-full animate-ping"></div>
                <div className="absolute inset-0 w-20 h-20 md:w-24 md:h-24 bg-emerald-400/20 rounded-full animate-ping animation-delay-75"></div>
              </div>
            </div>

            {preventRedirect ? (
              // Show only the custom confirmation message from Payload
              <div className="space-y-4">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {cmsForm?.confirmationMessage
                    ? extractConfirmationText(cmsForm.confirmationMessage)
                    : 'Message Sent Successfully!'}
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We have received your submission and will get back to you soon.
                </p>
              </div>
            ) : (
              // Show redirect message with enhanced styling
              <div className="space-y-6">
                <div className="space-y-4">
                  <h1 className="text-2xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                    Form Submitted Successfully!
                  </h1>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                    Thank you for your submission. You're being redirected to our secure payment
                    page.
                  </p>
                </div>

                {/* Progress Section */}
                <div className="bg-gradient-to-r from-blue-50 to-emerald-50 border border-blue-100 rounded-2xl p-6 space-y-4">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-100"></div>
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-200"></div>
                  </div>

                  <p className="text-blue-700 font-medium">Redirecting to payment page...</p>

                  {/* Progress Bar */}
                  <div className="w-full bg-blue-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-2 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full transition-all duration-300 ease-out"
                      style={{ width: `${((25 - countdown) / 25) * 100}%` }}
                    ></div>
                  </div>

                  <p className="text-sm text-blue-600 font-mono">
                    {Math.ceil(countdown / 10)} seconds remaining
                  </p>
                </div>

                {/* Additional Info */}
                <div className="text-sm text-gray-500 space-y-2">
                  <p>🔒 Your payment will be processed securely through Razorpay</p>
                  <p>📧 A confirmation email will be sent to your registered email address</p>
                </div>
              </div>
            )}
          </div>

          {/* Background Decorative Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-emerald-200/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-200/20 rounded-full blur-lg"></div>
        </div>
      </div>
    )
  }

  if (!cmsForm) {
    return (
      <div
        className={
          hideFormHeader
            ? 'flex items-center justify-center p-4'
            : 'min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 flex items-center justify-center p-4'
        }
      >
        <div
          className={
            hideFormHeader
              ? 'p-6 max-w-md w-full'
              : 'bg-white rounded-2xl shadow-xl p-8 max-w-md w-full'
          }
        >
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
    return renderSuccessMessage()
  }

  return (
    <div
      className={
        hideFormHeader ? '' : 'min-h-screen bg-gradient-to-br from-blue-50 to-sky-50 py-8 px-4'
      }
    >
      <div className={hideFormHeader ? '' : 'max-w-2xl mx-auto'}>
        <div className={hideFormHeader ? '' : 'bg-white rounded-2xl shadow-xl overflow-hidden'}>
          {/* Header */}
          {!hideFormHeader && (
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
          )}

          {/* Form Content */}
          <main className={hideFormHeader ? 'p-6' : 'p-6 md:p-8'}>
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
                        ? '[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$'
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
