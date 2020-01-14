import React from 'react';
import lixo from '../img/trash.png'

function ButtonGeral(props) {
    return (
      
      <button 
      id={props.id}
       className={props.className}
       onClick={props.onClick} >
       {props.title}
       {props.img && <img src={lixo}></img>}
       </button>   
    )
  
  }
  
   
  export default ButtonGeral;