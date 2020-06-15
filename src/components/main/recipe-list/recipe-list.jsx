import React, { useEffect, useState, useContext, useCallback } from 'react';

import S from './recipe-list.module.scss';
import { fileNameToTitle } from '../../../services/utils.service';
import { getRecipesList, addFileToRepository } from '../../../services/github.service';
import Recipe from '../recipe/recipe';
import { UserContext } from '../../../contexts/userContext/userContext';
import { LayoutContext } from '../layout/layout';

export default function RecipeList(){

    const [recipeList, setRecipeList] = useState();
    const [selectedRecipe, setSelectedRecipe] = useState();

    const { currentUser } = useContext(UserContext);
    const { setHeaderTitle } = useContext(LayoutContext);

    const resetSelectedRecipe = useCallback(() => {
        setSelectedRecipe();
    }, [setSelectedRecipe]);

    useEffect(() => {
        setRecipeList();

        if(!selectedRecipe){
            setHeaderTitle(`${currentUser}'s recipes`);
        }

        getRecipesList(currentUser)
        .then(setRecipeList)

    }, [currentUser, setHeaderTitle, selectedRecipe])

    function addRecipe(){

        alert('need to add new recipe form');
        return;

        addFileToRepository({
            path: `${currentUser}/newRecipeName232323232.json`,
            data: {
                ingredients: [
                    {
                        name: "thing",
                        amount: 12,
                        unit: 'Kg'
                    }
                ],
                instructions: [
                    'do thing'
                ]
            }
        }).catch((err) => {

            alert('err');
            console.log(err);

        })
    }

    return (
        <div className={S.container}>
            <button className={S.addRecipe} onClick={addRecipe}>
                <span>+</span>
            </button>
            {
                recipeList
                ?
                <div className={`${S.listContainer} ${selectedRecipe ? S.hide : ''}`}>
                    <h2>Your Recipes</h2>
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
            <Recipe name={selectedRecipe} goBack={resetSelectedRecipe}/>
        </div>
    )
}