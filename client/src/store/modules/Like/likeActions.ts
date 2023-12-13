import axios from "axios";
import { AppDispatch } from "../../store";
import { likeSlice } from "./reducers/likeReducer";
import { ILike } from "../../../models/ILike";
import { HOST } from "../../../constants";

export const likeProduct = (productId: number, userId:number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(likeSlice.actions.likeProductRequest());
        const response = await axios.post<ILike>(`${HOST}/api/likes`, {
            UserId: userId, // Replace with actual user ID once authentication is implemented
            ProductId:productId,
        });
        dispatch(likeSlice.actions.likeProductSuccess());
    } catch (e : any) {
        dispatch(likeSlice.actions.likeProductFailure(e.message));
    }
}

export const unlikeProduct = (productId: number,userId:number) => async (dispatch: AppDispatch) => {
    try {
        dispatch(likeSlice.actions.likeProductRequest());
        const response = await axios.delete<ILike>(`${HOST}/api/likes/${userId}/${productId}`);
        dispatch(likeSlice.actions.likeProductSuccess());
    } catch (e : any) {
        dispatch(likeSlice.actions.likeProductFailure(e.message));
    }
}