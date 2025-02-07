const fetch = require('node-fetch');

const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.
`;

exports.handler = async function(event, context) {
  const huggingFaceToken = process.env.HF_ACCESS_TOKEN;

  if (!huggingFaceToken) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'API token not found!' })
    };
  }

  try {
    const { ingredients } = JSON.parse(event.body);

    if (!ingredients || !Array.isArray(ingredients)) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Invalid ingredients format" }),
      };
    }

    const ingredientsString = ingredients.join(", ");

    const response = await fetch('https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${huggingFaceToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
        max_tokens: 1024,
      })
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
