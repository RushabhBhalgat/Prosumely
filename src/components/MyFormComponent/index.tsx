'use client'
import { useState, useEffect, useRef } from 'react'

const MyFormComponent = ({ formId }: { formId: string }) => {
  const [cmsForm, setCmsForm] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const [success, setSuccess] = useState<boolean>(false)
  // Get the form from payload
  useEffect(() => {
    fetch(`/api/forms/${formId}`)
      .then((res) => res.json())
      .then((data) => {
        setCmsForm(data)
        console.log('cmsForm', data)
      })
      .catch((err) => {
        console.error('Error loading form:', err)
        setError('Error loading form. Please try again later.')
      })
  }, [formId])

  // Handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    let fileUploadedId = null
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)

    // get the file from the form data, if it exists
    const file = formData.get('file')
    if (file) {
      console.log('file', file)
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
      console.log('response', response)
      if (!response.ok) {
        throw new Error('Failed to upload file')
      }
      const data = await response.json()
      console.log('data', data)
      debugger
      fileUploadedId = data?.doc?.id
      // add the file id to the form data
    }

    console.log('formData', Object.fromEntries(formData.entries()))

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
        console.log('Submission successful')
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
      <div className="bg-gray-50 p-6 rounded-lg text-center">
        <div className="animate-pulse">Loading form...</div>
      </div>
    )
  }

  // Show success message if submitted
  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="text-green-600 font-medium text-lg mb-2">Form submitted successfully!</div>
        <p className="text-green-500">Taking you to the payment page...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} ref={formRef} className="space-y-4">
        {cmsForm.fields?.map((field: any) => (
          <div key={field.id} className="space-y-2">
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-700">
              {field.label}
            </label>
            <input
              type={field.blockType}
              name={field.name}
              id={field.id}
              className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              required={field.required}
            />
          </div>
        ))}
        {cmsForm.hasAttachment && (
          <div
            style={{
              marginTop: '1rem',
              marginBottom: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            <label htmlFor="file">{cmsForm.hasAttachmentLabel || 'Attachment'}</label>
            <input type="file" name="file" id="file" />
          </div>
        )}
        <button
          type="submit"
          className="mt-4 w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300"
        >
          {cmsForm.submitButtonLabel || 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default MyFormComponent
