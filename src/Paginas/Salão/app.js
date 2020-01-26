
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


export default Salão

const styles = StyleSheet.create({
  salao: {
    background: 'white',
    height:'100vh'
  }
})