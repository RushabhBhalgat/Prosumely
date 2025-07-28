/**
 * Test script to verify industry routes generation
 */

import { getIndustryRoutes } from '../src/utilities/getIndustryRoutes.ts'

console.log('Testing industry routes generation...\n')

try {
  const routes = getIndustryRoutes()

  console.log(`Total industry routes generated: ${routes.length}`)
  console.log('\nFirst 10 routes:')
  routes.slice(0, 10).forEach((route, index) => {
    console.log(`${index + 1}. ${route}`)
  })

  console.log('\nLast 10 routes:')
  routes.slice(-10).forEach((route, index) => {
    console.log(`${routes.length - 10 + index + 1}. ${route}`)
  })

  console.log('\nSample routes by service:')
  const services = [...new Set(routes.map((route) => route.split('?')[0]))]
  services.slice(0, 5).forEach((service) => {
    const serviceRoutes = routes.filter((route) => route.startsWith(service))
    console.log(`\n${service}: ${serviceRoutes.length} routes`)
    console.log(`  Example: ${serviceRoutes[0]}`)
  })
} catch (error) {
  console.error('Error testing industry routes:', error)
}
