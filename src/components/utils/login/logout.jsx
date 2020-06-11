import React, { useContext } from 'react';
import S from './logout.module.scss'
import Iconify from '../iconify/iconify';
import { UserContext } from '../../../contexts/userContext/userContext';

export default function Logout(){

    const { logout } = useContext(UserContext);

    return (
        <div className={S.container} onClick={logout}>
            <Iconify icon="ic-round-log-out" style={{transform: 'rotate(0.5turn)'}}/>
        </div>
    )
}