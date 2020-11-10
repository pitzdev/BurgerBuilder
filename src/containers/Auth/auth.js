import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner'; 
import {checkValididity} from '../../shared/utility';
export class auth extends Component {
    state ={
        controls: {
            email :{
                elementType : 'input',
                elementConfig:{
                    type : 'email',
                    placeholder : 'Your Email'
                },
                value : '',
                validation:{
                    required: true,
                    isEmail : true
                },
                valid : false,
                touched: false, 
            } ,
            password :{
                elementType : 'input',
                elementConfig:{
                    type : 'password',
                    placeholder : 'Your Password'
                },
                value : '',
                validation:{
                    required: true,
                    minLength: 2,
                    maxLength: 5
                },
                valid : false,
                touched: false
            } 
        },
        isSignUp : true
    }
    

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath!== "/"){
            this.onSetAuthRedurectPath();
        }
    }
    inputChangedHandler =(event,controlName) =>{
        const updatedControls ={
            ...this.state.controls,
            [controlName] :{
                ...this.state.controls[controlName],
                value : event.target.value,
                valid: checkValididity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler =(event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value);
    }
    switchAuthModeHandler =()=>{
        this.setState(prevState =>{
            return {isSignUp : !prevState.isSignUp}
        })
    }
    render() {
        const formElementsArray =[];
        for(let key in this.state.controls){
         formElementsArray.push({
            id: key,
            config : this.state.controls[key]
         });
        }

        let form = formElementsArray.map(formElement =>(
            <Input 
            key={formElement.id}
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

        if(this.props.loading){
            form = <Spinner/>
        }

        let errorMsg = null;
        if(this.props.error){
            errorMsg=(
            <p>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if(this.props.isAuthenticated){
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMsg}
                <form onSubmit={this.submitHandler}>
                {form}
                 <Button btnType="Success" >Submit</Button>
                </form>
                 <Button
                 clicked ={this.switchAuthModeHandler}
                  btnType="Danger">Switch to {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
                        
            </div>
        )
    }
}
const mapStateToProps = state =>{
    return{
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated : state.auth.token !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email,password,isSignUp) => dispatch(actions.auth(email,password,isSignUp)),
        onSetAuthRedurectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    };
};


export default connect(mapStateToProps,mapDispatchToProps) (auth)
