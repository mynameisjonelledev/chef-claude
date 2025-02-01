import { useState } from "react";

export function Main() {

  const [ingredients, setIngredients] = useState([]);

  const ingredientsListItems = ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
  ));


  function handleSubmit(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget)

  const newIngredient = formData.get("ingredient");
  
  setIngredients(prevIngredients => [...prevIngredients, newIngredient]);
}



  return(
    <>
    <div className="main-con">

    <form className="add-ingredient-form" onClick={handleSubmit}>

      <input type="text" placeholder="e.g. oregano" aria-label="Add ingredient" className="input-ing"
      name="ingredient"/>

      <button className="ingr-btn">+ Add ingredient</button>
      </form>
      <ul>
        {ingredientsListItems}
      </ul>
    </div>
    </>
  );
}