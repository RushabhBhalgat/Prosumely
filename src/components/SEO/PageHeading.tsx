import { cn } from '@/utilities/ui'

interface PageHeadingProps {
  children: React.ReactNode
  className?: string
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function PageHeading({ children, className, as: Component = 'h1' }: PageHeadingProps) {
  const baseClasses = {
    h1: 'text-3xl md:text-4xl lg:text-5xl font-bold leading-tight',
    h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold leading-tight',
    h3: 'text-xl md:text-2xl lg:text-3xl font-semibold leading-tight',
    h4: 'text-lg md:text-xl lg:text-2xl font-medium leading-tight',
    h5: 'text-base md:text-lg lg:text-xl font-medium leading-tight',
    h6: 'text-sm md:text-base lg:text-lg font-medium leading-tight',
  }

  return <Component className={cn(baseClasses[Component], className)}>{children}</Component>
}

// Hook to ensure only one H1 per page
export function useH1Guard() {
  if (typeof window !== 'undefined') {
    const h1Count = document.querySelectorAll('h1').length
    if (h1Count > 1) {
      console.warn(
        `Multiple H1 tags detected (${h1Count}). There should be only one H1 per page for SEO.`,
      )
    }
  }
}
