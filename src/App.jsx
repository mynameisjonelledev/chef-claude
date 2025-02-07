import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { getRecipeFromMistral } from "./ai";
import { JonelleRecipe } from "./components/JonelleRecipe";




export function App() {
  return(
    <>
    <Header />
    <Main />
    <JonelleRecipe />
    </>
  );
}