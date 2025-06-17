import { useState, useEffect } from 'react'
import { detectUserCountry, getCountryConfig } from '../utils/geolocation'
import { CountryConfig, SUPPORTED_COUNTRIES } from '../types/country'

// Default country config to ensure we always have a valid initial state
const DEFAULT_COUNTRY_CONFIG: CountryConfig = {
  code: 'US',
  name: 'United States',
  currency: 'USD',
  currencySymbol: '$',
  // Add any other required properties from your CountryConfig type
}

export function useCountryDetection() {
  const [detectedCountry, setDetectedCountry] = useState<string | null>(null)
  const [selectedCountry, setSelectedCountry] = useState<string>('')
  const [showCountryPrompt, setShowCountryPrompt] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  // Fix: Provide a fallback to ensure we always have a valid CountryConfig
  const [countryConfig, setCountryConfig] = useState<CountryConfig>(
    SUPPORTED_COUNTRIES.US || DEFAULT_COUNTRY_CONFIG,
  )

  useEffect(() => {
    async function initCountryDetection() {
      try {
        const detected = await detectUserCountry()
        setDetectedCountry(detected)

        if (detected && SUPPORTED_COUNTRIES[detected]) {
          // Auto-select if supported country is detected
          setSelectedCountry(detected)
          setCountryConfig(getCountryConfig(detected))
        } else {
          // Show prompt if country not detected or not supported
          setShowCountryPrompt(true)
          setCountryConfig(SUPPORTED_COUNTRIES.US || DEFAULT_COUNTRY_CONFIG) // Default with fallback
        }
      } catch (error) {
        console.error('Country detection failed:', error)
        setShowCountryPrompt(true)
        setCountryConfig(SUPPORTED_COUNTRIES.US || DEFAULT_COUNTRY_CONFIG)
      } finally {
        setIsLoading(false)
      }
    }

    initCountryDetection()
  }, [])

  const handleCountrySelection = (countryCode: string) => {
    setSelectedCountry(countryCode)
    setCountryConfig(getCountryConfig(countryCode))
    setShowCountryPrompt(false)

    // Optional: Redirect immediately after selection
    // redirectToCountryDomain(countryCode)
  }

  return {
    detectedCountry,
    selectedCountry,
    showCountryPrompt,
    isLoading,
    countryConfig,
    handleCountrySelection,
    setShowCountryPrompt,
  }
}
