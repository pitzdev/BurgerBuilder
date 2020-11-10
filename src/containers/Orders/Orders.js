import React, { Component } from 'react';
import { connect } from 'react-redux';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions/index';
export class Orders extends Component {
   
    componentDidMount(){
        this.props.onFetchOrders(this.props.token);
        // axios.get('orders.json')
        //     .then(res =>{
        //         const fetchedOrders =[];
        //         for(let key in res.data){
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         console.log(fetchedOrders);
        //         this.setState({loading: false,orders : fetchedOrders});
        //     })
        //     .catch(err =>{
        //         this.setState({loading: false});
        //     })
    }
    render() {
        return (
            <div>
                {this.props.orders.map(order => (
                    <Order 
                    key={order.id}
                    ingredients ={order.ingredients}
                    price={order.price}
                     />
                ))}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        token : state.auth.token 
    };
};
const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : (token) => dispatch(actionTypes.fetchOrders(token)),
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(Orders,axios));
