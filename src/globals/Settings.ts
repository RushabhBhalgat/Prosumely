import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
    update: authenticated,
  },
  admin: {
    group: 'Admin',
  },
  fields: [
    {
      name: 'servicesMode',
      type: 'select',
      label: 'Services Display Mode',
      defaultValue: 'full',
      admin: {
        description: 'Choose which services to display on the website',
      },
      options: [
        {
          label: 'Full Services (11 services)',
          value: 'full',
        },
        {
          label: 'Limited Services (3 services)',
          value: 'limited',
        },
      ],
    },
    {
      name: 'maintenanceMode',
      type: 'checkbox',
      label: 'Maintenance Mode',
      defaultValue: false,
      admin: {
        description: 'Enable to show maintenance page to all visitors',
      },
    },
  ],
}
