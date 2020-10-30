import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'; 
export const purchaceBurgerSuccess =(id, orderData) =>{
    return{
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId : id,
        orderData : orderData

    }
};

export const purchaceBurgerFailed =(error) =>{
    return{
        type : actionTypes.PURCHASE_BURGER_FAILED,
        error:error

    }
};


export const purchaseBurgerStart =() =>{
    return {
        type : actionTypes.PURCHASE_BURGER_START

    }
   
};

export const purchaseBurger =(orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData )
            .then(res =>{
                dispatch(purchaceBurgerSuccess(res.data.name,orderData));                 
            })
            .catch(error =>
                {
                    dispatch(purchaceBurgerFailed(error));
                    
                } )
    }
};

export const purchaseInit =()=>{
    return {
        type : actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersStart =()=>{
    return {
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess =()=>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS
    }
}


export const fetchOrdersFail =()=>{
    return {
        type : actionTypes.FETCH_ORDERS_FAIL
    }
}
