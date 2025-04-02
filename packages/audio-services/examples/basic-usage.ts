/**
 * Basic usage example for the audio-services package
 * 
 * This example demonstrates how to use the audio-services package
 * to generate audio from text with proper Urantia terminology pronunciation.
 */

import { 
  generateAudio, 
  setDefaultProvider, 
  TTSProvider,
  tagContentWithPronunciation,
  extractUrantiaTerms
} from '../src';

// Example 1: Basic usage
async function example1() {
  console.log('Example 1: Basic usage');
  
  // Set default provider and API key
  // In a real application, you would get this from environment variables
  setDefaultProvider(TTSProvider.NARAKEET, 'your-api-key-here');
  
  // Generate audio from text
  const result = await generateAudio(
    'Urantia is the name given to your world, and it is of origin in Nebadon.'
  );
  
  console.log(`Audio URL: ${result.url}`);
  console.log(`Duration: ${result.duration} seconds`);
  console.log(`Format: ${result.format}`);
  console.log(`Size: ${result.size} bytes`);
  console.log();
}

// Example 2: Using the pronunciation tagger directly
function example2() {
  console.log('Example 2: Using the pronunciation tagger directly');
  
  const text = 'The local universe of Nebadon is one of the creations of Michael of Nebadon.';
  
  // Tag with SSML format
  const ssmlTagged = tagContentWithPronunciation(text, 'ssml');
  console.log('SSML format:');
  console.log(ssmlTagged);
  console.log();
  
  // Tag with Narakeet format
  const narakeetTagged = tagContentWithPronunciation(text, 'narakeet');
  console.log('Narakeet format:');
  console.log(narakeetTagged);
  console.log();
}

// Example 3: Extracting Urantia terms
function example3() {
  console.log('Example 3: Extracting Urantia terms');
  
  const text = `
    Urantia is located in the local universe of Nebadon, which is part of the superuniverse of Orvonton.
    The system capital is Jerusem, and the constellation capital is Edentia.
    The local universe capital is Salvington, where Michael of Nebadon resides.
  `;
  
  // Extract Urantia terms
  const terms = extractUrantiaTerms(text);
  
  console.log('Extracted terms:');
  console.log(terms);
  console.log();
}

// Run examples
async function runExamples() {
  try {
    await example1();
    example2();
    example3();
  } catch (error) {
    console.error('Error running examples:', error);
  }
}

// Run examples when this file is executed directly
if (require.main === module) {
  runExamples();
}