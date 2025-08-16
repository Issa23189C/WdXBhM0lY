// 代码生成时间: 2025-08-16 23:39:13
// Import required modules and dependencies
const { NextResponse } = require('next/server');
const sharp = require('sharp');  // Image processing library for conversion
const path = require('path');
const fs = require('fs/promises');
const formidable = require('formidable');  // Library for parsing form data

// Define the DocumentConverter class
class DocumentConverter {

  // Convert image to JPEG
  static async convertImageToJPEG({ imagePath }) {
    try {
      // Read the image file
      const imageBuffer = await fs.readFile(imagePath);
      
      // Convert image to JPEG
      const jpegBuffer = await sharp(imageBuffer).jpeg().toBuffer();
      
      // Write the JPEG image to a new file
      const jpegImagePath = path.join(path.dirname(imagePath), 'output.jpeg');
      await fs.writeFile(jpegImagePath, jpegBuffer);
      
      return {
        success: true,
        message: 'Image converted to JPEG successfully.',
        jpegImagePath
      };
    } catch (error) {
      console.error('Error converting image to JPEG:', error);
      return {
        success: false,
        message: 'Failed to convert image to JPEG.',
        error: error.message
      };
    }
  }

  // Convert image to PNG
  static async convertImageToPNG({ imagePath }) {
    try {
      // Read the image file
      const imageBuffer = await fs.readFile(imagePath);
      
      // Convert image to PNG
      const pngBuffer = await sharp(imageBuffer).png().toBuffer();
      
      // Write the PNG image to a new file
      const pngImagePath = path.join(path.dirname(imagePath), 'output.png');
      await fs.writeFile(pngImagePath, pngBuffer);
      
      return {
        success: true,
        message: 'Image converted to PNG successfully.',
        pngImagePath
      };
    } catch (error) {
      console.error('Error converting image to PNG:', error);
      return {
        success: false,
        message: 'Failed to convert image to PNG.',
        error: error.message
      };
    }
  }
}

// Define the API route for document conversion
export async function POST(request) {
  // Create a new formidable form to parse the incoming request
  const form = new formidable.IncomingForm();
  
  // Set up the form to save the uploaded file to a temporary location
  form.uploadDir = './uploads';
  
  try {
    // Parse the form data
    const fields = await new Promise((resolve, reject) => {
      form.parse(request, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          resolve(fields);
        }
      });
    });
    
    // Check if an image file was uploaded
    if (!fields.imagePath) {
      return new NextResponse('No image file uploaded', { status: 400 });
    }
    
    // Determine the conversion type
    const conversionType = fields.conversionType;
    
    // Perform the conversion based on the type
    switch (conversionType) {
      case 'JPEG': {
        const result = await DocumentConverter.convertImageToJPEG({ imagePath: fields.imagePath });
        return new NextResponse(JSON.stringify(result), { status: result.success ? 200 : 500 });
      }
      case 'PNG': {
        const result = await DocumentConverter.convertImageToPNG({ imagePath: fields.imagePath });
        return new NextResponse(JSON.stringify(result), { status: result.success ? 200 : 500 });
      }
      default:
        return new NextResponse('Unsupported conversion type', { status: 400 });
    }
  } catch (error) {
    console.error('Error processing document conversion:', error);
    return new NextResponse('Error processing document conversion', { status: 500 });
  }
}
