import type { CollectionConfig } from 'payload'
import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const N8NBlogs: CollectionConfig = {
  slug: 'n8n-blogs',
  labels: {
    singular: 'N8N Blog',
    plural: 'N8N Blogs',
  },
  access: {
    create: () => false, // No creation through Payload admin since these are created by n8n
    delete: () => false, // No deletion through Payload admin
    read: authenticated, // Allow authenticated users to read (for admin interface)
    update: authenticated, // Allow authenticated users to update status
  },
  admin: {
    useAsTitle: 'title',
    components: {
      views: {
        list: {
          Component: '@/collections/N8NBlogs/components/N8NBlogsView',
        },
      },
    },
    description:
      'Manage blogs created by N8N automation workflow. You can only change the status here.',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        readOnly: true,
        rows: 10,
        description: 'HTML content from n8n automation',
      },
    },
    {
      name: 'metaDescription',
      type: 'textarea',
      admin: {
        readOnly: true,
        rows: 3,
        description: 'SEO meta description',
      },
    },
    {
      name: 'featuredImage',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'URL to the featured image',
      },
    },
    {
      name: 'keywords',
      type: 'text',
      admin: {
        readOnly: true,
        description: 'SEO keywords',
      },
    },
    {
      name: 'meta_title',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'meta_description',
      type: 'textarea',
      admin: {
        readOnly: true,
        rows: 3,
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        {
          label: 'Draft',
          value: 'draft',
        },
        {
          label: 'Published',
          value: 'published',
        },
      ],
      admin: {
        description: 'Change this to publish or unpublish the blog',
      },
    },
    {
      name: 'dateCreated',
      type: 'date',
      required: true,
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'datePublished',
      type: 'date',
      admin: {
        readOnly: true,
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'author',
      type: 'text',
      admin: {
        readOnly: false,
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'resume-cv-tips',
      options: [
        {
          label: 'Resume by Country / Region',
          value: 'resume-by-country',
        },
        {
          label: 'Resume by Job Profile / Industry / Level',
          value: 'resume-by-job-profile',
        },
        {
          label: 'Resume and CV Tips / Best Practices',
          value: 'resume-cv-tips',
        },
        {
          label: 'LinkedIn Profile Tips',
          value: 'linkedin-tips',
        },
        {
          label: 'Project Portfolio / Work Samples',
          value: 'project-portfolio',
        },
        {
          label: 'Leadership / Executive Role Resumes',
          value: 'leadership-executive',
        },
        {
          label: 'Career Transition / Special Situations',
          value: 'career-transition',
        },
        {
          label: 'Personal Branding & Online Presence',
          value: 'personal-branding',
        },
        {
          label: 'Job Search & Hiring Trends',
          value: 'job-search-trends',
        },
      ],
      admin: {
        description: 'Blog category for organization',
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ data, operation, originalDoc }: any) => {
        // Auto-set datePublished when status changes to published
        if (operation === 'update' && data.status === 'published') {
          if (originalDoc?.status !== 'published') {
            data.datePublished = new Date()
          }
        }

        // Clear datePublished when status changes to draft
        if (operation === 'update' && data.status === 'draft') {
          data.datePublished = null
        }

        return data
      },
    ],
  },
}
