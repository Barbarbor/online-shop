import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, fetchUsers } from '../../store/modules/User/actions';
import UserForm from '../forms/UserForm';
import {HOST} from "../../constants";
import { Button, ListGroup } from 'react-bootstrap'; // Import Bootstrap components as needed

const UserManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userManagement.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };

    return (
        <div className="user-management">
            <h1>User Management</h1>
            <UserForm addUser={(userData) => dispatch(addUser(userData))} />

            <ListGroup>
                {users.map((user) => (
                    <ListGroup.Item key={user.id}>
                        {user.username} - {user.email}
                        <Button
                            variant="danger"
                            onClick={() => handleDeleteUser(user.id)}
                        >
                            Delete
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default UserManagement;