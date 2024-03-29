import { MouseEvent, useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCategories } from '../../store/modules/Category/categoryActions';
import { fetchSubcategoriesOfCategory } from '../../store/modules/Subcategory/subcategoryActions';

import {Drawer, List, ListItem, ListItemText} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SubcategoriesDropdown from './SubcategoriesDropdown';
import useMediaQuery from "@mui/material/useMediaQuery";

const CategoriesDropdown = () => {
    const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
    const [showDrawer, setShowDrawer] = useState<boolean>(false);
    const [anchorEl,setAnchorEl] = useState<HTMLElement | null>(null);
    const {categories} = useAppSelector(state => state.categoryReducer)
    const {subcategories} = useAppSelector(state => state.subcategoryReducer)
    const dispatch = useAppDispatch();
    const isSmallMobile = useMediaQuery('(max-width:400px)');
    let iconSize;
    let marginTop;
    if(isSmallMobile){
        iconSize=22;
        marginTop= -0.6;
    }
    else{
        iconSize=24;
        marginTop = -0.2;
    }
    useEffect(() => {

            dispatch(fetchCategories());

    }, [])

    const handleCategoryClick = (e: MouseEvent<HTMLElement>, categoryId: number) => {
        if (selectedCategoryId === categoryId) {
            setSelectedCategoryId(null);
        } else {
            setAnchorEl(e.currentTarget);
            setSelectedCategoryId(categoryId);
            dispatch(fetchSubcategoriesOfCategory(categoryId));
        }
    }

    const handleToggleDrawer = () =>{
        setShowDrawer(!showDrawer);
    };

    return (
        <div>
            <MenuIcon
                onClick={handleToggleDrawer}
                sx={{fontSize:iconSize,marginTop:marginTop}}
            />

            <Drawer
                anchor="left"
                open={showDrawer}
                onClose={handleToggleDrawer}
                className="categories-drawer"
                elevation={16}
            >
                <List className="categories-list">
                    {categories.map((category) => (
                        <ListItem
                            key={category.id}
                            className="categories-list-item"
                            onClick={(e: MouseEvent<HTMLElement>) => handleCategoryClick(e, category.id)}
                        >
                            <ListItemText
                                className="categories-list-item-text"
                                sx={{ color: selectedCategoryId === category.id ? 'blue' : 'inherit' }}
                            >
                                {category.name}
                            </ListItemText>
                            
                            <SubcategoriesDropdown categoryId={category.id} isOpen={selectedCategoryId === category.id} anchorEl={anchorEl}   />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default CategoriesDropdown;