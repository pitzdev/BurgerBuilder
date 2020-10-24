import React, { Component } from 'react';
import {connect } from 'react-redux'
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData'
export class Checkout extends Component {
 
    checkoutCancelled =() =>{
        this.props.history.goBack();
    }
    checkoutContinued =() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
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
}
const mapStateToProps = state => {
    return {
        igns : state.ingredients 
    };
};


export default connect(mapStateToProps) (Checkout)