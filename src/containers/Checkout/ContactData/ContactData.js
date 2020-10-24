import React, { Component } from 'react';
import { connect } from 'react-redux'
import Button from '../../../components/UI/Button/Button'
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input'
export class ContactData extends Component {
    state ={
        orderForm:{            
                name :{
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value : '',
                    validation:{
                        required: true
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Full Name'
                } ,
                           
                street : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your Street'
                    },
                    value : '',
                    validation:{
                        required: true
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Street'
                } ,
                postalCode : {
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your postalCode'
                    },
                    value : '',
                    validation:{
                        required: true,
                        minLength: 2,
                        maxLength: 5
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Postal Code'
                } ,
                country :{
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your country'
                    },
                    value : '',
                    validation:{
                        required: true
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Country'
                } ,              
                email :{
                    elementType : 'input',
                    elementConfig:{
                        type : 'email',
                        placeholder : 'Your Email'
                    },
                    value : '',
                    validation:{
                        required: true
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Email Address'
                } ,
                deliveryMethod : {
                    elementType : 'select',
                    elementConfig:{
                        options : [
                            {value : 'fastest', displayValue : 'Fastest'},
                            {value : 'cheapest', displayValue : 'Cheapest'}
                        ]
                        
                    },
                    value : 'fastest',
                    validation:{ },
                    valid : false
                },
                mobileNumber :{
                    elementType : 'input',
                    elementConfig:{
                        type : 'text',
                        placeholder : 'Your Mobile Number'
                    },
                    value : '',
                    validation:{
                        required: true
                    },
                    valid : false,
                    touched: false,
                    valueType : 'Mobile Number'
                } 
           
        } ,
        formIsValid: false,
        loading : false,
        error : null
    }
    orderHandler =(event) => {
        event.preventDefault();
            this.setState({loading: true});

        const formData ={};
        for(let formElementIndentifier in this.state.orderForm){
            formData[formElementIndentifier] = this.state.orderForm[formElementIndentifier].value
        }
        const orders ={
            ingredients : this.props.igns,
            price: this.props.price,      
            orderData : formData
        };
        console.log(orders)
        axios.post('/orders.json',orders )
            .then(res =>{
                this.setState({loading:false , purchasing :false})
                this.props.history.push('/')
            })
            .catch(error =>
                {
                    this.setState({loading:false, purchasing : false})
                    console.log(error)
                } )
    }
    checkValididity(value,rules){
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid;
        }
        
        return isValid;
    }
    inputChangedHandler = (event,inputIdentifier) =>{
     
         const updatedOrderForm ={
             ...this.state.orderForm
         };
         const updatedFormElement = {
             ...updatedOrderForm[inputIdentifier]
         };
         updatedFormElement.value =event.target.value;
         updatedFormElement.valid =this.checkValididity(updatedFormElement.value,updatedFormElement.validation);
         updatedFormElement.touched = true;
         updatedOrderForm[inputIdentifier] = updatedFormElement;
         //Validate form
         let formIsValid = true;
         for(let inputIdentifier in updatedOrderForm){
             formIsValid =updatedOrderForm[inputIdentifier].valid && formIsValid
         }
         this.setState({orderForm: updatedOrderForm,formIsValid : formIsValid});
    }
    render() {
        const formElementsArray =[];
        for(let key in this.state.orderForm){
         formElementsArray.push({
            id: key,
            config : this.state.orderForm[key]
         });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
             
            {formElementsArray.map(formElement=>(
              <Input 
              key = {formElement.id}
              elementType ={formElement.config.elementType}
              elementConfig ={formElement.config.elementConfig}
              value ={formElement.config.value}
              invalid ={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              valueType ={formElement.config.valueType}
              changed ={(event) => this.inputChangedHandler(event,formElement.id)}
              />
            ))

            }
            
            <Button btnType="Success" disabled={!this.state.formIsValid} >Order Now</Button>
        </form>);
        if(this.state.loading){
            form= <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        igns : state.ingredients,
        price : state.totalPrice 
    };
};

export default connect(mapStateToProps) (ContactData);
