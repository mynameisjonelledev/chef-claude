import { useState } from "react";
import { IngredientsList } from "./IngredientsList";
import { JonelleRecipe } from "./JonelleRecipe";
import { getRecipeFromMistral } from "../ai";

export function Main() {
  const [ingredients, setIngredients] = useState([]);

  const [recipeShown, setRecipeShown] = useState(false);

  async function getRecipe() {
    const recipeMarkdown = await getRecipeFromMistral(ingredients);
    console.log(recipeMarkdown);
}

  function addIngredient(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const newIngredient = formData.get("ingredient");
    
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    
    event.target.reset(); // Clears the form fields


  }



  return(
    <>
    <div className="main-con">

    <form onSubmit={addIngredient} className="add-ingredient-form">

      <input 
      type="text" 
      placeholder="e.g. oregano" 
      aria-label="Add ingredient" 
      className="input-ing"
      name="ingredient"/>

      <button className="ingr-btn" type="submit">+ Add ingredient</button>
      </form>
      
      {ingredients.length > 0 ? 
      <IngredientsList 
        ingredients={ingredients} 
        getRecipe ={getRecipe}
        
        /> 
        
        : null}

      {recipeShown ? <JonelleRecipe /> : null}
    </div>
    </>
  );
}