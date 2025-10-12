// 代码生成时间: 2025-10-12 18:21:06
 * Features:
 * - Display a list of learning resources.
 * - Add a new learning resource.
 * - Update an existing learning resource.
 * - Delete a learning resource.
 */

// Imports
const { NextApiRequest, NextApiResponse } = require('next')
const { v4: uuidv4 } = require('uuid')
const { MongoClient } = require('mongodb')

// MongoDB connection string
const MONGO_URI = 'mongodb://localhost:27017'
const DB_NAME = 'learningResourcesDB'

// Interface for a learning resource
interface LearningResource {
  id: string,
  title: string,
  description: string,
  url: string,
  category: string,
  tags: string[]
}

// Function to connect to MongoDB
async function connectToDB() {
  const client = new MongoClient(MONGO_URI)
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    return client
  } catch (e) {
    console.error('Could not connect to MongoDB', e)
    process.exit(1)
  }
}

// API route to get all learning resources
const getAllResources = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const client = await connectToDB()
    const db = client.db(DB_NAME)
    const resources = db.collection('resources')
    try {
      const resourcesList = await resources.find<LearningResource>({}).toArray()
      res.status(200).json(resourcesList)
    } catch (e) {
      res.status(500).json({ error: 'Failed to fetch resources' })
    } finally {
      await client.close()
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).end('Method Not Allowed')
  }
}

// API route to add a new learning resource
const addResource = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const client = await connectToDB()
    const db = client.db(DB_NAME)
    const resources = db.collection('resources')
    try {
      const { title, description, url, category, tags } = req.body
      const newResource: LearningResource = {
        id: uuidv4(),
        title,
        description,
        url,
        category,
        tags,
      }
      const result = await resources.insertOne(newResource)
      res.status(201).json(newResource)
    } catch (e) {
      res.status(500).json({ error: 'Failed to add resource' })
    } finally {
      await client.close()
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end('Method Not Allowed')
  }
}

// Export API routes
module.exports = {
  getAllResources,
  addResource
}