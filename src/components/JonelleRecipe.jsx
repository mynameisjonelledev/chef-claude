import { getRecipeFromMistral } from "../ai";
import React from 'react'
import ReactMarkdown from 'react-markdown'

export function JonelleRecipe(props) {

if (!props.recipe) {
    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Jonelle is thinking...</h2>
      </section>
    );
  }

  try {
    // Check if the recipe is a string or an array of objects from the API
    let recipeContent;
    
    if (typeof props.recipe === 'string') {
      // If it's already a string, use it directly
      recipeContent = props.recipe;
    } else if (Array.isArray(props.recipe) && props.recipe[0]?.generated_text) {
      // Extract the generated_text from the API response
      const fullResponse = props.recipe[0].generated_text;
      
      // Extract just the recipe part (remove the prompt and system instructions)
      // Split by double newlines and skip the first two segments (prompt and system message)
      const segments = fullResponse.split('\n\n');
      recipeContent = segments.slice(2).join('\n\n');
    } else {
      return (
        <section className="suggested-recipe-container" aria-live="polite">
          <h2>Chef Jonelle Recommends:</h2>
          <p>Sorry, I couldn't find a recipe with those ingredients.</p>
        </section>
      );
    }

    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Jonelle Recommends:</h2>
        <ReactMarkdown>{recipeContent}</ReactMarkdown>
      </section>
    );
  } catch (error) {
    console.error("Error rendering recipe:", error);
    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Jonelle Recommends:</h2>
        <p>Oops! Something went wrong while preparing your recipe.</p>
      </section>
    );
  }





  {/*return(
   <section className="suggested-recipe-container" aria-live='polite'>
    <h2>Chef Jonelle Recommends:</h2>

    <ReactMarkdown>
    {props.recipe}
    </ReactMarkdown>
   
   </section>
  );*/}
}