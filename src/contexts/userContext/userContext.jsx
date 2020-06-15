import React, { useState, createContext, useEffect, useContext, useCallback } from 'react';
import { LayoutContext } from '../../components/main/layout/layout';

export const UserContext = createContext();

export default function UserContextGiver({ children }){

    const [currentUser, setCurrentUser] = useState();

    const context = {
        logout(){
            keepAndSetUsername();
        },
        login(username){
            keepAndSetUsername(username);
        },
        get currentUser(){
            return currentUser;
        }
    };

    const keepAndSetUsername = useCallback((username) => {
        if(username){
            localStorage.currentUser = username;
        } else {
            localStorage.removeItem('currentUser');
        }
        setCurrentUser(username);

    }, [setCurrentUser]);

    useEffect(() => {
        const currentUsername = localStorage.currentUser;

        if(currentUsername){
            context.login(currentUsername);
        }
    }, [keepAndSetUsername]);

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}