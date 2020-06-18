"https://api.github.com/repos/snstrauss/git-cookin-db/contents/recipes"

import { fileNameToTitle } from "./utils.service";

const BASE_URL = "https://api.github.com";

const requestsCache = {};

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

export function getRecipesList(userName){
    return getFilesContent({
        path: userName,
    }).then(mapRecipeList);
}

export function getRecipeData(path){
    if(!requestsCache[path]){
        requestsCache[path] = getFilesContent({
            path
        }).then(parseFileContent);
    }

    return requestsCache[path];
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

function buildImageUrl(currentUser, name){
    return `https://raw.githubusercontent.com/snstrauss/git-cookin-db/master/images/${currentUser}/${fileNameToTitle(name).toLowerCase()}.jpg`;
}

export function getDataUrlFromImageUrl(currentUser, name){
    return fetch(buildImageUrl(currentUser, name))
    .then(res => {
        if(!res.ok){
            throw new Error('no image');
        }
        return res.blob();

    }).then(blobData => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (ev) => {
                resolve(ev.target.result)
            };
            reader.readAsDataURL(blobData);
        });
    }).catch(() => {});
}

export default {
    getRecipesList,
    getRecipeData,
    getDataUrlFromImageUrl,
    addFileToRepository
}