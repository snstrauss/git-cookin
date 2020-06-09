import React, { useEffect, useState } from 'react';

import S from './recipe-list.module.scss';
import { fileNameToTitle } from '../../services/utils.service';
import { getRecipesList } from '../../services/github.service';
import Recipe from '../recipe/recipe';

export default function RecipeList({ currentUser }){

    const [recipeList, setRecipeList] = useState();
    const [selectedRecipe, setSelectedRecipe] = useState();

    useEffect(() => {
        getRecipesList(currentUser)
        .then(setRecipeList)

    }, [currentUser])

    return (
        <div className={S.container}>
            {
                recipeList
                ?
                <div className={`${S.listContainer} ${selectedRecipe ? S.hide : ''}`}>
                    {
                        recipeList.map(({ name }, idx) => (
                            <button onClick={() => setSelectedRecipe(name)} key={`${idx}. ${name}`}>
                                <h3 className={S.item}>
                                    {fileNameToTitle(name)}
                                </h3>
                            </button>
                        ))
                    }
                </div>
                :
                <h1>WAITT!~!</h1>
            }
            <Recipe name={selectedRecipe} goBack={() => setSelectedRecipe()}/>
        </div>
    )
}