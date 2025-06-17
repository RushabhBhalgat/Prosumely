import { SUPPORTED_COUNTRIES } from '../../types/country'

interface CountryPromptProps {
  isVisible: boolean
  onCountrySelect: (countryCode: string) => void
  onClose: () => void
  detectedCountry?: string | null
}

export default function CountryPrompt({
  isVisible,
  onCountrySelect,
  onClose,
  detectedCountry,
}: CountryPromptProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select Your Country</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl">
            ×
          </button>
        </div>

        {detectedCountry && (
          <p className="text-sm text-gray-600 mb-4">
            We detected you might be from{' '}
            {SUPPORTED_COUNTRIES[detectedCountry]?.name || 'an unsupported region'}. Please confirm
            or select your country for accurate pricing.
          </p>
        )}

        <div className="grid grid-cols-2 gap-2 mb-4">
          {Object.values(SUPPORTED_COUNTRIES).map((country) => (
            <button
              key={country.code}
              onClick={() => onCountrySelect(country.code)}
              className="p-3 border rounded-lg hover:bg-blue-50 hover:border-blue-300 text-left transition-colors"
            >
              <div className="font-medium">{country.name}</div>
              <div className="text-sm text-gray-500">
                {country.currencySymbol} {country.currency}
              </div>
            </button>
          ))}
        </div>

        <button
          onClick={() => onCountrySelect('US')}
          className="w-full p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
        >
          Other Countries (USD Pricing)
        </button>
      </div>
    </div>
  )
}
