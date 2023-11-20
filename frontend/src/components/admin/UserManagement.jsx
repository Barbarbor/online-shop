import React, { useEffect,useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser,deleteUsers, fetchUsers } from '../../store/modules/User/actions';
import UserForm from '../forms/UserForm';
import {HOST} from "../../constants";
import {DataGrid} from "@mui/x-data-grid";

const UserManagement = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.userManagement.users);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId));
    };
    const handleSelectedRowsChange = (updatedSelectedRows) =>{
        setSelectedRows(updatedSelectedRows);
    };
    const handleDeleteSelectedUsers = () => {
        dispatch(deleteUsers(selectedRows));
    };
    const columns = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'username',headerName:'Username', width:200},
        {field:'email', headerName: 'Email', width:200},
        {field:'createdAt',headerName:'Creation Date',width:200},
        {field:'updatedAt',headerName:'Updated Date',width:200}

    ]
    return (
        <div className="user-management">
            <h1>User Management</h1>
            <UserForm addUser={(userData) => dispatch(addUser(userData))} />
            <button onClick={handleDeleteSelectedUsers}>Delete selected users</button>
            <DataGrid
                columns={columns}
                rows={users}
                checkboxSelection
                disableRowSelectionOnClick
                pageSizeOptions={[5]}
                rowSelectionModel={selectedRows}  // Add this line
                onRowSelectionModelChange={(updatedSelectedRows) => handleSelectedRowsChange(updatedSelectedRows)}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}

            />

        </div>
    );
};

export default UserManagement;