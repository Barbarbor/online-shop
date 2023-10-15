// UserManagement.js
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // You'll need Axios for making HTTP requests
import UserForm from '../forms/UserForm';
import {HOST} from "../../constants";
const UserManagement = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${HOST}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const addUser = async (userData) => {
        try {
            const response = await axios.post(`${HOST}/api/users`, userData);
            setUsers([...users, response.data]);
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };


    return (
        <div className="user-management">
            <h1>User Management</h1>
            {/* Render the UserForm component */}
            <UserForm addUser={addUser} />
            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        {user.username} - {user.email}

                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserManagement;