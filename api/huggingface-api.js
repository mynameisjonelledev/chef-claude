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

  try {
    // Call the Hugging Face API (for Mistral model)
    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${huggingFaceToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: `Make a recipe with the following ingredients: ${ingredients.join(", ")}`,
      }),
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
