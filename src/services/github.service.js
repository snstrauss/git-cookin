"https://api.github.com/repos/snstrauss/git-cookin-db/contents/recipes"

const BASE_URL = "https://api.github.com";

const headers = new Headers();
headers.append("Accept", "application/vnd.github.v3+json");
headers.append("Authorization", `token ${process.env.REACT_APP_GITHUB_TOKEN}`);

function buildRequestUrl({ owner = 'snstrauss', repository = 'git-cookin-db', path = '' }){

    return `${BASE_URL}/repos/${owner}/${repository}/contents/recipes/${path}`;
}

function getFilesContent(requestParams){
    return fetch(buildRequestUrl(requestParams), {
        headers
    }).then((response) => response.json());
}

export function addFileToRepository(requestParams){

    const user = requestParams.path.match(/.+?(?=\/)/)[0];
    const content = btoa(JSON.stringify(requestParams.data));

    const body = JSON.stringify({
        message: `user ${user} added recipe at ${requestParams.path}`,
        committer: {
            name: 'snstrauss',
            email: 'zahavi.guy.85@gmail.com'
        },
        content
    });

    return fetch(buildRequestUrl(requestParams), {
        method: 'PUT',
        headers,
        body
    }).then(res => res.json())
    .then(response => {
        return response;
    });
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
    getRecipesList,
    getRecipeData,
    addFileToRepository
}