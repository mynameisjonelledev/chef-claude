const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`

// api/huggingface-api.js

export default async function handler(req, res) {
  const { ingredients } = req.body; // Get ingredients from the frontend

  // Ensure the ingredients array is not empty
  if (!ingredients || ingredients.length === 0) {
    return res.status(400).json({ error: "No ingredients provided!" });
  }

  // Get your Hugging Face API token from environment variables
  const huggingFaceToken = process.env.HF_ACCESS_TOKEN;

  if (!huggingFaceToken) {
    return res.status(500).json({ error: "API token not found!" });
  }

  const ingredientsString = ingredients.join(", "); // FIXED: Define this before use

  try {
    // Call the Hugging Face API (for Mistral model)
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${huggingFaceToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! ${SYSTEM_PROMPT}`,
    })

        //inputs: `Format your response in markdown to make it easier to render to a web page. I have ${ingredients.join(', ')}. Please give me a recipe you'd recommend I make!`,
      });

    // Check if the API response is successful
    if (!response.ok) {
      // Log the error message from the response
      const error = await response.text();
      return res.status(500).json({ error: `Hugging Face API error: ${error}` });
    }

    // Parse and return the result
    const result = await response.json();
    res.status(200).json(result); // Send the result back to frontend
  } catch (error) {
    console.error("Error in serverless function:", error.message);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
}
