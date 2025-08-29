import type { GlobalAfterChangeHook } from 'payload'
import { revalidateTag, revalidatePath } from 'next/cache'

export const revalidateSettings: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating settings and all pages due to services mode change`)

    // Revalidate the settings cache
    revalidateTag('global_settings')
    
    // Revalidate all main pages that use services mode
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/pricing')
    
    // Revalidate all industry service pages
    const industries = [
      'construction-industry',
      'energy-oil-gas-industry', 
      'tech-it-industry',
      'hospitality-tourism-industry',
      'engineering-manufacturing-industry',
      'logistics-supply-chain-industry',
      'banking-financial-services-insurance-industry',
      'healthcare-pharma-industry',
      'strategy-consulting-industry',
      'sales-marketing-industry',
      'media-entertainment-industry',
      'human-resources-industry',
      'fmcg-retail-industry',
      'legal-compliance-industry',
      'public-sector-government-industry',
      'chemicals-materials-industry'
    ]
    
    industries.forEach(industry => {
      revalidatePath(`/${industry}/services`)
    })
    
    // Revalidate dynamic industry routes
    revalidatePath('/services', 'page')
    
    // Force revalidation of the entire site if services mode changed
    payload.logger.info(`Services mode changed to: ${doc.servicesMode}`)
  }
}