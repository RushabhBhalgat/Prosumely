// This script helps check and migrate consultation data from your existing MongoDB collection
// Run this with: node scripts/migrate-consultations.js

const { MongoClient } = require('mongodb')

async function checkConsultations() {
  const uri = process.env.DATABASE_URI
  if (!uri) {
    console.error('DATABASE_URI environment variable is not set')
    return
  }

  const client = new MongoClient(uri)

  try {
    await client.connect()
    console.log('Connected to MongoDB')

    const db = client.db()

    // Check existing collection
    const existingCollection = db.collection('consultations')
    const payloadCollection = db.collection('consultations')

    // Count documents in both collections
    const existingCount = await existingCollection.countDocuments()
    const payloadCount = await payloadCollection.countDocuments()

    console.log(`Existing consultations: ${existingCount}`)
    console.log(`PayloadCMS consultations: ${payloadCount}`)

    // Show sample of existing data
    if (existingCount > 0) {
      const sampleData = await existingCollection.findOne()
      console.log('Sample existing data:', JSON.stringify(sampleData, null, 2))
    }

    // Show sample of payload data
    if (payloadCount > 0) {
      const samplePayload = await payloadCollection.findOne()
      console.log('Sample payload data:', JSON.stringify(samplePayload, null, 2))
    }

    // If there's existing data but no payload data, migrate it
    if (existingCount > 0 && payloadCount === 0) {
      console.log('Migrating data...')
      const existingData = await existingCollection.find().toArray()

      const migratedData = existingData.map((doc) => ({
        ...doc,
        // Ensure the data structure matches PayloadCMS expectations
        id: doc._id.toString(),
        createdAt: doc.createdAt || new Date(),
        updatedAt: doc.updatedAt || new Date(),
      }))

      await payloadCollection.insertMany(migratedData)
      console.log(`Migrated ${migratedData.length} consultations`)
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

checkConsultations()
