import axios from "axios";
import { AppDispatch } from "../../store";
import { cartSlice } from "./reducers/cartReducer";
import { ICart } from "../../../models/ICart";
import { IProduct } from "../../../models/IProduct";
import { ICartItem } from "../../../models/ICartItem";
import { HOST } from "../../../constants";

export const fetchCartItems = (userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartItemsAction());
        const response = await axios.get<ICart>(`${HOST}/api/cartitems/${userId}`);
        const products = response.data.products;
        const cartItems = response.data.cartitems;
        dispatch(cartSlice.actions.cartItemsActionSuccess({ cartItems, products }));
    } catch (e: any) {
        dispatch(cartSlice.actions.cartActionError(e.message));
    }
};

export const addToCart = (product: IProduct, userId:number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartItemsAction());
        const response = await axios.post<ICartItem>(`${HOST}/api/cartitems`, {
            quantity: 1,
            ProductId: product.id,
            UserId: userId, // Replace with user authentication when available
        });
        const cartItem = response.data;
        dispatch(cartSlice.actions.addToCartSuccess({cartItem, product}));
    } catch (e : any) {
        dispatch(cartSlice.actions.cartActionError(e.message));
    }
}

export const removeFromCart = (cartItem: ICartItem, userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartItemsAction())
        const cartitemId = cartItem.id;
        const productId = cartItem.ProductId;
        await axios.delete(`${HOST}/api/cartitems/${userId}/${cartitemId}`);
        console.log(`CartItemid:${cartitemId}, productId:${productId}`)
        dispatch(cartSlice.actions.removeFromCartSuccess({cartitemId:cartitemId,productId:productId}));
    } catch(e: any){
        dispatch(cartSlice.actions.cartActionError(e.message));
    }
}

export const updateQuantity = (cartItem: ICartItem, newQuantity: number, userId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(cartSlice.actions.cartItemsAction());

        const response = await axios.put<ICartItem>(`${HOST}/api/cartitems/${userId}/${cartItem.id}`,{updatedQuantity:newQuantity});
        console.log(response.data);
        const updatedCartItem = response.data;
        dispatch(cartSlice.actions.updateQuantity(updatedCartItem));
    } catch (e : any) {
        dispatch(cartSlice.actions.cartActionError(e.message));
    }
}