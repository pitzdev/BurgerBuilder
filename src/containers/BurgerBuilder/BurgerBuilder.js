import React, { Component } from 'react';
import { connect } from 'react-redux';
import Aux from '../../hoc/_Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders'; 
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler  from  '../../hoc/withErrorHandler';
import * as actionTypes from '../../store/actions/index';
 
class BurgerBuilder extends Component {

    // constructor(props){
    //     super(props)
    // }
    state ={  
        purchable: false,
        purchasing : false,
      
    }
    componentDidMount(){
       this.props.onInitIngredients();
    }
    updatePurchaseState (ingredients){
     
        const sum = Object.keys(ingredients)
        .map(igkey =>{
            return ingredients[igkey]
        })
        .reduce((sum, el) => {
            return sum + el;
        },0);
   return sum> 0;
    }
    
    purchaseHandler = () =>{
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinue = () => {
       
        // const queryParams =[];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        // }
        // queryParams.push("price=" + this.state.totalPrice)
        // const quertString = queryParams.join('&');
        this.props.history.push('/checkout');
 
        // this.props.history.push({
        //     pathname : '/checkout',
        //     search: '?' + quertString
        // });
    }
    render() {
        const disabledInfo={
            ...this.props.igns
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary  = null;

      
        let burger = this.props.error ? <p>ingredients can't Be Loaded </p> : <Spinner/>

        if(this.props.igns){
            burger =(
                <Aux>
                <Burger ingredients ={this.props.igns}/>
                                    <BuildControls
                                    ingredientsAdded ={this.props.onAddIngredients}
                                    ingredientsRemoved ={this.props.onRemoveIngredients}
                                    disabled={disabledInfo}
                                    price={this.props.tpr}
                                    ordered ={this.purchaseHandler}
                                    purchable={this.updatePurchaseState(this.props.igns)}
                                    />
                    </Aux>
            )
            orderSummary =  <OrderSummary
            ingredients={this.props.igns}
            purchaseContinue={this.purchaseContinue}
            purchaseCancelled={this.purchaseCancelHandler}
            price={this.props.tpr} />;
           
        }
      
        return (
            <div>
                <Aux>
                    <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}> 
                       {orderSummary}
                    </Modal>    
                   {burger}
                </Aux>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        igns : state.ingredients,
        tpr : state.totalPrice,
        err: state.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredients: (ingName) => dispatch(actionTypes.addIngredient(ingName)),
        onRemoveIngredients: (ingName) => dispatch(actionTypes.removeIngredient(ingName)) ,
        onInitIngredients : () => dispatch(actionTypes.initIngredients())
    };
};
export default connect(mapStateToProps,mapDispatchToProps) (withErrorHandler(BurgerBuilder,axios));