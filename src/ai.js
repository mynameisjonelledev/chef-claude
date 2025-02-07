export async function getRecipeFromMistral(ingredientsArr) {

  try {
    const response = await fetch('/.netlify/functions/huggingface-api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ingredients: ingredientsArr }) // Send ingredients to backend
    });

    const data = await response.json();
    console.log(data); // Log or display the generated recipe

    return data; // Return recipe to use in UI
  } catch (error) {
    console.error("Error fetching recipe:", error);
  }
}

