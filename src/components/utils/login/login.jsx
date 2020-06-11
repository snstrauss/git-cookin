import React, { useEffect } from 'react';
import S from './login.module.scss';

export default function Login({ setUser }){
    return (
        <div className={S.container}>
            <form onSubmit={((ev) => setUser(ev.target.elements.username.value))}>
                <input name="username" type="text" placeholder="username..?" />
                <input type="submit" value="Go"/>
            </form>
        </div>
    )
}