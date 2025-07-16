const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // Redirect non-www to www for canonical consistency
  const wwwRedirect = {
    source: '/:path*',
    has: [
      {
        type: 'host',
        value: 'prosumely.com',
      },
    ],
    destination: 'https://www.prosumely.com/:path*',
    permanent: true,
  }

  const redirects = [internetExplorerRedirect]

  // Only add www redirect in production
  if (process.env.NODE_ENV === 'production') {
    redirects.push(wwwRedirect)
  }

  return redirects
}

export default redirects
