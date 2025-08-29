import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServicesMode } from '@/utilities/getSettings'
import React from 'react'

import type { Header } from '@/payload-types'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const servicesMode = await getServicesMode()

  return <HeaderClient data={headerData} servicesMode={servicesMode} />
}
