import React, {useState,useEffect, FC} from 'react';
import { useAppDispatch } from '../../hooks/redux';

import {useNavigate} from "react-router-dom";
import '../../styles/RegisterForm.scss';
import {Box, Modal,Paper} from '@mui/material';

import {IUserRegister} from "../../models/IUser";
import {userLogin} from "../../store/modules/User/userActions";
import RegisterForm from "../forms/RegisterForm";
const Register : FC = () => {
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);

    const handleShowModal = () =>{
        setShowModal(!showModal);
    }
    return(
        <div>
        <button onClick={handleShowModal}>Register</button>
        <Modal
            open={showModal}
            onClose={handleShowModal}
        >
            <Box>
                <Paper className='register-panel'>
                <RegisterForm/>
            </Paper>
            </Box>
        </Modal>
</div>
    )
}
export default Register;