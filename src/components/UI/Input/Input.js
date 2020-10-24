import React from 'react';
import classes from './Input.css'
const input =(props) => {
    let inputElement = null;
    let validationError = null;
    const inPutClasses =[classes.inputElement];
    console.log("touched :" +props.touched);
    console.log("invalid :" +props.invalid);
    console.log("shouldValidate :" +props.shouldValidate);
    if(props.invalid && props.shouldValidate && props.touched){
        inPutClasses.push(classes.InValid);
    }
    
    if(props.invalid && props.touched){
        validationError = <p>Please Enter a Valid {props.valueType} !</p>
    }
    switch(props.elementType){
        case('input'):
             inputElement =<input 
             className={inPutClasses.join(' ')}
             {...props.elementConfig}  
             value={props.value} onChange={props.changed} />
        break;
        case ('textarea'):
            inputElement =<textarea 
            className={classes.inputElement} 
            {...props.elementConfig}  
            value={props.value} onChange={props.changed} />
            break;
        case ('select'):
                inputElement =
               ( <select 
                className={classes.inputElement}  
                value={props.value} onChange={props.changed} >  
                {props.elementConfig.options.map(option =>(
                    <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                ))}
                </select>)
                break;
        default:
            inputElement = <input
             className={classes.inputElement}
              {...props.elementConfig}  
              value={props.value}   onChange={props.changed}  />
    }
    return (
        <div className={classes.input}> 
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {validationError}
        </div>
    )
}

export default input;