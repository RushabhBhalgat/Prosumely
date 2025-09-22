import type { AccessArgs } from 'payload'
import type { User } from '@/payload-types'

type isAdmin = (args: AccessArgs<User>) => boolean

export const adminOnly: isAdmin = ({ req: { user } }) => {
  // Check if user exists and has admin role/permissions
  if (!user) return false

  // You can add additional checks here for admin role
  // For example, if you have a role field:
  // return user.role === 'admin'

  // For now, any authenticated user is considered admin
  // You should customize this based on your user model
  return Boolean(user)
}
