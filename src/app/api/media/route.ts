import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: Request) {
  try {
    const payload = await getPayload({ config })

    // Extract query parameters from the URL
    const url = new URL(request.url)
    const searchParams = url.searchParams

    // Convert URLSearchParams to a regular object for Payload
    const query: any = {}

    // Handle common Payload query parameters
    if (searchParams.has('depth')) {
      query.depth = parseInt(searchParams.get('depth') || '0')
    }
    if (searchParams.has('limit')) {
      query.limit = parseInt(searchParams.get('limit') || '10')
    }
    if (searchParams.has('page')) {
      query.page = parseInt(searchParams.get('page') || '1')
    }

    // Handle where clause (this is what's causing the issue)
    if (searchParams.has('where')) {
      try {
        query.where = JSON.parse(searchParams.get('where') || '{}')
      } catch (e) {
        // If JSON parsing fails, try to handle the URL-encoded where clause
        const whereParam = searchParams.get('where')
        if (whereParam) {
          // Handle the specific case where Payload sends id[in] queries
          const decodedWhere = decodeURIComponent(whereParam)
          query.where = JSON.parse(decodedWhere)
        }
      }
    }

    // Handle other common parameters
    searchParams.forEach((value, key) => {
      if (!['depth', 'limit', 'page', 'where'].includes(key)) {
        // Handle array parameters like id[in]
        if (key.includes('[') && key.includes(']')) {
          const baseKey = key.split('[')[0]
          const operation = key.match(/\[(.*?)\]/)?.[1]

          if (baseKey && operation) {
            if (!query.where) query.where = {}
            if (!query.where[baseKey]) query.where[baseKey] = {}

            if (operation === 'in') {
              // Handle comma-separated values for 'in' operations
              query.where[baseKey][operation] = value.split(',')
            } else {
              query.where[baseKey][operation] = value
            }
          }
        } else {
          query[key] = value
        }
      }
    })

    // Use Payload's find method to get media documents
    const result = await payload.find({
      collection: 'media',
      ...query,
    })

    return Response.json(result)
  } catch (error) {
    console.error('Error fetching media:', error)
    return Response.json({ error: 'Failed to fetch media' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const payload = await getPayload({ config })
    const formData = await request.formData()
    const file = formData.get('file') as File

    // Check if this is a file upload request or an admin query request
    if (!file) {
      // This might be an admin interface query, check if it has query parameters instead
      const hasQueryParams = Array.from(formData.entries()).some(
        ([key]) => key.includes('depth') || key.includes('where') || key.includes('limit'),
      )

      if (hasQueryParams) {
        // Convert formData to query parameters and use our GET handler
        const query: any = {}

        Array.from(formData.entries()).forEach(([key, value]) => {
          if (key === 'depth') query.depth = parseInt(value as string)
          if (key === 'limit') query.limit = parseInt(value as string)
          if (key.includes('where')) {
            if (!query.where) query.where = {}
            // Handle complex where queries from admin
            if (key.includes('[id][in]')) {
              if (!query.where.id) query.where.id = {}
              if (!query.where.id.in) query.where.id.in = []
              query.where.id.in.push(value as string)
            }
          }
        })

        // Use Payload's find method
        const result = await payload.find({
          collection: 'media',
          ...query,
        })

        return Response.json(result)
      }

      return Response.json({ error: 'No file provided' }, { status: 400 })
    }

    // Continue with normal file upload logic
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create the media document in Payload
    const result = await payload.create({
      collection: 'media',
      data: {
        alt: file.name,
      },
      file: {
        data: buffer,
        mimetype: file.type,
        name: file.name,
        size: file.size,
      },
    })

    return Response.json(result)
  } catch (error) {
    console.error('Error uploading file:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return Response.json({ error: 'Failed to upload file', details: errorMessage }, { status: 500 })
  }
}
