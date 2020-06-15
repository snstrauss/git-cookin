import React, { useContext } from 'react';
import S from './login.module.scss';
import { UserContext } from '../../../contexts/userContext/userContext';

export default function Login(){

    const { login } = useContext(UserContext);

    return (
        <div className={S.container}>
            <form onSubmit={((ev) => login(ev.target.elements.username.value))}>
                <input name="username" type="text" placeholder="username..?" />
                <input type="submit" value="Go"/>
            </form>
        </div>
    )
}