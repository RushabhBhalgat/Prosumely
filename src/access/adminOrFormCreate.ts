import type { Access } from 'payload'

export const adminOrFormCreate: Access = ({ req: { user } }) => {
  // Allow admins full access to everything
  if (user) return true

  // For non-authenticated users, allow creation (form uploads)
  // We'll handle read/update/delete restrictions separately
  return true
}
