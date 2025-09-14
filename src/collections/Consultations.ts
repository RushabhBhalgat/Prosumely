import type { CollectionConfig } from 'payload'

export const Consultations: CollectionConfig = {
  slug: 'consultations',
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'status', 'servicePage', 'createdAt'],
    listSearchableFields: ['name', 'email', 'phone', 'anzsoCode', 'servicePage'],
    group: 'Customer Management',
    description: 'Manage consultation requests and their status',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
          label: 'Full Name',
          admin: {
            width: '50%',
          },
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
          label: 'Phone Number',
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email Address',
    },
    {
      type: 'row',
      fields: [
        {
          name: 'anzsoCode',
          type: 'text',
          label: 'ANZSO Code',
          admin: {
            width: '50%',
            description: 'Australian and New Zealand Standard Classification of Occupations Code',
          },
        },
        {
          name: 'servicePage',
          type: 'text',
          label: 'Service Page',
          admin: {
            width: '50%',
            description: 'The service page where this consultation was requested',
          },
        },
      ],
    },
    {
      name: 'message',
      type: 'textarea',
      label: 'Message',
      admin: {
        description: 'Customer message or consultation details',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'In Progress',
          value: 'in-progress',
        },
        {
          label: 'Contacted',
          value: 'contacted',
        },
        {
          label: 'Completed',
          value: 'completed',
        },
        {
          label: 'Cancelled',
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
        description: 'Current status of the consultation request',
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      label: 'Internal Notes',
      admin: {
        position: 'sidebar',
        description: 'Internal notes for tracking consultation progress',
      },
    },
  ],
  timestamps: true,
}