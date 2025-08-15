const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Ensure sharp is installed
// If not already installed, run: npm install sharp --save-dev

const sourcePath = path.join(__dirname, '../public/images/Professioan pic.jpeg');
const targetPath = path.join(__dirname, '../public/images/Professioan-pic-optimized.webp');

async function optimizeImage() {
  try {
    // Create a high-quality webp version at a good size for the portfolio
    await sharp(sourcePath)
      .resize(500, 500, { 
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 90 })
      .toFile(targetPath);
    
    console.log('Image successfully optimized and saved to:', targetPath);
  } catch (error) {
    console.error('Error optimizing image:', error);
  }
}

// Run the optimization
optimizeImage();
