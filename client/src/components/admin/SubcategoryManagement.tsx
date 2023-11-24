import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
import { deleteCategories, fetchCategories, fetchManagementCategories } from "../../store/modules/Category/categoryActions";
import { addSubcategory, deleteSubcategory, fetchManagementSubcategories } from "../../store/modules/Subcategory/subcategoryActions";
import { ISubcategory } from "../../models/ISubcategory";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import SubcategoryForm from "../forms/SubcategoryForm";


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
        dispatch(deleteCategories(selectedRows));
    }

    const handleSelectedRowsChange = (udpatedSelectedRows : GridRowSelectionModel) => {
        setSelectedRows(udpatedSelectedRows as number[]);
    }

    const columns : GridColDef[] = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'name',headerName:'Name', width:200},
        {field:"CategoryId", headerName:"Category Id",width:90,type:'number'},
        {field:'createdAt',headerName:'Creation Date',width:200},
        {field:'updatedAt',headerName:'Updated Date',width:200}
    ]

    return (
        <div className="subcategory-management">
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