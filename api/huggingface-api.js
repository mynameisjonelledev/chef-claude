// api/huggingface-api.js
export default async function handler(req, res) {
  const { ingredients } = req.body; // Get ingredients from the frontend

  // Get your Hugging Face API token from environment variables
  const huggingFaceToken = process.env.HF_ACCESS_TOKEN;

  if (!huggingFaceToken) {
    return res.status(500).json({ error: "API token not found!" });
  }

  try {
    // Call the Hugging Face API (for GPT-2, or any other model you are using)
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

    const result = await response.json();
    res.status(200).json(result); // Send the result back to frontend
  } catch (error) {
    res.status(500).json({ error: error.message }); // Error handling
  }
}
