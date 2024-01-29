import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';
import {useUser} from "../../hooks/useUser";
import {userLogout} from "../../store/modules/User/userActions";

const Logout : FC = () => {
    const {currentUser, logoutUser} = useUser();
    const handleLogout =  () =>{
        logoutUser();

    }
    return(
        <div>
            <button style={{width:'80px',height:'67px',cursor:'pointer', position:"absolute", marginTop:'-30px', marginLeft:'-38px',background:'transparent',border:"none"}} onClick={handleLogout}></button>

        </div>
    )
}
export default Logout;