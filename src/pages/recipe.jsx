import React from 'react';
import S from '../pages-styles/recipe.module.scss';
import useRecipeData from '../hooks/useRecipeData';
import { fileNameToTitle } from '../services/utils.service';


export default function Recipe({ location: { search } }){

    const name = search.replace('?', '');

    const { ingredients, instructions } = useRecipeData(name);

    return (
        <div className={S.container}>
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
        </div>
    )
}