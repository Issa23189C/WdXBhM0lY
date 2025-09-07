// 代码生成时间: 2025-09-07 12:59:21
const { promises: fs } = require('fs');
const sharp = require('sharp');

// Middleware to handle image resizing
const imageResizer = async (req, res, next) => {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  // Check if the 'file' field is present in the request body
  if (!req.files || !req.files.image) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the uploaded file
  const file = req.files.image;

  try {
    // Define the new image dimensions
    const newWidth = req.body.width || 100;
    const newHeight = req.body.height || 100;

    // Use sharp to resize the image
    const resizedBuffer = await sharp(file.data)
      .resize({ width: newWidth, height: newHeight })
      .toBuffer();

    // Send the resized image back to the client
    return res.status(200).send(resizedBuffer);
  } catch (error) {
    // Error handling
    console.error(error);
    return res.status(500).send('Error resizing image.');
  }
};

module.exports = {
  imageResizer,
};
