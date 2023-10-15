const initialState = {
    items: [],
};

const cartItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_CART_ITEMS':
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
};

export default cartItemReducer;