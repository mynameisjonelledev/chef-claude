import { useState } from "react";

export function Main() {

  const [ingredients, setIngredients] = useState(['Chicken', 'Lemon']);

  const ingredientsListItems = ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
  ));


  function addIngredient(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    
    const newIngredient = formData.get("ingredient");
    setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
    console.log(newIngredient);
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
      <ul>
        {ingredientsListItems}
      </ul>
    </div>
    </>
  );
}