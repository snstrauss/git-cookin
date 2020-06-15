import React from "react"
import UserContextGiver from "./contexts/userContext/userContext";
import RecipeList from "./components/main/recipe-list/recipe-list";
import './global.scss';
import Layout from "./components/main/layout/layout";

export default function App() {
  return (
    <UserContextGiver>
      <Layout>
        <RecipeList/>
      </Layout>
    </UserContextGiver>
  );
}