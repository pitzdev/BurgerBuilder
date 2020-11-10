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

export const purchaseBurger =(orderData,token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token,orderData )
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

export const fetchOrders =(token) =>{
    return dispatch =>{
        dispatch(fetchOrdersStart());
        axios.get('orders.json?auth=' + token)
        .then(res =>{
            const fetchedOrders =[];
            for(let key in res.data){
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            } 
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err =>{
           dispatch(fetchOrdersFail(err));
        })
    };
};


export const fetchOrdersStart =()=>{
    return{
        type : actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrdersSuccess =(orderData)=>{
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS,
        orderData: orderData
    }
}


export const fetchOrdersFail =(error)=>{
    return {
        type : actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}
