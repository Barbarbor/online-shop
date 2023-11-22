import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductForm from '../forms/ProductForm';
import { fetchAllProducts, addProduct, deleteProduct, deleteProducts } from '../../store/modules/Product/actions';
import {deleteCategories, fetchCategories} from '../../store/modules/Category/actions';
import { fetchAllSubcategories,fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/actions';
import {DataGrid} from "@mui/x-data-grid";
import {Container} from "@mui/material";
import NavPanel from '../common/NavPanel';
import '../../styles/ProductForm.scss';
const ProductManagement = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.productManagement.products);
    const loading = useSelector((state) => state.productManagement.loading);
    const categories = useSelector((state) => state.categoryManagement.categories);
    const subcategories = useSelector((state) => state.subcategoryManagement.subcategories );
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    useEffect(() => {
        dispatch(fetchAllProducts());
        dispatch(fetchCategories());
    }, [dispatch]);
    const handleAddProduct = (newProduct) => {
        dispatch(addProduct(newProduct));
    };
    const handleSelectCategory = (categoryId) =>{
        setSelectedCategory(categoryId);
        dispatch(fetchSubcategoriesOfCategory(categoryId));
    }

    const handleDeleteSelectedProducts = () => {
        dispatch(deleteProducts(selectedRows));
    };
    const handleSelectedRowsChange = (updatedSelectedRows) =>{
        setSelectedRows(updatedSelectedRows);
    };

    const columns = [
        {field:'id',headerName:'Id', width:90, type:'number'},
        {field:'name',headerName:'Name', width:200},
        {field:'photography_url', headerName: "Photo URL", width:200},
        {field:'price', headerName: "Price", width:90, type:"number"},
        {field: "CategoryId", headerName: "Category Id", width:90, type:"number"},
        {field: "SubcategoryId", headerName: "Subcategory Id", width:90, type: "number"},
        {field:'createdAt',headerName:'Creation Date',width:200},
        {field:'updatedAt',headerName:'Updated Date',width:200}
    ]

    return (

        <div className="product-management">
            <NavPanel/>
            <ProductForm onSubmit={handleAddProduct} categories={categories} subcategories={subcategories} onSelectedCategory={handleSelectCategory}  />
            <div className='product-management-table'>
            <button
                className='product-management-delete-products'
                onClick={handleDeleteSelectedProducts}
                hidden={selectedRows.length === 0 ? (true): false}
            >
                Delete selected</button>
                <DataGrid
                    columns={columns}
                    rows={products}
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

export default ProductManagement;