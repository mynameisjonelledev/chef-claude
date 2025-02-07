const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Get the Hugging Face API token from environment variables
  const huggingFaceToken = process.env.HF_ACCESS_TOKEN;

  if (!huggingFaceToken) {
    return res.status(500).json({ error: 'API token not found!' });
  }

  try {
    // Extract the ingredients from the request body
    const { ingredients } = req.body;
    
    // Call Hugging Face API to generate a response based on the ingredients
    const response = await fetch('https://api-inference.huggingface.co/models/gpt2', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ inputs: `I have the ingredients: ${ingredients.join(", ")}` })
    });

    const result = await response.json();
    return res.status(200).json(result);  // Send the response back to the frontend
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
