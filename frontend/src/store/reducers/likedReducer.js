// likedReducer.js
const initialState = {
    likedProductDetails: [],
};

const likedReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_LIKED_PRODUCT_DETAILS':
            return {
                ...state,
                likedProductDetails: action.payload,
            };
        default:
            return state;
    }
};

export default likedReducer;
