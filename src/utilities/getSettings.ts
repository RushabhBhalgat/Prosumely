import { getPayload } from 'payload'
import config from '@payload-config'
import type { Setting } from '@/payload-types'
import { unstable_cache } from 'next/cache'

export const getSettings = unstable_cache(
  async (): Promise<Setting> => {
    try {
      const payload = await getPayload({ config })
      const settings = await payload.findGlobal({
        slug: 'settings',
      })
      return settings as Setting
    } catch (error) {
      console.error('Error fetching settings:', error)
      // Return default settings if fetch fails
      return {
        id: 'default',
        servicesMode: 'full',
        maintenanceMode: false,
      } as Setting
    }
  },
  ['settings'],
  {
    tags: ['global_settings'],
    revalidate: 60, // Cache for 1 minute, but will be invalidated by the hook
  }
)

export async function getServicesMode(): Promise<'full' | 'limited'> {
  const settings = await getSettings()
  return (settings.servicesMode as 'full' | 'limited') || 'full'
}
