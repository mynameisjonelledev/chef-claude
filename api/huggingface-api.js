/*const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`; */

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
