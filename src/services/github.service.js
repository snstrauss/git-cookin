"https://api.github.com/repos/snstrauss/git-cookin-db/contents/recipes"

const BASE_URL = "https://api.github.com";
const AUTH_TOKEN = "b9ef1a4569faf4b62a685f2020a83cb4fcb59b22";

const headers = new Headers();
headers.append("Accept", "application/vnd.github.v3+json");
headers.append("Authorization", `token ${AUTH_TOKEN}`);

export function getFilesContent({ owner = 'snstrauss', repository = 'git-cookin-db', path = '' }){
    return fetch(`${BASE_URL}/repos/${owner}/${repository}/contents/${path}`, {
        headers
    }).then((response) => response.json());
}

export default {
    getFilesContent
}