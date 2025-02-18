import { getRecipeFromMistral } from "../ai";
import React from 'react'
import ReactMarkdown from 'react-markdown'

export function JonelleRecipe(props) {
  return(
   <section className="suggested-recipe-container" aria-live='polite'>
    <h2>Chef Jonelle Recommends:</h2>

    {props.recipe ? (
        <ReactMarkdown>{props.recipe}</ReactMarkdown>
      ) : (
        <p>No recipe available. Try again!</p>
      )}

    {/*<ReactMarkdown>
    {props.recipe}
    </ReactMarkdown> */}
   
   </section>
  );
}