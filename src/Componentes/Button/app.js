import React from 'react'

function Button(props) {
    return (
      <button 
      id={props.id}
      className={props.className}
       onClick={props.onClick} >
       {props.title}
       <p>{props.mensagem} {props.R$},00</p>
       </button>
    )
  
  }
 
  
  export default Button;



  

