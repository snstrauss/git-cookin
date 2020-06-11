import React from "react"
import UserContextGiver from "./contexts/userContext/userContext";
import RecipeList from "./components/main/recipe-list/recipe-list";
import './global.scss';

export default function App() {
  return (
    <UserContextGiver>
      <RecipeList/>
    </UserContextGiver>
  );
}