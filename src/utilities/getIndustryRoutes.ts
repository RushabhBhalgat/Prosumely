/**
 * Utility to generate industry-specific service URLs for sitemap
 */

// List of all available industries
export const industries = [
  'construction-industry',
  'energy-oil-gas',
  'hospitality-tourism',
  'engineering-manufacturing',
  'logistics-supply-chain',
  'tech-it',
  'banking-financial-services-insurance',
  'healthcare-pharma',
  'strategy-consulting',
  'sales-marketing',
  'media-entertainment',
  'human-resources',
  'fmcg-retail',
  'legal-compliance',
  'public-sector-government',
  'chemicals-materials',
]

// List of service pages that support industry parameters
export const industryEnabledServices = [
  '/services',
  '/academic-cv-writing-service',
  '/ats-resume-writing-service',
  '/career-roadmap-service',
  '/cover-letter-writing-service',
  '/executive-resume-writing-service',
  '/interview-coaching-service',
  '/jobseekers-combo-service',
  '/linkedin-profile-makeover',
  '/membership-application-service',
  '/project-portfolio',
  '/sop-writing-service',
  '/visual-resume-writing-service',
]

/**
 * Generate all industry-specific service URLs
 */
export function getIndustryRoutes(): string[] {
  const routes: string[] = []

  // Generate industry-specific URLs for each service
  for (const service of industryEnabledServices) {
    for (const industry of industries) {
      routes.push(`${service}?industry=${industry}`)
    }
  }

  return routes
}

/**
 * Get industry display names for better organization
 */
export const industryDisplayNames: Record<string, string> = {
  'construction-industry': 'Construction Industry',
  'energy-oil-gas': 'Energy - Oil and Gas',
  'hospitality-tourism': 'Hospitality & Tourism',
  'engineering-manufacturing': 'Engineering & Manufacturing',
  'logistics-supply-chain': 'Logistics & Supply Chain',
  'tech-it': 'Tech & IT',
  'banking-financial-services-insurance': 'Banking, Financial Services & Insurance',
  'healthcare-pharma': 'Healthcare & Pharma',
  'strategy-consulting': 'Strategy & Consulting',
  'sales-marketing': 'Sales & Marketing',
  'media-entertainment': 'Media & Entertainment',
  'human-resources': 'Human Resources',
  'fmcg-retail': 'FMCG & Retail',
  'legal-compliance': 'Legal & Compliance',
  'public-sector-government': 'Public Sector & Government',
  'chemicals-materials': 'Chemicals & Materials',
}
