import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LikeState } from '../../../types/Like';

const initialState: LikeState = {
    isLoading: false,
    error: null,
};

export const likeSlice = createSlice({
    name: 'like',
    initialState,
    reducers: {
        likeProductRequest: (state) => {
          state.isLoading = true;
          state.error = null;
        },
        likeProductSuccess: (state) => {
          state.isLoading = false;
        },
        likeProductFailure: (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
        unlikeProductRequest: (state) => {
          state.isLoading = true;
          state.error = null;
        },
        unlikeProductSuccess: (state) => {
          state.isLoading = false;
        },
        unlikeProductFailure: (state, action: PayloadAction<string>) => {
          state.isLoading = false;
          state.error = action.payload;
        },
    },
  });

export default likeSlice.reducer;