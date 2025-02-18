const SYSTEM_PROMPT = `
You are an assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page
`


export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch(`/api/huggingface-api`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      //body: JSON.stringify({ ingredients: ingredientsArr });

      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ]
    });

    // Check if the response is OK (status 200)
    if (!response.ok) {
      const errorText = await response.text(); // Read as text if it's not JSON
      console.error("Error response:", errorText); // Log the error message
      return; // Exit if the response is an error
    }

    // this the magic!! recipe. Thanks ChatGPT!
    const data = await response.json();
    console.log(data);  // Log or display the recipe result

    return data;  // Return the recipe to use in the UI
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
