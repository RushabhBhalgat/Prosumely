import canUseDOM from './canUseDOM'

export const getServerSideURL = () => {
  let url = process.env.NEXT_PUBLIC_SERVER_URL

  if (!url && process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = 'http://localhost:3000'
  }

  // Ensure production URL always uses www.prosumely.com for canonical consistency
  if (url.includes('prosumely.com') && !url.includes('www.')) {
    url = url.replace('prosumely.com', 'www.prosumely.com')
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = window.location.protocol
    const domain = window.location.hostname
    const port = window.location.port

    return `${protocol}//${domain}${port ? `:${port}` : ''}`
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    let url = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    // Ensure production URL always uses www.prosumely.com for canonical consistency
    if (url.includes('prosumely.com') && !url.includes('www.')) {
      url = url.replace('prosumely.com', 'www.prosumely.com')
    }
    return url
  }

  let url = process.env.NEXT_PUBLIC_SERVER_URL || ''
  // Ensure production URL always uses www.prosumely.com for canonical consistency
  if (url.includes('prosumely.com') && !url.includes('www.')) {
    url = url.replace('prosumely.com', 'www.prosumely.com')
  }
  return url
}
