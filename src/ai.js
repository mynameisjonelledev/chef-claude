export async function getRecipeFromMistral(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  try {
    const response = await fetch('/api/huggingface-api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr })
    });

    // this the magic!! recipe. Thanks ChatGPT!
    const data = await response.json();
    console.log(data);  // Log or display the recipe result

    return data;  // Return the recipe to use in the UI
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}
