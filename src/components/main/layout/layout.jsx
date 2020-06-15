import React, { createContext, useState, useContext } from 'react';
import S from './layout.module.scss';
import Header from '../../partials/header/header';
import { UserContext } from '../../../contexts/userContext/userContext';
import Login from '../../partials/login/login';

export const LayoutContext = createContext();

export default function Layout({ children }){

    const [headerTitle, setHeaderTitle] = useState();

    const context = {
        setHeaderTitle
    };

    const { currentUser } = useContext(UserContext);

    return (
        <div className={S.container}>
            <LayoutContext.Provider value={context}>
                <Header title={headerTitle}/>
                <main>
                    {
                        currentUser
                        ?
                        children
                        :
                        <Login/>
                    }
                </main>
                <footer></footer>
            </LayoutContext.Provider>
        </div>
    )
}