const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const huggingFaceToken = process.env.HUGGING_FACE_TOKEN;  // Store this token in Netlify's settings
  
  const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ inputs: 'Hello, Hugging Face!' })
  });

  const result = await response.json();

  return {
    statusCode: 200,
    body: JSON.stringify(result)
  };
};
