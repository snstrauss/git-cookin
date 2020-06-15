import React, { createContext, useState } from 'react';
import S from './layout.module.scss';
import Header from '../../partials/header/header';

export const LayoutContext = createContext();

export default function Layout({ children }){

    const [headerTitle, setHeaderTitle] = useState("git cookin'!");
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const context = {
        setHeaderTitle,
        setIsLoggedIn
    }

    debugger;

    return (
        <div className={S.container}>
            <LayoutContext.Provider value={context}>
                <Header title={headerTitle} isLoggedIn={isLoggedIn}/>
                <main>
                    {children}
                </main>
                <footer></footer>
            </LayoutContext.Provider>
        </div>
    )
}