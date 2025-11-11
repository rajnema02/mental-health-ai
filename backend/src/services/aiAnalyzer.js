const fetch = require('node-fetch');
const { hfApiKey, hfTextModel, hfImageModel } = require('../config/env');

// Helper function to query Hugging Face
async function queryHuggingFace(modelUrl, data) {
  try {
    const response = await fetch(modelUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${hfApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Hugging Face API error for ${modelUrl}:`, error.message);
    return null; // Return null on error
  }
}

// 1. Analyze Text
async function analyzeText(text) {
  // Using a model trained for emotion
  const data = { inputs: text };
  const result = await queryHuggingFace(hfTextModel, data);
  
  // The model output is complex, we need to parse it
  // Example result: [[{ 'label': 'sadness', 'score': 0.9 }, ...]]
  if (result && result.length > 0 && result[0].length > 0) {
    const topEmotion = result[0].reduce((prev, current) => 
      (prev.score > current.score) ? prev : current
    );
    return topEmotion.label; // e.g., 'sadness', 'anxiety', 'joy'
  }
  return 'unknown';
}

// 2. Analyze Image
async function analyzeImage(imageUrl) {
  // Using a general-purpose image model
  // We send the URL directly
  const data = { inputs: imageUrl };
  const result = await queryHuggingFace(hfImageModel, data);

  // Example result: [{ 'label': 'exam paper', 'score': 0.8 }, ...]
  if (result && result.length > 0) {
    return result[0].label; // e.g., 'exam paper', 'pills', 'gym'
  }
  return 'unknown';
}

// 3. Main Analyzer Function
async function analyzePost(caption, imageUrl) {
  let textEmotion = 'unknown';
  let imageContent = 'unknown';
  let hasImage = false;

  const analysisPromises = [analyzeText(caption)];

  if (imageUrl) {
    hasImage = true;
    analysisPromises.push(analyzeImage(imageUrl));
  }

  const [textResult, imageResult] = await Promise.all(analysisPromises);
  
  if (textResult) textEmotion = textResult;
  if (imageResult) imageContent = imageResult;

  // --- This is your unique "Prize-Winning" Logic ---
  let topic = 'general';
  let risk_level = 'low';

  // Basic topic mapping
  if (imageContent.includes('exam') || caption.includes('exam')) topic = 'exam_stress';
  if (imageContent.includes('office') || caption.includes('work')) topic = 'work_stress';
  if (imageContent.includes('pills') || imageContent.includes('bottle')) topic = 'substance';

  // Risk & Mismatch Logic
  if (textEmotion === 'sadness' || textEmotion === 'anxiety' || textEmotion === 'fear') {
    risk_level = 'medium';
  }
  if (topic === 'substance' && risk_level === 'medium') {
    risk_level = 'high';
  }

  // The "Mismatch" Logic
  // e.g., Happy text but sad image
  const happyText = textEmotion === 'joy' || textEmotion === 'love';
  const sadImage = imageContent.includes('pills') || imageContent.includes('empty_room') || imageContent.includes('bottle');

  if (happyText && sadImage) {
    risk_level = 'high';
    topic = 'mismatch_hiding_distress';
  }

  return {
    emotion: textEmotion,
    topic: topic,
    risk_level: risk_level,
    hasImage: hasImage
  };
}

module.exports = { analyzePost };