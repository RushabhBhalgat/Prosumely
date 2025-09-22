import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type allowFormUploads = (args: AccessArgs<User>) => boolean

export const allowFormUploads: allowFormUploads = ({ req: { user } }) => {
  // Allow admins full access
  if (user) return true

  // For non-authenticated users, only allow creation (uploads from forms)
  // This will be further restricted by the operation type in the collection
  return true
}
