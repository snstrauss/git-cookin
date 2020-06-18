import React, { useEffect, useContext, useState } from 'react';
import S from './recipe-list-item.module.scss';
import { fileNameToTitle } from '../../../../services/utils.service';
import { UserContext } from '../../../../contexts/userContext/userContext';
import { getDataUrlFromImageUrl } from '../../../../services/github.service';

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