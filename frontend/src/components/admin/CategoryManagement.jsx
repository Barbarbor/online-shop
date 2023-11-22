import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CategoryForm from '../forms/CategoryForm';
import { fetchCategories, addCategory, deleteCategory, deleteCategories } from '../../store/modules/Category/actions';
import {DataGrid} from "@mui/x-data-grid";
import NavPanel from "../common/NavPanel";
import {Container} from "@mui/material";
import '../../styles/CategoryForm.scss';
const CategoryManagement = () => {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categoryManagement.categories);
    const loading = useSelector((state) => state.categoryManagement.loading);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddCategory = (newCategory) => {
        dispatch(addCategory(newCategory));
    };

    const handleDeleteCategory = (categoryId) => {
        dispatch(deleteCategory(categoryId));
    };
    const handleDeleteSelectedCategories = () => {

       dispatch(deleteCategories(selectedRows));
    };
    const handleSelectedRowsChange = (updatedSelectedRows) =>{
        setSelectedRows(updatedSelectedRows);
    };

    const columns = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'name',headerName:'Name', width:200},
        {field:'createdAt',headerName:'Creation Date',width:200},
        {field:'updatedAt',headerName:'Updated Date',width:200}

    ]

    return (
        <div className="category-management" style={{marginTop:'100px',}}>
            <NavPanel/>
            <CategoryForm onSubmit={handleAddCategory} />
            <div className='category-management-table'>
            <button
                className='category-management-delete-categories'
                onClick={handleDeleteSelectedCategories}
                hidden={selectedRows.length === 0 ? (true): false}
            >
                Delete Categories
            </button>

                <DataGrid
                          columns={columns}
                          rows={categories}
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
        </div>
    );
};

export default CategoryManagement;