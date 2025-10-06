// 代码生成时间: 2025-10-06 19:46:46
 * documentation, and follows best practices for maintainability and scalability.
 */

const { MongoClient } = require('mongodb');
const next = require('next');
const { createServer } = require('http');

// Configuration for MongoDB connection
const mongoDBUri = 'YOUR_MONGODB_URI';
const mongoDBClient = new MongoClient(mongoDBUri);

// Next.js app and handler
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' });
const nextHandler = nextApp.getRequestHandler();

// Study Progress Model
class StudyProgress {
  constructor(userId, courseId, progress) {
    this.userId = userId;
    this.courseId = courseId;
    this.progress = progress; // progress could be a number or an object
  }

  // Method to save progress to the database
  async save() {
    try {
      await mongoDBClient.connect();
      const db = mongoDBClient.db('studyProgressDB');
      const collection = db.collection('progress');
      await collection.insertOne(this);
    } catch (error) {
      console.error('Failed to save study progress:', error);
      throw error;
    } finally {
      await mongoDBClient.close();
    }
  }
}

// API endpoint to create new study progress
async function createStudyProgress(req, res) {
  if (req.method === 'POST') {
    try {
      const { userId, courseId, progress } = req.body;
      const studyProgress = new StudyProgress(userId, courseId, progress);
      await studyProgress.save();
      res.status(201).json({
        message: 'Study progress saved successfully',
        progress: studyProgress
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to save study progress' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
}

// Server setup
async function startServer() {
  await nextApp.prepare();
  const server = createServer((req, res) => {
    nextHandler(req, res);
  });

  // Register API endpoint
  server.post('/api/study-progress', createStudyProgress);

  const port = process.env.PORT || 3000;
  await server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
  });
}

// Start the server
startServer();