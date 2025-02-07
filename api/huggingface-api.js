/* const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;  */

// api/huggingface-api.js
export default async function handler(req, res) {
  const { ingredients } = req.body; // Get ingredients from the frontend

  // Get your Hugging Face API token from environment variables
  const huggingFaceToken = process.env.HF_ACCESS_TOKEN;

  if (!huggingFaceToken) {
    return res.status(500).json({ error: "API token not found!" });
  }

  const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${huggingFaceToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `I have ${ingredients.join(', ')}. Please give me a recipe you'd recommend I make!` },
      ],
      max_tokens: 1024,
    }),
  });

  try {
    // Check if the response is okay (status code 2xx)
    if (!response.ok) { // If response is not successful
      const errorText = await response.text(); // Read the error response as text
      console.error("API error:", errorText); // Log the error message
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API request failed', details: errorText }),
      };
    }
  
    // If response is successful, parse the response as JSON
    const result = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(result), // Return the result as JSON
    };
  
  } catch (error) {
    // Catch any error (like JSON parsing failure) and log it
    console.error("Error parsing JSON:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to parse JSON response' }),
    };
  }
}