import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import ProductForm from '../forms/ProductForm';

import { RootState } from '../../store/store';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { addProduct, deleteProducts, fetchAllMangementProducts } from '../../store/modules/Product/productActions';
import { fetchCategories, fetchManagementCategories } from '../../store/modules/Category/categoryActions';
import { fetchManagementSubcategories, fetchSubcategories, fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/subcategoryActions';
import { IProduct } from '../../models/IProduct';
import NavPanel from "../common/NavPanel";
import '../../styles/ProductForm.scss';

interface ProductManagementProps {}

const ProductManagement: React.FC<ProductManagementProps> = () => {
    const {products, isLoading, error} = useAppSelector(state => state.productManagementReducer);
    const {categories} = useAppSelector (state => state.categoryManagementReducer);
    const {subcategories} = useAppSelector (state => state.subcategoryManagementReducer);
    const [selectedRows, setSelectedRows] = useState<number[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(0);
    
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllMangementProducts());
        dispatch(fetchManagementCategories());
    }, [dispatch]);

    const handleAddProduct = (newProduct: IProduct) => {
        dispatch(addProduct(newProduct));
    };

    const handleDeleteSelectedProducts = () => {
        dispatch(deleteProducts(selectedRows));
    };

    const handleSelectedRowsChange = (updatedSelectedRows: GridRowSelectionModel) => {
        setSelectedRows(updatedSelectedRows as number[]);
    };

    const handleSelectCategory = async (categoryId: number) => {
        setSelectedCategory(categoryId);
      
        // Fetch subcategories here, if needed
        dispatch(fetchSubcategoriesOfCategory(categoryId));
      }

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'Id', width: 90, type: 'number' },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'photography_url', headerName: "Photo URL", width: 200 },
        { field: 'price', headerName: "Price", width: 90, type: "number" },
        { field: "CategoryId", headerName: "Category Id", width: 90, type: "number" },
        { field: "SubcategoryId", headerName: "Subcategory Id", width: 90, type: "number" },
        { field: 'createdAt', headerName: 'Creation Date', width: 200 }

    ];

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
                                pageSize: 9,
                            },
                        },
                    }}

                />
            </div>

        </div>
    );
};

export default ProductManagement;