import { useState } from "react";
import { IngredientsList } from "./IngredientsList";
import { JonelleRecipe } from "./JonelleRecipe";

export function Main() {

  function hfAPI(){
    const huggingFaceToken = import.meta.env.VITE_HUGGING_FACE_TOKEN;
    
    console.log(huggingFaceToken);

  }

  const [ingredients, setIngredients] = useState(["all the main spices", "pasta", "ground beef", "tomato paste"]);

  const [recipeShown, setRecipeShown] = useState(false);

  function toggleRecipeShown() {
    setRecipeShown(prevShown => !prevShown)
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
        toggleRecipeShown ={toggleRecipeShown}
        
        /> 
        
        : null}

      {recipeShown ? <JonelleRecipe /> : null}
    </div>
    </>
  );
}