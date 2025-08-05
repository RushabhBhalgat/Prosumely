import type { CollectionConfig } from 'payload'

export const RateLimit: CollectionConfig = {
  slug: 'rate-limits',
  access: {
    read: () => false, // Only internal system access
    create: () => true, // Allow creation for rate limiting
    update: () => true, // Allow updating counters
    delete: () => false, // Prevent deletion
  },
  admin: {
    hidden: true, // Hide from admin UI
  },
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
      index: true, // IP address or user identifier
    },
    {
      name: 'endpoint',
      type: 'text',
      required: true,
      index: true, // API endpoint being rate limited
    },
    {
      name: 'tier',
      type: 'select',
      required: true,
      options: [
        { label: 'Burst', value: 'burst' },
        { label: 'Minute', value: 'minute' },
        { label: 'Free', value: 'free' },
        { label: 'Premium', value: 'premium' },
      ],
      index: true,
    },
    {
      name: 'count',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'resetTime',
      type: 'date',
      required: true,
      index: true,
    },
    {
      name: 'createdAt',
      type: 'date',
      required: true,
      defaultValue: () => new Date(),
    },
  ],
  indexes: [
    {
      fields: ['identifier', 'endpoint', 'tier', 'resetTime'],
    },
  ],
}
