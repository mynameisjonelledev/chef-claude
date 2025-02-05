const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  // Retrieve the token securely from Netlify's environment variables
  const huggingFaceToken = process.env.VITE_HUGGING_FACE_TOKEN;
  
  if (!huggingFaceToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API token not found!' })
    };
  }

  try {
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
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
