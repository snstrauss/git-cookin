
import useGithubContent from './useGithubContent';

function mapRecipeList(recipes){
    return recipes.map(({ name, download_url }) => ({
        url: download_url,
        name
    }));
}

export default function useRecipesList(){

    const recipesList = useGithubContent('', mapRecipeList);

    return recipesList;
}