export function capitalize(str){
    return str[0].toUpperCase() + str.slice(-str.length + 1);
}

const FILE_NAME_SUFFIX = '.json';
export function fileNameToTitle(fileName){
    return capitalize(fileName.replace(FILE_NAME_SUFFIX, ''))
}

export default {
    capitalize,
    fileNameToTitle
}