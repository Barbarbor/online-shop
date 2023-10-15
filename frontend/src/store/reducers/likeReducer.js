const initialState = {
    products: [], // Store liked product IDs
};

const likeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LIKE_PRODUCT':
            return {
                ...state,
                products: [...state.products, action.payload],
            };
        case 'UNLIKE_PRODUCT':
            return {
                ...state,
                products: state.products.filter(id => id !== action.payload),
            };
        default:
            return state;
    }
};

export default likeReducer;