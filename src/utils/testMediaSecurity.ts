// Test script to verify media security implementation
// Run this after deployment to ensure everything works correctly

// Test 1: Public user should be able to upload files via form
async function testPublicUpload() {
  console.log('🧪 Testing public file upload...')

  const testFile = new File(['test content'], 'test-upload.pdf', { type: 'application/pdf' })
  const formData = new FormData()
  formData.append('file', testFile)
  formData.append('_payload', JSON.stringify({ alt: 'test-upload.pdf' }))

  try {
    const response = await fetch('/api/media', {
      method: 'POST',
      body: formData,
    })

    if (response.ok) {
      const result = await response.json()
      console.log('✅ Public upload works:', result.id)
      return result.filename || 'test-upload.pdf'
    } else {
      console.log('❌ Public upload failed:', response.status, await response.text())
      return null
    }
  } catch (error) {
    console.log('❌ Public upload error:', error)
    return null
  }
}

// Test 2: Public user should NOT be able to access files directly
async function testPublicFileAccess(filename: string) {
  console.log('🧪 Testing public file access (should fail)...')

  try {
    const response = await fetch(`/api/media/file/${encodeURIComponent(filename)}`)

    if (response.status === 403) {
      console.log('✅ Public file access properly blocked')
      return true
    } else {
      console.log('❌ Security issue: Public can access files!', response.status)
      return false
    }
  } catch (error) {
    console.log('❌ Error testing file access:', error)
    return false
  }
}

// Test 3: Admin should be able to access files
async function testAdminFileAccess(filename: string) {
  console.log('🧪 Testing admin file access (you must be logged in as admin)...')

  try {
    const response = await fetch(`/api/media/file/${encodeURIComponent(filename)}`, {
      credentials: 'include', // Include session cookies
    })

    if (response.ok) {
      console.log('✅ Admin file access works')
      return true
    } else if (response.status === 403) {
      console.log('⚠️  Admin access blocked - make sure you are logged in to admin panel')
      return false
    } else {
      console.log('❌ Admin file access failed:', response.status)
      return false
    }
  } catch (error) {
    console.log('❌ Error testing admin access:', error)
    return false
  }
}

// Run all tests
export async function runSecurityTests() {
  console.log('🔒 Running Media Security Tests...\n')

  // Test public upload
  const uploadedFilename = await testPublicUpload()

  if (uploadedFilename) {
    // Test public access (should fail)
    await testPublicFileAccess(uploadedFilename)

    // Test admin access (should work if logged in)
    await testAdminFileAccess(uploadedFilename)
  }

  console.log('\n✅ Security tests completed!')
}

// If running directly, execute tests
if (typeof window !== 'undefined') {
  // Client-side execution
  runSecurityTests()
}
