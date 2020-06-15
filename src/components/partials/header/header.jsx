import React, { useContext } from 'react';
import S from './header.module.scss';
import Logout from '../login/logout';
import { UserContext } from '../../../contexts/userContext/userContext';

export default function Header({ title = "git cookin'!" }){

    const { currentUser } = useContext(UserContext);

    return (
        <header className={S.container}>
            {
                currentUser &&
                <Logout/>
            }
            <h2>{title}</h2>
        </header>
    )
}