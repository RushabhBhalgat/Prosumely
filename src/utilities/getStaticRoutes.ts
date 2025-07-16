import { readdirSync, statSync } from 'fs'
import { join } from 'path'

/**
 * Automatically discover static routes from the app/(frontend) directory
 * This function reads the directory structure and generates route paths
 */
export function getStaticRoutes(): string[] {
  const frontendDir = join(process.cwd(), 'src', 'app', '(frontend)')

  try {
    const routes: string[] = []

    function scanDirectory(dir: string, basePath: string = ''): void {
      const items = readdirSync(dir)

      for (const item of items) {
        const fullPath = join(dir, item)
        const stat = statSync(fullPath)

        if (stat.isDirectory()) {
          // Skip special Next.js directories and files
          if (
            item.startsWith('(') || // Route groups
            item.startsWith('[') || // Dynamic routes
            item === 'next' ||
            item === 'api' ||
            item.includes('.')
          ) {
            continue
          }

          const routePath = basePath ? `${basePath}/${item}` : `/${item}`

          // Check if this directory has a page.tsx or page.ts file
          const hasPage = items.some(
            (file) =>
              file === 'page.tsx' ||
              file === 'page.ts' ||
              file === 'page.js' ||
              file === 'page.jsx',
          )

          if (hasPage) {
            routes.push(routePath)
          }

          // Recursively scan subdirectories
          scanDirectory(fullPath, routePath)
        }
      }
    }

    // Add root route
    routes.push('/')

    // Scan the frontend directory
    scanDirectory(frontendDir)

    return routes.sort()
  } catch (error) {
    console.warn('Could not auto-discover routes, falling back to manual list:', error)

    // Fallback to manual route list
    return [
      '/',
      '/search',
      '/posts',
      '/about',
      '/academic-cv-writing-service',
      '/ats-resume-writing-service',
      '/cancellation-and-refund',
      '/career-roadmap-service',
      '/career-tools',
      '/contact',
      '/cover-letter-writing-service',
      '/executive-resume-writing-service',
      '/free-resume-review',
      '/interview-coaching-service',
      '/jobseekers-combo-service',
      '/linkedin-profile-makeover',
      '/membership-application-service',
      '/pricing',
      '/privacy-policy',
      '/project-portfolio',
      '/services',
      '/sop-writing-service',
      '/terms-and-conditions',
      '/thank-you-for-choosing-prosumely',
      '/visual-resume-writing-service',
    ]
  }
}
