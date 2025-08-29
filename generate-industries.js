// Script to generate all industry service pages
const industries = [
  { slug: 'energy-oil-gas', name: 'Energy - Oil and Gas' },
  { slug: 'hospitality-tourism', name: 'Hospitality & Tourism' },
  { slug: 'engineering-manufacturing', name: 'Engineering & Manufacturing' },
  { slug: 'logistics-supply-chain', name: 'Logistics & Supply Chain' },
  { slug: 'tech-it', name: 'Tech & IT' },
  { slug: 'banking-financial-services-insurance', name: 'Banking, Financial Services & Insurance' },
  { slug: 'healthcare-pharma', name: 'Healthcare & Pharma' },
  { slug: 'strategy-consulting', name: 'Strategy & Consulting' },
  { slug: 'sales-marketing', name: 'Sales & Marketing' },
  { slug: 'media-entertainment', name: 'Media & Entertainment' },
  { slug: 'human-resources', name: 'Human Resources' },
  { slug: 'fmcg-retail', name: 'FMCG & Retail' },
  { slug: 'legal-compliance', name: 'Legal & Compliance' },
  { slug: 'public-sector-government', name: 'Public Sector & Government' },
  { slug: 'chemicals-materials', name: 'Chemicals & Materials' },
]

industries.forEach((industry) => {
  console.log(`Creating ${industry.slug}-industry/services/page.tsx`)
  console.log(`Industry: ${industry.slug}, Name: ${industry.name}`)
})
