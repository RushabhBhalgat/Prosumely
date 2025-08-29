"use client"

import React, { createContext, useContext, useState } from 'react'

export type ServicesMode = 'full' | 'limited'

const ServicesModeContext = createContext<{
  servicesMode: ServicesMode
  setServicesMode: (mode: ServicesMode) => void
}>({
  servicesMode: 'full',
  setServicesMode: () => {},
})

export const useServicesMode = () => useContext(ServicesModeContext)

export const ServicesModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [servicesMode, setServicesMode] = useState<ServicesMode>('full')

  return (
    <ServicesModeContext.Provider value={{ servicesMode, setServicesMode }}>
      {children}
    </ServicesModeContext.Provider>
  )
}
