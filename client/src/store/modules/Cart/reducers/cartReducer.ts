import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ICart } from "../../../types/Cart";
import { IProduct } from "../../../../models/IProduct";
import { ICartItem } from "../../../../models/ICartItem";

const initialState : ICart = {
    cartitems: [],
    products: [],
    total: 0,
    isLoading: false,
    error: ''
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        cartItemsAction(state) {
            state.isLoading = true;
            state.error = '';
        },
        cartItemsActionSuccess(state, action: PayloadAction<{cartItems: ICartItem[]; products: IProduct[]}>) {
            const {cartItems, products} = action.payload;
            state.cartitems = cartItems;
            state.products = products;
            state.isLoading = false;
            state.error = '';
            state.total = cartItems.reduce((total, cartItem) => {
                // Находим соответствующий продукт
                const product = products.find((p) => p.id === cartItem.ProductId);

                // Если продукт найден, умножаем его цену на количество в корзине
                if (product) {
                    total += product.price * cartItem.quantity;
                }

                return total;
            }, 0);
        },
        addToCartSuccess(state, action: PayloadAction<{ cartItem: ICartItem; product: IProduct }>) {
            const { cartItem, product } = action.payload;
            state.cartitems.push(cartItem);
            state.total += product.price;
            state.products.push(product);
            state.isLoading = false;
            state.error = '';
        },
        updateQuantity(state, action: PayloadAction<ICartItem>) {
            console.log("We are here)");
            const itemIndex = state.cartitems.findIndex(item => item.id == action.payload.id);
            state.cartitems[itemIndex].quantity = action.payload.quantity;

            state.total = state.cartitems.reduce((total, cartItem) => {
                const product = state.products.find(p => p.id === cartItem.ProductId);
                if (product) {
                    total += product.price * cartItem.quantity
                }
                return total;
            }, 0);
        },
        removeFromCartSuccess(state, action: PayloadAction<{ cartitemId: number; productId: number }>) {
            const { cartitemId, productId } = action.payload;
            state.cartitems = state.cartitems.filter(item => item.id !== cartitemId);
            const removedProduct = state.products.find(product => product.id === productId);
            state.products = state.products.filter(product => product.id !== productId);
            if (removedProduct) {
                state.total -= removedProduct.price;
            }
            state.isLoading = false;
            state.error = null;
        },
        cartActionError(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export default cartSlice.reducer;