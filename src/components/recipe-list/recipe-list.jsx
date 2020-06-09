import React from 'react';
import useRecipeList from '../../hooks/useRecipeList';
import S from './recipe-list.module.scss';
import { fileNameToTitle } from '../../services/utils.service';
import { Link } from 'gatsby';

export default function RecipeList(){

    const recipeList = useRecipeList();

    return (
        <div className={S.container}>
            {
                recipeList
                ?
                recipeList.map(({ name }, idx) => (
                    <Link to={`/recipe?${name}`} key={`${idx}. ${name}`}>
                        <h3 className={S.item}>
                            {fileNameToTitle(name)}
                        </h3>
                    </Link>
                ))
                :
                <h1>WAITT!~!</h1>
            }
        </div>
    )
}