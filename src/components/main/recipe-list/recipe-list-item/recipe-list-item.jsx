import React, { useEffect, useContext, useState } from 'react';
import S from './recipe-list-item.module.scss';
import { fileNameToTitle } from '../../../../services/utils.service';
import { UserContext } from '../../../../contexts/userContext/userContext';

function buildImageUrl(currentUser, name){
    return `https://raw.githubusercontent.com/snstrauss/git-cookin-db/master/images/${currentUser}/${fileNameToTitle(name).toLowerCase()}.jpg`;
}

function getDataUrlFromImageUrl(currentUser, name){
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

export default function RecipeListItem({ name, selectRecipe }){

    const [imageData, setImageData] = useState();
    const [doneLookingForImage, setDoneLooking] = useState(false);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        getDataUrlFromImageUrl(currentUser, name)
        .then(imageDataUrl => {
            setImageData(imageDataUrl);
        }).catch((_) => {})
        .finally(() => {
            setDoneLooking(true);
        })

    }, [currentUser, name]);


    const backgroundStyle = imageData ? {
        backgroundImage: `url(${imageData})`,
        color: 'white'
    } : {};

    return (
        <>
            {
                doneLookingForImage &&
                <div className={S.container} style={backgroundStyle} onClick={() => selectRecipe(name)}>
                    <h2 className={S.item}>
                        {fileNameToTitle(name)}
                    </h2>
                </div>
            }
        </>
    )
}