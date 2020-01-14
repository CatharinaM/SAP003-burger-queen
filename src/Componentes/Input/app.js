import React from 'react';

function Input (props){
  return(
    <div>
      <input className={props.className} 
      id={props.id} type={props.type} 
      value={props.value} 
      placeholder={props.placeholder} 
      onChange={props.handleChange} ></input>
    </div>
  )
}

export default Input;




