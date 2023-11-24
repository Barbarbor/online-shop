import axios from "axios";
import { AppDispatch } from "../../store";
import { likeSlice } from "./reducers/likeReducer";
import { ILike } from "../../../models/ILike";
import { HOST } from "../../../constants";

export const likeProduct = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(likeSlice.actions.likeProductRequest());
        const response = await axios.post<ILike>(`${HOST}/api/likes`, {
            UserId: 1, // Replace with actual user ID once authentication is implemented
            ProductId:productId,
        });
        dispatch(likeSlice.actions.likeProductSuccess());
    } catch (e : any) {
        dispatch(likeSlice.actions.likeProductFailure(e.message));
    }
}

export const unlikeProduct = (productId: number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(likeSlice.actions.likeProductRequest());
        const response = await axios.delete<ILike>(`${HOST}/api/likes/${productId}`);
        dispatch(likeSlice.actions.likeProductSuccess());
    } catch (e : any) {
        dispatch(likeSlice.actions.likeProductFailure(e.message));
    }
}