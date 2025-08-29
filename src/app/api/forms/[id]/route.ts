import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config })
    const { id } = await params

    // Fetch the form from Payload
    const form = await payload.findByID({
      collection: 'forms',
      id: id,
    })

    return Response.json(form)
  } catch (error) {
    console.error('Error fetching form:', error)
    return Response.json({ error: 'Form not found' }, { status: 404 })
  }
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const payload = await getPayload({ config })
    const { id } = await params
    const body = await request.json()

    // Update the form in Payload
    const updatedForm = await payload.update({
      collection: 'forms',
      id: id,
      data: body,
    })

    return Response.json(updatedForm)
  } catch (error) {
    console.error('Error updating form:', error)
    return Response.json({ error: 'Failed to update form' }, { status: 500 })
  }
}
