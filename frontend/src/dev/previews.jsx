import React from 'react'
import {ComponentPreview, Previews} from '@react-buddy/ide-toolbox'
import {PaletteTree} from './palette'
import ProductManagement from "../components/admin/ProductManagement";
import CategoryManagement from "../components/admin/CategoryManagement";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ProductManagement">
                <ProductManagement/>
            </ComponentPreview>
            <ComponentPreview path="/CategoryManagement">
                <CategoryManagement/>
            </ComponentPreview>
        </Previews>
    )
}

export default ComponentPreviews