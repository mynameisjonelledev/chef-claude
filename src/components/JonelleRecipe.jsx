import { getRecipeFromMistral } from "../ai";
import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown'
import { generatePDF } from '@react-pdf/renderer';

export function JonelleRecipe(props) {

  if (!props.recipe) {
    return (
      <section className="suggested-recipe-container" aria-live="polite">
        <h2>Chef Jonelle is thinking...</h2>
      </section>
    );
  }

  let recipeData = props.recipe;
  
  // If the recipe is a string that looks like JSON, try to parse it
  if (typeof props.recipe === 'string' && 
      (props.recipe.startsWith('[') || props.recipe.startsWith('{'))) {
    try {
      recipeData = JSON.parse(props.recipe);
    } catch (e) {
      // If it fails to parse, just use the string as-is
      recipeData = props.recipe;
    }
  }

  // Now determine the actual recipe text
  let recipeContent = '';
  
  if (typeof recipeData === 'string') {
    recipeContent = recipeData;
  } else if (Array.isArray(recipeData) && recipeData[0]?.generated_text) {

    const fullText = recipeData[0].generated_text;
    
    // Find the start of the actual recipe content after the prompt
    if (fullText.includes('With the ingredients you')) {
      const parts = fullText.split('With the ingredients you');
      recipeContent = 'With the ingredients you' + parts[1];
    } else {
      // If we can't find that specific phrase, try splitting by double newlines
      // and skip the first few segments which likely contain the prompt
      const segments = fullText.split('\n\n');
      if (segments.length > 3) {
        recipeContent = segments.slice(2).join('\n\n');
      } else {
        recipeContent = fullText;
      }
    }
  } else {
    // Last resort - stringify and show whatever we got
    recipeContent = JSON.stringify(recipeData, null, 2);
  }

  return (
    <section className="suggested-recipe-container" aria-live="polite">
      <h2>Chef Jonelle Recommends:</h2>
      <ReactMarkdown>{recipeContent}</ReactMarkdown>
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
