import React, { useEffect, useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteCategories, fetchCategories, fetchManagementCategories } from "../../store/modules/Category/categoryActions";
import {
    addSubcategory,
    deleteSubcategories,
    deleteSubcategory,
    fetchManagementSubcategories
} from "../../store/modules/Subcategory/subcategoryActions";
import { ISubcategory } from "../../models/ISubcategory";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import SubcategoryForm from "../forms/SubcategoryForm";
import '../../styles/SubcategoryForm.scss';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Link} from "react-router-dom";

const SubcategoryManagement = () => {
    const {categories, isLoading: isCategoriesLoading} = useAppSelector(state => state.categoryManagementReducer);
    const {subcategories, isLoading: isSubcategoriesLoading } = useAppSelector(state => state.subcategoryManagementReducer);
    
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchManagementSubcategories());
        dispatch(fetchManagementCategories());
    }, []);

    const handleAddSubcategory = (newSubcategory : ISubcategory) => {
        dispatch(addSubcategory(newSubcategory))
    }

    const handleDeleteSelectedSubcategories = () => {
        dispatch(deleteSubcategories(selectedRows));
    }

    const handleSelectedRowsChange = (updatedSelectedRows : GridRowSelectionModel) => {
        setSelectedRows(updatedSelectedRows as number[]);
    }
    const showTable = useCallback( () =>{
        return(
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
        )
    },[subcategories] )
    const columns : GridColDef[] = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'name',headerName:'Name', width:200},
        {field:"CategoryId", headerName:"Category Id",width:100,type:'number'},

    ]

    return (
        <div className="subcategory-management">
            <Link to='/admin' style={{display:'flex',flexDirection:'column',textDecoration:'none', marginRight:'30px'}} >
                <ArrowBackIcon/>
                Dashboard
            </Link>
            <SubcategoryForm onSubmit={handleAddSubcategory} categories={categories} />
            <div className='subcategory-management-table'>
            <button
                className='subcategory-management-delete-subcategories'
                onClick={handleDeleteSelectedSubcategories}
                hidden={selectedRows.length === 0 ? (true): false}
            > Delete selected </button>

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
        </div>
    );

}
export default SubcategoryManagement;