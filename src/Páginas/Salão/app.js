
import React , {useEffect} from 'react';
import db  from 'react';
import Menu from '../../Componentes/Menu/app';
//import Transição from '../Transição/app';
import { StyleSheet, css } from 'aphrodite'



function Salão(){

    return(
      <div className={css(styles.salao)}>
        <Menu />
        {/* <Transição /> */}
      </div>
    )
}

// function navCozinha() {
//   return (
//       <nav>                    
//           <Link to="/Cozinha"> 
//               <button className={css(styles.btnInicio)}>Cozinha</button>
//           </Link>
//       </nav>
//   )
// }


export default Salão

const styles = StyleSheet.create({
  salao: {
    background: 'white',
    height:'100vh'
  }
})