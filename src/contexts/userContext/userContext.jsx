import React, { useState, createContext, useEffect } from 'react';
import Logout from '../../components/partials/login/logout';
import Login from '../../components/partials/login/login';

export const UserContext = createContext();

export default function UserContextGiver({ children }){

    const [currentUser, setCurrentUser] = useState();

    const context = {
        logout(){
            keepAndSetUsername();
        },
        getCurrentUser(){
            return currentUser
        }
    };

    useEffect(() => {
        const currentUsername = localStorage.currentUser;

        if(currentUsername){
            keepAndSetUsername(currentUsername);
        }
    }, []);

    function keepAndSetUsername(username){
        if(username){
            localStorage.currentUser = username;
        } else {
            localStorage.removeItem('currentUser');
        }
        setCurrentUser(username);
    }

    return (
        <UserContext.Provider value={context}>
            {
                currentUser
                ?
                <>
                    {children}
                    <Logout/>
                </>
                :
                <Login setUser={keepAndSetUsername}/>
            }
        </UserContext.Provider>
    );
}