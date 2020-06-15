import React, { useContext } from 'react';
import S from './logout.module.scss'
import Iconify from '../iconify/iconify';
import { UserContext } from '../../../contexts/userContext/userContext';
import { LayoutContext } from '../../main/layout/layout';

export default function Logout(){

    const { logout } = useContext(UserContext);
    const { setHeaderTitle } = useContext(LayoutContext);

    function doLogout(){
        setHeaderTitle();
        logout();
    }

    return (
        <button className={S.container} onClick={doLogout}>
            <Iconify icon="ic-round-log-out" style={{transform: 'rotate(0.5turn)'}}/>
        </button>
    )
}