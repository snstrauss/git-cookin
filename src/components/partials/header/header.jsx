import React from 'react';
import S from './header.module.scss';
import Logout from '../login/logout';

export default function Header({ title, isLoggedIn }){

    debugger;

    return (
        <header className={S.container}>
            {
                isLoggedIn &&
                <Logout/>
            }
            <h2>{title}</h2>
        </header>
    )
}