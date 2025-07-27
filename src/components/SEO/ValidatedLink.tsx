import Link from 'next/link'

interface ValidatedLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  external?: boolean
  nofollow?: boolean
  showExternalIcon?: boolean
  ariaLabel?: string
}

export function ValidatedLink({
  href,
  children,
  className,
  external,
  nofollow = false,
  showExternalIcon = true,
  ariaLabel,
  ...props
}: ValidatedLinkProps) {
  // Determine if link is external
  const isExternal = external || (href.startsWith('http') && !href.includes('prosumely.com'))

  // Validate the href
  if (!href || href === '#' || href === '') {
    console.warn(`Invalid or empty href detected: "${href}"`)
    return (
      <span className={className} {...props}>
        {children}
      </span>
    )
  }

  // Handle external links
  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel={`noopener${nofollow ? ' nofollow' : ''}`}
        className={className}
        aria-label={ariaLabel || `External link to ${href}`}
        {...props}
      >
        {children}
        {showExternalIcon && (
          <svg
            className="inline-block w-4 h-4 ml-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        )}
      </a>
    )
  }

  // Handle internal links
  return (
    <Link
      href={href}
      className={className}
      aria-label={ariaLabel}
      {...(nofollow && { rel: 'nofollow' })}
      {...props}
    >
      {children}
    </Link>
  )
}

// Component specifically for navigation links with proper anchor text
export function NavLink({
  href,
  children,
  className,
  activeClassName,
  ...props
}: {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
  [key: string]: any
}) {
  // Ensure proper anchor text
  if (!children || (typeof children === 'string' && children.trim() === '')) {
    console.warn(`Navigation link with empty or missing anchor text: ${href}`)
    return null
  }

  return (
    <ValidatedLink href={href} className={className} {...props}>
      {children}
    </ValidatedLink>
  )
}

// Utility to check if a URL is valid
export function isValidUrl(url: string): boolean {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

// Utility to check if a link is internal
export function isInternalLink(href: string): boolean {
  return href.startsWith('/') || href.startsWith('#') || href.includes('prosumely.com')
}
