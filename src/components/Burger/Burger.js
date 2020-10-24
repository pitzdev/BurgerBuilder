import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';
import {withRouter } from 'react-router-dom'
const burger =(props) =>{
    console.log("burger>>>>>>>" + props.ingredients)
    let transformedIngredients = Object.keys(props.ingredients)
    .map(igkey => {
        return[...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredients key={igkey+i} type={igkey} />
        });
    }).reduce((arr,el)=>{
        return arr.concat(el)
    },[]);
    if(transformedIngredients.length === 0){
        transformedIngredients = <p>Please Start adding Ingredient! </p>
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top"/>
          {transformedIngredients}
            <BurgerIngredients type="bread-bottom"/>
        </div>
    );
};


export default withRouter(burger)