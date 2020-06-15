import React, { useEffect, useState, useContext } from 'react';

import S from './recipe-list.module.scss';
import { fileNameToTitle } from '../../../services/utils.service';
import { getRecipesList, addFileToRepository } from '../../../services/github.service';
import Recipe from '../recipe/recipe';
import Logout from '../../partials/login/logout';
import { UserContext } from '../../../contexts/userContext/userContext';

export default function RecipeList(){

    const [recipeList, setRecipeList] = useState();
    const [selectedRecipe, setSelectedRecipe] = useState();

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        setRecipeList();

        getRecipesList(currentUser)
        .then(setRecipeList)

    }, [currentUser])

    function addRecipe(){

        addFileToRepository({
            path: `${currentUser}/newRecipeName.json`,
            data: {
                ingrediants: [
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

            console.log(err);
            debugger;

        })
    }

    return (
        <div className={S.container}>
            <button onClick={addRecipe}>ADD +</button>
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
            <Logout/>
        </div>
    )
}