import React, { useEffect, useState } from 'react';
import CategoryForm from '../forms/CategoryForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { SubmitHandler } from 'react-hook-form';
import { ICategory } from '../../models/ICategory';
import { addCategory, deleteCategories, fetchManagementCategories } from '../../store/modules/Category/categoryActions';
import '../../styles/CategoryForm.scss';
import NavPanel from "../common/NavPanel";
const CategoryManagement = () => {
    const {categories, isLoading} = useAppSelector(state => state.categoryManagementReducer);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(fetchManagementCategories());
    }, []);


    const handleAddCategory : SubmitHandler<ICategory> = (newCategory) => {
        dispatch(addCategory(newCategory));
    };

    const handleDeleteSelectedCategories = () => {
        dispatch(deleteCategories(selectedRows));
    };

    const handleSelectedRowsChange = (updatedSelectedRows: GridRowSelectionModel) =>{
        setSelectedRows(updatedSelectedRows as number[]);
    };

    const columns : GridColDef[] = [
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