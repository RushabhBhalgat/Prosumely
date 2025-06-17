export interface CountryConfig {
  code: string
  name: string
  currency: string
  currencySymbol: string
  flag?: string
}

export const SUPPORTED_COUNTRIES: Record<string, CountryConfig> = {
  IN: { code: 'IN', name: 'India', currency: 'INR', currencySymbol: '₹' },
  US: { code: 'US', name: 'USA', currency: 'USD', currencySymbol: '$' },
  GB: { code: 'GB', name: 'UK', currency: 'GBP', currencySymbol: '£' },
  DE: { code: 'DE', name: 'Germany', currency: 'EUR', currencySymbol: '€' },
  FR: { code: 'FR', name: 'France', currency: 'EUR', currencySymbol: '€' },
  IT: { code: 'IT', name: 'Italy', currency: 'EUR', currencySymbol: '€' },
  ES: { code: 'ES', name: 'Spain', currency: 'EUR', currencySymbol: '€' },
  SA: { code: 'SA', name: 'KSA', currency: 'SAR', currencySymbol: 'ر.س' },
  CA: { code: 'CA', name: 'Canada', currency: 'CAD', currencySymbol: 'C$' },
  QA: { code: 'QA', name: 'Qatar', currency: 'QAR', currencySymbol: 'ر.ق' },
  AE: { code: 'AE', name: 'UAE', currency: 'AED', currencySymbol: 'د.إ' },
  MY: { code: 'MY', name: 'Malaysia', currency: 'MYR', currencySymbol: 'RM' },
  ID: { code: 'ID', name: 'Indonesia', currency: 'IDR', currencySymbol: 'Rp' },
  EG: { code: 'EG', name: 'Egypt', currency: 'EGP', currencySymbol: 'ج.م' },
}
