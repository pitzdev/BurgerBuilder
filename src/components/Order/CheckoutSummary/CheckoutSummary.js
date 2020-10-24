import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'
const checkoutSummary = (props) =>{
    return (
        <div className={classes.CheckoutSummary}>
            <h1> We hope its Tastes Well!</h1>
            <div style={{width: '100%',   margin :'auto'}}>
                <Burger ingredients ={props.ingredients} />
            </div>
            <Button btntype="Danger"
                    clicked={props.checkoutCancelled}>Cancel</Button>

            <Button btntype="Success"
                    clicked={props.checkoutContinued}>Continue</Button>

        </div>
    )
}

export default checkoutSummary;