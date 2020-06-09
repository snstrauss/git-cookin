import React, { useState, createContext } from "react"
import RecipeList from "./components/recipe-list/recipe-list";
import Login from "./components/login/login";

export const UserContext = createContext();

export default function App() {

  const [currentUser, setCurrentUser] = useState();

  return (
    <UserContext.Provider value={{
      currentUser
    }}>
      {
        currentUser
        ?
        <RecipeList/>
        :
        <Login setUser={setCurrentUser}/>
      }
    </UserContext.Provider>
  )
}