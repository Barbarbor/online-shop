import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
} from "../actions";

const initialState = {
    orders: [],
    error: null,
};
const orderReducer = (state = initialState,action) => {
    switch(action.type){
        case CREATE_ORDER_REQUEST:
            return{
                ...state,

                error: null,
            }
        case CREATE_ORDER_SUCCESS:
            const orderItems = action.payload.orderitems;
            const order = action.payload.order;
            const total = order.total;
            return{
                ...state,
                orders: [...state,{orderitems:orderItems,order:order,total:total}],

                error: null,
            }
        case CREATE_ORDER_FAILURE:
            return{
                ...state,
                error: null,
            }
    }
};