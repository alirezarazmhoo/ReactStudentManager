import React from 'react';
import './Input.css';


const input = (props) =>  {
let inputElement = null ; 


switch (props.inputtype) {
    case ('input'):
if(props.invalid ==false && props.shouldValid && props.touched){
        inputElement = <input className="inputinvalid" {...props.elementConfig} value={props.value}   onChange={props.changed}/>
}
else{

        inputElement = <input className="input" {...props.elementConfig} value={props.value}   onChange={props.changed}/>
}
        break;
case ('textarea'):
        inputElement = <textarea className="textarea" {...props.elementConfig} value={props.value}  onChange={props.changed}/>
break;
    default:
if(props.invalid  ==false  && props.shouldValid && props.touched){
        inputElement = <input className="inputinvalid" {...props.elementConfig} value={props.value}   onChange={props.changed}/>
}
else{

        inputElement = <input className="input" {...props.elementConfig} value={props.value}   onChange={props.changed}/>
}
}

    return (
        <div>
         <label className="label">{props.label}</label>
           {inputElement}
        </div>
    );
  
}

export default input;

