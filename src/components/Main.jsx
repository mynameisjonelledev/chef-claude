export function Main() {
  return(
    <>
    <div className="main-con">

    <form className="add-ingredient-form">
      <input type="text" placeholder="e.g. oregano" aria-label="Add ingredient" className="input-ing"/>
      <button className="ingr-btn">+ Add ingredient</button>
      </form>

    </div>
    </>
  );
}