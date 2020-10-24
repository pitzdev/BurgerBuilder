import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'; 
export const addIngredient =(name) =>{
    return{
        type : actionTypes.ADD_INGREDIENT,
        ingredientName: name
    };
};

export const removeIngredient =(name) =>{
    return{
        type : actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    };
};

export const setIngredient =(ingredients) =>{
    return{
        type : actionTypes.SET_INGREDIENT,
        ingredients: ingredients
    }
};

export const fetchingredientsfailed = () =>{
    return{
        type : actionTypes.FETCH_INGREDIENT_FAILED
    }
};


export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://my-burger-36992.firebaseio.com/ingredients.json')
        .then(res =>{
           dispatch(setIngredient(res.data))
        })
        .catch(error =>{
            dispatch(fetchingredientsfailed());
        })
    };
}