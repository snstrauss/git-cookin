import React, { useEffect } from 'react';
import S from './login.module.scss';

export default function Login({ setUser }){

    useEffect(() => {
        const currentUsername = localStorage.currentUser;

        if(currentUsername){
            submitUsername(currentUsername);
        }

    }, []);

    function submitUsername(username){
        localStorage.currentUser = username;
        setUser(username);
    }

    return (
        <div className={S.container}>
            <h2>Who are you?</h2>
            <form onSubmit={((ev) => submitUsername(ev.target.elements.username.value))}>
                <input name="username" type="text" placeholder="username..?" />
                <input type="submit" value="Go"/>
            </form>
        </div>
    )
}