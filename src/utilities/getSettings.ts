import { getPayload } from 'payload'
import config from '@payload-config'
import type { Setting } from '@/payload-types'

export async function getSettings(): Promise<Setting> {
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
}

export async function getServicesMode(): Promise<'full' | 'limited'> {
  const settings = await getSettings()
  return (settings.servicesMode as 'full' | 'limited') || 'full'
}
