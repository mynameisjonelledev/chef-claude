import { useState } from "react";

export function Main() {

  const [ingredients, setIngredients] = useState([]);

  const ingredientsListItems = ingredients.map(ingredient => (
      <li key={ingredient}>{ingredient}</li>
  ));


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
      
      {ingredients.length > 0 ? <section>
        <h2>Ingredients on hand:</h2>
        <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
        
        {ingredients.length > 3 ? <div className="get-recipe-container">
            <div>
                <h3>Ready for a recipe?</h3>
                <p>Generate a recipe from your list of ingredients.</p>
            </div>
            <button>Get a recipe</button>
        </div> : null }
    </section> : null}
    </div>
    </>
  );
}