import { useState } from "react";

export function Main() {

  const [ingredients, setIngredients] = useState(['Chocolate', 'Milk']);

  const ingredientsListItems = ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
  ));


  function handleSubmit(event) {
  event.preventDefault();

  const formEl = event.currentTarget;
  const formData = new FormData(formEl);

  const newIngredient = formData.get("ingredient");

  if (!newIngredient.trim()) return;
  
  setIngredients(prevIngredients => [...prevIngredients, newIngredient]);

  formEl.reset();
}



  return(
    <>
    <div className="main-con">

    <form className="add-ingredient-form" onSubmit={handleSubmit}>

      <input type="text" placeholder="e.g. oregano" aria-label="Add ingredient" className="input-ing"
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