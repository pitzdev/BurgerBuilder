import React, { Component } from 'react';
import {connect } from 'react-redux'
import { Route,Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
export class Checkout extends Component {

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }
 
    checkoutCancelled =() =>{
        this.props.history.goBack();
    }
    checkoutContinued =() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/"/>
        if(this.props.igns){
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                {purchasedRedirect}
                <CheckoutSummary 
                ingredients ={this.props.igns}
                checkoutCancelled={this.checkoutCancelled}
                checkoutContinued={this.checkoutContinued}
                />
                <Route path={this.props.match.path + '/contact-data'} 
                component ={ContactData} />
            </div>
            )
        }

        return  summary;
    }
}
const mapStateToProps = state => {
    return {
        igns : state.burgerBuilder.ingredients,
        purchased : state.order.purchased
    };
};

// const mapDispatchToProps = dispatch =>{
//     return{
//         onInitPurchase :() => dispatch(actionTypes.purchaseInit())
//     }
// }

export default connect(mapStateToProps) (Checkout)
