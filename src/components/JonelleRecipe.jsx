import { getRecipeFromMistral } from "../ai";
import React from 'react'
import ReactMarkdown from 'react-markdown'
import ReactDom from 'react-dom'

export function JonelleRecipe(props) {
  return(
   <section className="suggested-recipe-container" aria-live='polite'>
    <h2>Chef Jonelle Recommends:</h2>

    <ReactMarkdown>
    {props.recipe}
    </ReactMarkdown>
   
   </section>
  );
}