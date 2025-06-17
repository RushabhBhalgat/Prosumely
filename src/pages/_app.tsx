import type { AppProps } from 'next/app'
import { useCountryDetection } from '../hooks/useCountryDetection'
import TopNavbar from '../components/TopHeader'
import CountryPrompt from '../components/CountryPrompt'
import '../styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  const {
    detectedCountry,
    selectedCountry,
    showCountryPrompt,
    isLoading,
    countryConfig,
    handleCountrySelection,
    setShowCountryPrompt,
  } = useCountryDetection()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Detecting your location...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <TopNavbar
        selectedCountry={selectedCountry}
        onCountryChange={handleCountrySelection}
        currencySymbol={countryConfig.currencySymbol}
      />

      <CountryPrompt
        isVisible={showCountryPrompt}
        onCountrySelect={handleCountrySelection}
        onClose={() => setShowCountryPrompt(false)}
        detectedCountry={detectedCountry}
      />

      <Component {...pageProps} countryConfig={countryConfig} selectedCountry={selectedCountry} />
    </div>
  )
}
