import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';

import {useNavigate} from "react-router-dom";
import '../../styles/LoginForm.scss';
import {Box, Modal,Paper} from '@mui/material';
import {IUserLogin} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";
import LoginForm from "../forms/LoginForm";
import Register from "./Register";
import LoginIcon from "@mui/icons-material/Login";
interface  LoginProps {
    defaultShowModalState: boolean;
}
const Login : FC<LoginProps> = ({defaultShowModalState=false}) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(defaultShowModalState);
    const [showModalRegister, setShowModalRegister] = useState <boolean>(false);
    const handleShowModal = () =>{
        setShowModal(!showModal);
    }
    const handleShowModalRegister = () => {
        setShowModalRegister(!showModalRegister);
        setShowModal(!showModal);
    }
    if(showModal && showModalRegister){
        setShowModalRegister(false);
    }
    if(showModalRegister){
        return(
            <Register defaultShowModalState={true}/>
        )
    }

    return(
        <div >

        <button className='button-login' style={{width:'80px',height:'67px',cursor:'pointer', position:"absolute", marginTop:'-30px', marginLeft:'-38px'}} onClick={handleShowModal}  ></button>

    <Modal
            open={showModal}
            onClose={handleShowModal}
        >
        <Box>
        <Paper className='login-panel' >
                <h2 style={{position:'absolute',right:'42%',top:'5%'}}> Login</h2>
            <LoginForm/>
           <span style={{bottom:'-27%',position:'relative',left:"5%", fontSize:'14px'}}> Don't have an account? <span className='login-panel-to-register' onClick={handleShowModalRegister}>Register </span> </span>
        </Paper>
        </Box>
        </Modal>


        </div>



    )
}
export default Login;