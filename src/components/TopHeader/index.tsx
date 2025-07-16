import Link from 'next/link'

// components/TopNavbar.tsx
export default function TopNavbar() {
  return (
    <div className="w-full bg-white border-b text-sm py-2">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        <div className="flex gap-4 flex-wrap">
          <span className="cursor-pointer">UAE</span>
          <span className="cursor-pointer">Qatar</span>
          <span className="cursor-pointer">KSA</span>
          <span className="cursor-pointer row"> USA</span>
          <span className="cursor-pointer">UK</span>
          <span className="cursor-pointer">India</span>
          <span className="cursor-pointer">Egypt</span>
          <span className="cursor-pointer font-medium">Select your Country</span>
        </div>
        <Link href="/pricing">
          <button className="bg-black text-white px-3 py-1 rounded text-xs md:text-sm whitespace-nowrap hover:opacity-90">
            BUY NOW
          </button>
        </Link>
      </div>
    </div>
  )
}
