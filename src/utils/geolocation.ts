// utils/geolocation.ts
export async function detectUserCountry(): Promise<string | null> {
  try {
    // First try IP-based geolocation
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    return data.country_code || null
  } catch (error) {
    console.warn('IP geolocation failed:', error)

    // Fallback to browser geolocation API
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null)
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // You would need a reverse geocoding service here
            // This is a placeholder - you might use Google Maps API or similar
            resolve(null) // For now, return null if IP method fails
          } catch {
            resolve(null)
          }
        },
        () => resolve(null),
        { timeout: 5000 },
      )
    })
  }
}

export function getCountryConfig(countryCode: string): CountryConfig {
  return SUPPORTED_COUNTRIES[countryCode] || SUPPORTED_COUNTRIES.US
}

export function redirectToCountryDomain(countryCode: string) {
  const config = getCountryConfig(countryCode)
  const currentDomain = window.location.origin

  if (SUPPORTED_COUNTRIES[countryCode]) {
    // Redirect to country-specific path
    window.location.href = `${currentDomain}/${countryCode.toLowerCase()}`
  } else {
    // Redirect to default domain (USD)
    window.location.href = currentDomain
  }
}
