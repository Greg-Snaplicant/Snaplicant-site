const fs = require('fs').promises;
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const path = require('path');

async function parseResumeFile(file) {
  try {
    const fileExtension = path.extname(file.originalname).toLowerCase();
    const fileBuffer = await fs.readFile(file.path);

    switch (fileExtension) {
      case '.pdf':
        return await parsePDF(fileBuffer);
      
      case '.docx':
        return await parseDOCX(fileBuffer);
      
      case '.doc':
        // For .doc files, we'll try mammoth (works for some .doc files)
        // In production, you might want to use a more robust solution
        try {
          return await parseDOCX(fileBuffer);
        } catch (error) {
          throw new Error('Legacy .doc format not fully supported. Please convert to .docx or PDF.');
        }
      
      case '.txt':
        return fileBuffer.toString('utf-8');
      
      default:
        throw new Error('Unsupported file format');
    }
  } catch (error) {
    console.error('File parsing error:', error);
    throw new Error(`Failed to parse file: ${error.message}`);
  }
}

async function parsePDF(buffer) {
  try {
    const data = await pdf(buffer);
    const text = data.text;
    
    if (!text || text.trim().length < 10) {
      throw new Error('PDF appears to be empty or contains only images');
    }
    
    return text;
  } catch (error) {
    throw new Error('Failed to extract text from PDF. Please ensure the PDF contains selectable text.');
  }
}

async function parseDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    const text = result.value;
    
    if (!text || text.trim().length < 10) {
      throw new Error('Document appears to be empty');
    }
    
    return text;
  } catch (error) {
    throw new Error('Failed to extract text from Word document.');
  }
}

module.exports = { parseResumeFile };