import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'enableLink',
      type: 'checkbox',
      label: 'Enable Link',
      defaultValue: false,
    },
    {
      name: 'linkType',
      type: 'radio',
      label: 'Link Type',
      defaultValue: 'custom',
      options: [
        {
          label: 'Custom URL',
          value: 'custom',
        },
        {
          label: 'Internal Page',
          value: 'internal',
        },
      ],
      admin: {
        condition: (data) => Boolean(data?.enableLink),
      },
    },
    {
      name: 'customUrl',
      type: 'text',
      label: 'Custom URL',
      admin: {
        condition: (data) => Boolean(data?.enableLink && data?.linkType === 'custom'),
      },
    },
    {
      name: 'internalLink',
      type: 'relationship',
      label: 'Internal Page',
      relationTo: ['pages', 'posts'],
      admin: {
        condition: (data) => Boolean(data?.enableLink && data?.linkType === 'internal'),
      },
    },
    {
      name: 'newTab',
      type: 'checkbox',
      label: 'Open in New Tab',
      defaultValue: false,
      admin: {
        condition: (data) => Boolean(data?.enableLink),
      },
    },
  ],
}
