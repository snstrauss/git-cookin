import React, { useEffect, useState, useContext } from 'react';
import S from './recipe.module.scss';

import { fileNameToTitle } from '../../services/utils.service';
import { getRecipeData } from '../../services/github.service';
import { UserContext } from '../../app';

export default function Recipe({ name, goBack }){

    const [{ ingredients, instructions }, setRecipeData] = useState({});
    const [lastRecipeShown, setLastRecipe] = useState();
    const [gotData, setGotData] = useState(false);

    const { currentUser } = useContext(UserContext);

    const needNewRecipeData = name !== lastRecipeShown;

    useEffect(() => {
        window.onpopstate = function backToList(){
            goBack();
        }
    }, [])

    useEffect(() => {
        setGotData(false);

        if(name){
            window.history.pushState(name, name);

            if(needNewRecipeData){
                getRecipeData(`${currentUser}/${name}`)
                .then((recipeData) => {
                    setLastRecipe(name);
                    setRecipeData(recipeData);
                });
            } else {
                setGotData(true);
            }
        }

    }, [name, lastRecipeShown]);

    return (
        <div className={`${S.container} ${name ? '' : 'shown'}` }>
            {
                name && gotData &&
                <>
                    <h1 className={S.title}>{fileNameToTitle(name)}</h1>
                    {
                        ingredients
                        ?
                        <>
                            <div className={S.ingredients}>
                                <ul>
                                    {
                                        ingredients.map(({ name, amount, unit }, idx) => (
                                            <li key={`${idx} ${name}`}>{`${amount} ${unit} ${name}`}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <div className={S.instructions}>
                                <ol>
                                    {
                                        instructions.map((step, idx) => (
                                            <li key={`${idx} ${step}`}>{step}</li>
                                        ))
                                    }
                                </ol>
                            </div>
                        </>
                        :
                        <h1>WAITTTTTTT</h1>
                    }
                </>
            }
        </div>
    )
}