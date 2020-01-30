
import React, { useEffect } from 'react';
import db from 'react';
import Menu from '../../Componentes/Menu/index';
//import Transição from '../Transição/app';
import { StyleSheet, css } from 'aphrodite'

function Hall() {

  return (
    <div className={css(styles.menu)}>
      <Menu />
      {/* <Transição /> */}
    </div>
  )
}

export default Hall

const styles = StyleSheet.create({
  menu: {
    background: 'white',
    height: '100vh'
  }
})