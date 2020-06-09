"https://api.github.com/repos/snstrauss/git-cookin-db/contents/recipes"

const BASE_URL = "https://api.github.com";

const headers = new Headers();
headers.append("Accept", "application/vnd.github.v3+json");
headers.append("Authorization", `token ${process.env.REACT_APP_GITHUB_TOKEN}`);

export function getFilesContent({ owner = 'snstrauss', repository = 'git-cookin-db', path = '' }){
    return fetch(`${BASE_URL}/repos/${owner}/${repository}/contents/recipes/${path}`, {
        headers
    }).then((response) => response.json());
}


export function getRecipesList(){

    return getFilesContent({
        path: '',
    }).then(mapRecipeList);
}

export function getRecipeData(path){
    return getFilesContent({
        path
    }).then(parseFileContent);
}

function mapRecipeList(recipes){
    return recipes.map(({ name, download_url }) => ({
        url: download_url,
        name
    }));
}

function parseFileContent(fileData){
    return JSON.parse(atob(fileData.content));
}

export default {
    getFilesContent
}