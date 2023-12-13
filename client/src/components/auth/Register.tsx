import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';

import {useNavigate} from "react-router-dom";
import '../../styles/RegisterForm.scss';
import {Box, Modal,Paper} from '@mui/material';
import Login from './Login';
import {IUserRegister} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";
import RegisterForm from "../forms/RegisterForm";
interface RegisterProps{
    defaultShowModalState: boolean;
}
const Register : FC<RegisterProps> = ({defaultShowModalState = false}) => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(defaultShowModalState);
    const [showLoginModal, setShowLoginModal] = useState<boolean> (false);
    const handleShowModal = () =>{
        setShowModal(!showModal);
    }
    const handleShowLoginModal = () => {
        setShowLoginModal(!showLoginModal);
        setShowModal(!showModal);
    }
    if(showModal && showLoginModal){
        setShowLoginModal(false);
    }
    if(showLoginModal){
        return(
            <Login defaultShowModalState={true}/>
        )
    }
    if(!showModal){
        return(
            <Login defaultShowModalState={false}/>
        )
    }
    return(
        <div>

        <Modal
            open={showModal}
            onClose={handleShowModal}
        >
            <Box>
                <Paper className='register-panel'>
                    <h2 style={{position:'absolute',right:'36%',top:'5%'}}>Register</h2>
                <RegisterForm/>
                 <span style={{bottom:'-27%',position:'relative',left:'20%'}}> Already have an account? <span className='register-panel-to-login' onClick={handleShowLoginModal}> Login </span> </span>
                </Paper>
            </Box>
        </Modal>

</div>
    )
}
export default Register;