import { useState, useEffect } from 'react';
import { getFilesContent } from '../services/github.service';

export default function useGithubContent(path, cb){

    const [content, setContent] = useState();

    useEffect(() => {
        getFilesContent({
            path: `recipes/${path}`
        }).then((response) => {
            setContent(cb(response));
        });
    }, [path, cb]);

    return content;
}