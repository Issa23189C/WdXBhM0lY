// 代码生成时间: 2025-08-24 12:19:09
const fs = require('fs').promises;
const csv = require('csv-parser');
const path = require('path');
const { NextApiRequest, NextApiResponse } = require('next');

// Middleware to parse CSV file from request
const parseCSV = async (req, res, next) => {
  if (req.method === 'POST' && req.headers['content-type'] === 'text/csv') {
    const results = [];
    await new Promise((resolve, reject) => {
      req
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
    req.body = results;
    next();
  } else {
    next();
  }
};

// Helper function to process a single CSV file
const processCSVFile = async (file) => {
  try {
    const results = [];
    await new Promise((resolve, reject) => {
      const reader = fs.createReadStream(file)
        .pipe(csv());
      reader
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (err) => reject(err));
    });
    return results;
  } catch (error) {
    console.error('Error processing CSV file:', error);
    throw error;
  }
};

// API endpoint to process a batch of CSV files
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const files = req.body;
      const processedData = await Promise.all(files.map(processCSVFile));
      res.status(200).json({
        status: 'success',
        data: processedData,
      });
    } catch (error) => {
      res.status(500).json({
        status: 'error',
        message: 'Failed to process CSV files',
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end('Method Not Allowed');
  }
};

module.exports = { parseCSV, handler };

// To use this in a Next.js API route:
//
// import { parseCSV, handler } from './csv_batch_processor';
//
// export default function handler(req, res) {
//   parseCSV(req, res, handler);
// }