import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { getRecipeFromMistral } from "./ai";




export function App() {
  return(
    <>
    <Header />
    <Main />
    </>
  );
}