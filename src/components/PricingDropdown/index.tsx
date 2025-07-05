'use client'
import Link from 'next/link'

export function PricingDropdown() {
  return (
    <Link
      href="/pricing"
      className="px-4 py-2 rounded-lg text-gray-900 font-medium dark:text-black transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-[#2563eb]"
    >
      <span className="font-medium">Pricing</span>
    </Link>
  )
}
