
import db from '../../firebase'
import React, { useState, useEffect } from 'react';
import Button from '../Button/app';
import { StyleSheet, css } from 'aphrodite'
import ButtonGeral from '../Button/button'
import Input from '../Input/app.js'
import {Link} from 'react-router-dom'
import lixo from '../img/trash.png'

const Menu = (props) => { 

  const [menu, setMenu] = useState([]);
  const [menuEscolhido, setMenuEscolhido] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState('');
  const [cliente, setCliente] = useState('');

  const [modal, setModal] = useState({ staus: false });
  const [options, setOptions] = useState('')
  const [extras, setExtras] = useState('')
  const [selectextras, setSelectExtras] = useState('')

  useEffect(() => {
    db.collection('Menu').get()
      .then((snapshot) => {
        const NewMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMenu(NewMenu)
        setMenuEscolhido(NewMenu)

      })

  }, [])

  //FILTRANDO EM CAFÉ DA MANHÃ E LANCHES
  function tipoDeMenu(parametro) {
    if (parametro === "Lanches") {
      const menuEscolhido = menu.filter(elem => elem.breakfast === false)
      setMenuEscolhido(menuEscolhido)
    } else if (parametro === "Café da manhã") {
      const menuEscolhido = menu.filter(elem => elem.breakfast === true)
      //setTipoMenu(menuEscolhido)
      setMenuEscolhido(menuEscolhido)
    }
  }

  //ADICIONANDO OS PEDIDOS FEITOS
  function fazerPedido(item) {
    setPedido(estadoAtual => [...estadoAtual, {...item}])
  }

  //DELETANDO OS PEDIDOS
  const deletarPedido = (item) => {
    console.log(pedido, item)
    const indexItem = (pedido.findIndex(itemPedido => itemPedido.Nome == item.Nome ));
    pedido.splice(indexItem, 1);
    setPedido([...pedido]);
  }

  //SOMANDO OS PEDIDOS
  // const total = pedido.reduce((acumulador, item) => acumulador + item.Preço, 0)
  const total = pedido.reduce((acumulador, item) => {
    const preçoExtra = (item.selectextras === "" || item.selectextras === undefined) ? 0 : 1;
    return ((acumulador + item.Preço) + preçoExtra)}, 0)
  


  //SALVANDO OS PEDIDOS NA COLEÇÃO DOS QUE VAI PARA COZINHA
  function enviarPedidoCozinha() {
    if (cliente && mesa != '') {
      db.collection('Pedidos').add({
        cliente: cliente,
        mesa: mesa,
        pedido: pedido,
        total: total,
        status: "Preparo",
        timeS: new Date().getTime(),
        time: new Date().getHours() + 'h' + new Date().getMinutes()

      })
        .then(() => {
          setCliente([''])
          setMesa([''])
          setPedido([])
        })
    } else if (!cliente) {
      alert('Digite o nome')
    } else if (!mesa) {
      alert('Digite a mesa')
    }
  }

  const verOptions = (elem) => {
    if (elem.options.length != 0) {
      setModal({ status: true, item: elem })
    } else {
      fazerPedido(elem)
    }
  }

  const addOptionsAndExtras = () => {
    if (!options) {
      alert('Escolha a opção')
    } else {
      console.log(selectextras)
      const add = {
        ...modal.item,
        Nome: `${modal.item.Nome} ${options} ${selectextras}`,
        selectextras: selectextras
      }
      
      fazerPedido(add)
      setModal({ staus: false })
      setSelectExtras("")
    } 
  }


  

  return (
    <div className={css(styles.container)}>
      <header className={css(styles.logo)}>
        <img className={css(styles.img)} src={require("../img/BGB.png")} alt="Logo da imagem"></img>
        <Link to='/Cozinha'> 
        <button>Cozinha</button>
        </Link>
      </header>
      
      <main className={css(styles.main)}>
        <section className={css(styles.cardapio)}>
          <label id='option-filter'></label>

          <h3 className={css(styles.tituloCardapio)}>Cardápio</h3>

          <div className={css(styles.divBtnFiltro)}>
          <ButtonGeral className={css(styles.btnFiltro)} onClick={() => tipoDeMenu("Café da manhã")} title={'Café da manhã'} />
          <ButtonGeral className={css(styles.btnFiltro)} onClick={() => tipoDeMenu("Lanches")} title={'Lanches'} />
          </div>

          <h3></h3>
          {menuEscolhido.map((item) => {
            return <Button
              className={css(styles.btn)}
              key={menu}
              title={item.Nome}
              mensagem={'R$'}
              R$={item.Preço}
              onClick={() => verOptions(item)}
            />
          })}
       
          </section>



        <section className={css(styles.pedidos)}>

          <div className={css(styles.input)}>
            <Input className={css(styles.inputCli)} value={cliente} type={'text'} placeholder={'Nome'} handleChange={event => setCliente(event.currentTarget.value)} />
            <Input className={css(styles.inputCli)} value={mesa} type={'number'} placeholder={'Mesa'} handleChange={event => setMesa(event.currentTarget.value)} />
          </div>

          <h3>Pedido</h3>

          {modal.status ? (
            <div>
              <p>extras</p>
              {modal.item.extras.map(elem => (
                <div>
                  <input onChange={() => setSelectExtras(elem)} type="radio" name="extras" value={elem} />
                  <label>{elem}</label>
                </div>
              ))}
              <p>opções</p>
              {modal.item.options.map(elem => (
                <div>
                  <input onChange={() => setOptions(elem)} type="radio" name="opções" value={elem} />
                  <label>{elem}</label>
                </div>
              ))}
              <button onClick={addOptionsAndExtras}>Adicionar</button>
            </div>
          ) : false}

           

          {pedido.map(elem => (
            <div>
              <div className={css(styles.caixaPedidos)}>
                <span>
                  {elem.Nome}
                </span>
                <span>
                  R$ {elem.Preço} ,00
              </span>
                <ButtonGeral className={css(styles.btnDeletar)}
                  onClick={(e) => { e.preventDefault(); deletarPedido(elem) }}
                  img ={lixo}
                />
              </div>
            </div>
          ))}

          <strong>Total: {total}</strong>

          <ButtonGeral className={css(styles.btnEnviar)} title={'Enviar pedido'} onClick={(event) => { event.preventDefault(); enviarPedidoCozinha() }}>
          </ButtonGeral>

        </section>
      </main>
    </div>
  )
}

