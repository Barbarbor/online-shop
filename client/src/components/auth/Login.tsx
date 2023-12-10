import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';

import {useNavigate} from "react-router-dom";
import '../../styles/LoginForm.scss';
import {Box, Modal,Paper} from '@mui/material';

import {IUserLogin} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";
import LoginForm from "../forms/LoginForm";
const Login : FC = () => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () =>{
        setShowModal(!showModal);
    }
    return(
        <div>
        <button onClick={handleShowModal}>Login</button>
        <Modal
            open={showModal}
            onClose={handleShowModal}
        >
        <Box>
        <Paper className='login-panel' >
                <h6> Login</h6>
            <LoginForm/>
        </Paper>
        </Box>
        </Modal>
        </div>
    )
}
export default Login;