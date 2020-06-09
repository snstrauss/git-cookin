import useGithubContent from './useGithubContent';

function parseFileContent(fileData){
    return JSON.parse(atob(fileData.content));
}

export default function useRecipeData(path){

    const fileContent = useGithubContent(path, parseFileContent);

    return fileContent || {};
}