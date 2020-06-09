import React, { useState } from "react"
import RecipeList from "./components/recipe-list/recipe-list";



export default function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <RecipeList currentUser={currentUser}  />
  )
}