export default Menu;

const styles = StyleSheet.create({

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    background: 'white'
  },

  logo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '12rem'
  },

  img: {
    width: '30%',
  },

  main: {
    display: 'flex',
    justifyContent: 'space-around',
    margin:'none'
  },

  tituloCardapio:{
    display:'flex',
    alignItems: 'center',
    justifyContent:'center'
  },

  btn: {
    borderRadius: '10px',
    padding: '8px',
    margin: '10px',
    height: '6rem',
    width: '9rem'
  },

  divBtnFiltro:{
    display: 'flex',
    justifyContent: 'space-around',
  },

  btnFiltro:{
    borderRadius: '10px',
    padding: '8px',
    margin: '10px',
    height: '3rem',
    width: '5rem'
  },

  cardapio: {
    display: 'block',
    background: '#CC6600',
    borderColor: '#CC6600',
    color: 'white',
    margin: '10px',
    padding: '10px',
    border: '1px solid #CC6600',
    width: '50%',
    borderRadius: '20px'
  },

  pedidos: {
    display: 'block',
    background: '#FF9900',
    color: '#FFF',
    margin: '10px',
    padding: '10px',
    border: '1px solid #CC6600',
    width: '50%',
    borderRadius: '20px'
  },

  input:{
   display:'flex',
   alignItems: 'center',
   justifyContent: 'space-around'
  },

  // inputCli: {
  //   display: 'flex',
  //   flexdirection: 'row',
  //   padding: '5px',
  //   marginBottom: '7%',
  //   alignItems: 'center'
  // },

  caixaPedidos: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  btnDeletar: {
    marginLeft: '0,5%',
  },

  btnEnviar: {
    display: 'block',
    borderRadius: '10px',
  }
})