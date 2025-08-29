import { getPayload } from 'payload'
import config from '@payload-config'

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    // Create the form submission in Payload
    const result = await payload.create({
      collection: 'form-submissions',
      data: body,
    })

    return Response.json(result)
  } catch (error) {
    console.error('Error creating form submission:', error)
    return Response.json({ error: 'Failed to create form submission' }, { status: 500 })
  }
}
