import React, { useState, createContext, useEffect, useCallback } from 'react';

export const UserContext = createContext();

export default function UserContextGiver({ children }){

    const [currentUser, setCurrentUser] = useState();

    const keepAndSetUsername = useCallback((username) => {
        if(username){
            localStorage.currentUser = username;
        } else {
            localStorage.removeItem('currentUser');
        }
        setCurrentUser(username);

    }, [setCurrentUser]);

    const context = {
        logout(){
            keepAndSetUsername();
        },
        login: keepAndSetUsername,
        get currentUser(){
            return currentUser;
        }
    };

    useEffect(() => {
        const currentUsername = localStorage.currentUser;

        if(currentUsername){
            keepAndSetUsername(currentUsername);
        }
    }, [keepAndSetUsername]);

    return (
        <UserContext.Provider value={context}>
            {children}
        </UserContext.Provider>
    );
}