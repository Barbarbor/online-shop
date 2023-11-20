import React, { useEffect,useState } from 'react';
import SubcategoryForm from '../forms/SubcategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import {DataGrid} from "@mui/x-data-grid";
import {
    fetchAllSubcategories,
    addSubcategory,
    deleteSubcategory,
    deleteSubcategories,
} from '../../store/modules/Subcategory/actions';
import {fetchCategories} from '../../store/modules/Category/actions';
const SubcategoryManagement = () => {
    const dispatch = useDispatch();
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const loading = useSelector((state) => state.subcategoryManagement.loading);
    const [selectedRows, setSelectedRows] = useState([]);
    useEffect(() => {
        dispatch(fetchAllSubcategories());
        dispatch(fetchCategories());
    }, [dispatch]);

    const handleAddSubcategory = (newSubcategory) => {
        dispatch(addSubcategory(newSubcategory));
    };

    const handleDeleteSubcategory = (subcategoryId) => {
        dispatch(deleteSubcategory(subcategoryId));
    };
    const handleDeleteSelectedSubCategories = () => {

        dispatch(deleteSubcategories(selectedRows));
    };
    const handleSelectedRowsChange = (updatedSelectedRows) =>{
        setSelectedRows(updatedSelectedRows);
    };
    const columns = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'name',headerName:'Name', width:200},
        {field:"CategoryId", headerName:"Category Id",width:90,type:'number'},
        {field:'createdAt',headerName:'Creation Date',width:200},
        {field:'updatedAt',headerName:'Updated Date',width:200}

    ]
    return (
        <div className="subcategory-management">
            <h1>Subcategory Management</h1>
            <SubcategoryForm onSubmit={handleAddSubcategory} categories={categories} />
            <button onClick={handleDeleteSelectedSubCategories}>Delete selected subcategories</button>

            <DataGrid
                columns={columns}
                rows={subcategories}
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

export default SubcategoryManagement;