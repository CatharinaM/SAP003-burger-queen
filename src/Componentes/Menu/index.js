import db from '../../firebase';
import React, { useState, useEffect } from 'react';
import Button from '../Button/index';
import { StyleSheet, css } from 'aphrodite';
import ButtonGeral from '../Button/button';
import Input from '../Input/index.js';
import { Link } from 'react-router-dom';
import trash from '../img/trash.png';
import alertify from 'alertifyjs';
import imgbackground from '../img/background.jpg';

const Menu = (props) => {

  const [menu, setMenu] = useState([]);
  const [menuSelected, setmenuSelected] = useState([]);
  const [order, setOrder] = useState([]);
  const [table, setTable] = useState('');
  const [client, setClient] = useState('');

  const [modal, setModal] = useState({ staus: false });
  const [options, setOptions] = useState('');
  const [selectextras, setSelectExtras] = useState('');

  useEffect(() => {
    db.collection('Menu').get()
      .then((snapshot) => {
        const NewMenu = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        setMenu(NewMenu)
        setmenuSelected(NewMenu)

      })

  }, [])

  //FILTRANDO EM CAFÉ DA MANHÃ E LANCHES
  function menuType(parameter) {
    if (parameter === "Lanches") {
      const menuSelected = menu.filter(elem => elem.breakfast === false)
      setmenuSelected(menuSelected)
    } else if (parameter === "Café da manhã") {
      const menuSelected = menu.filter(elem => elem.breakfast === true)
      setmenuSelected(menuSelected)
    }
  }

  //ADICIONANDO OS PEDIDOS FEITOS
  function makeOrder(item) {
    setOrder( currentState => [... currentState, { ...item }])
  }

  //DELETANDO OS PEDIDOS
  const deleteOrder = (item) => {
    console.log(order, item)
    const indexItem = (order.findIndex(itemOrder => itemOrder.Nome == item.Nome));
    order.splice(indexItem, 1);
    setOrder([...order]);
  }

  //SOMANDO OS PEDIDOS
  const total = order.reduce((accumulator, item) => {
    const priceExtra = (item.selectextras === "" || item.selectextras === undefined) ? 0 : 1;
    return ((accumulator + item.Preço) + priceExtra)
  }, 0)

  //SALVANDO OS PEDIDOS NA COLEÇÃO DOS QUE VAI PARA COZINHA
  function sendOrderCozinha() {
    if (client && table != '') {
      db.collection('Pedidos').add({
        client: client,
        table: table,
        order: order,
        total: total,
        status: "Preparo",
        timeS: new Date().getTime(),
        time: new Date().getHours() + 'h' + new Date().getMinutes() + 'min'

      })
        .then(() => {
          alertify.success('Seu pedido foi enviado com sucesso!');
          setClient([''])
          setTable([''])
          setOrder([])
        })
    } else if (!client) {
      alertify.error('Digite o nome')
    } else if (!table) {
      alertify.error('Digite a mesa')
    }
  }

  const viewOptions = (elem) => {
    if (elem.options.length != 0) {
      setModal({ status: true, item: elem })
    } else {
      makeOrder(elem)
    }
  }

  const addOptionsAndExtras = () => {
    if (!options) {
      alertify.error('Escolha a opção')
    } else {
      const add = {
        ...modal.item,
        Nome: `${modal.item.Nome} ${options} ${selectextras}`,
        selectextras: selectextras
      }

      makeOrder(add)
      setModal({ staus: false })
      setSelectExtras("")
    }
  }


  return (
    <div className={css(styles.container)}>

      <header className={css(styles.logo)}>
        <img className={css(styles.img)} src={require("../img/burgerImport.png")} alt="Logo da imagem"></img>
        <h1>BURGER QUEEN</h1>
        <Link to='/kitchen'>
          <button className={css(styles.btnKitchen)}>Cozinha</button>
        </Link>
      </header>

      <main className={css(styles.main)}>
        <section className={css(styles.menu)}>
          <label id='option-filter'></label>

          <h3 className={css(styles.titleMenu)}>Cardápio</h3>

          <div className={css(styles.divBtnFilter)}>
            <ButtonGeral className={css(styles.btnFilter)} onClick={() => menuType("Café da manhã")} title={'Café da manhã'} />
            <ButtonGeral className={css(styles.btnFilter)} onClick={() => menuType("Lanches")} title={'Lanches'} />
          </div>

          <div className={css(styles.divBtnMenu)}>
            {menuSelected.map((item) => {
              return <Button
                className={css(styles.btn)}
                key={menu}
                title={item.Nome}
                mensagem={'R$'}
                R$={item.Preço}
                onClick={() => viewOptions(item)}
              />
            })}
          </div>
        </section>



        <section className={css(styles.orders)}>
          <div className={css(styles.input)}>
            <Input className={css(styles.inputCli)} value={client} type={'text'} placeholder={'Nome'} handleChange={event => setClient(event.currentTarget.value)} />
            <Input className={css(styles.inputCli)} value={table} type={'number'} placeholder={'Mesa'} handleChange={event => setTable(event.currentTarget.value)} />
          </div>

          <h3 className={css(styles.titleOrder)}>Pedido</h3>

          {modal.status ? (
            <div className={css(styles.btnRadio)}>
              <p>Extras:</p>
              {modal.item.extras.map(elem => (
                <div>
                  <input className={css(styles.btnRadio)} onChange={() => setSelectExtras(elem)} type="radio" name="extras" value={elem} />
                  <label>{elem}</label>
                </div>
              ))}
              <p>Opções:</p>
              {modal.item.options.map(elem => (
                <div>
                  <input className={css(styles.btnRadio)} onChange={() => setOptions(elem)} type="radio" name="opções" value={elem} />
                  <label>{elem}</label>
                </div>
              ))}
              <button className={css(styles.btnAdd)} onClick={addOptionsAndExtras}>Adicionar</button>
            </div>
          ) : false}



          {order.map(elem => (
            <div>
              <div className={css(styles.boxOrders)}>
                <span className={css(styles.letters)}>
                  {elem.Nome}
                </span>
                <span className={css(styles.letters)}>
                  R$ {elem.Preço} ,00
              </span>
                <ButtonGeral className={css(styles.btnDelete)}
                  onClick={(e) => { e.preventDefault(); deleteOrder(elem) }}
                  img={trash}
                />
              </div>
            </div>
          ))}

          <strong className={css(styles.total)}>Total: {total}</strong>

          <ButtonGeral className={css(styles.btnSend)} title={'Enviar pedido'} onClick={(event) => { event.preventDefault(); sendOrderCozinha() }}>
          </ButtonGeral>

        </section>
      </main>
    </div>
  )
}

export default Menu;

const styles = StyleSheet.create({
  divBtnMenu: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    backgroundImage: `url(${imgbackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
  },

  logo: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '14rem',
    fontFamily: 'Just Me Again Down Here',
    fontStyle: 'cursive',
    fontSize: '30px',
    color: 'rgb(255, 153, 0)',
    textShadow: '8px 8px black'
  },

  img: {
    width: '14%'
  },

  main: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 'none'
  },

  titleMenu: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px'
  },

  btn: {
    ':hover': {
      backgroundColor: '#CC9933',
    },
    borderRadius: '10px',
    padding: '8px',
    margin: '10px',
    height: '6rem',
    width: '9rem',
    backgroundColor: 'white',
    borderColor: 'rgb(255, 153, 0)',
    boxShadow: '0-3px 5px #555',
    fontWeight: 'bold'
  },

  divBtnFilter: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  btnFilter: {
    ':hover': {
      backgroundColor: '#087C35',
    },
    ':active': {
      backgroundColor: '#087C35',
    },
    borderRadius: '10px',
    padding: '12px',
    margin: '10px',
    height: '3rem',
    width: '10rem',
    backgroundColor: 'white',
    borderColor: 'rgb(255, 153, 0)',
    boxShadow: '0-3px 5px #555',
    fontWeight: 'bold'
  },

  menu: {
    display: 'block',
    color: 'white',
    margin: '10px',
    padding: '10px',
    borderRight: '4px solid white',
    width: '55%',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  orders: {
    display: 'block',
    color: '#FFF',
    margin: '10px',
    padding: '10px',
    width: '45%',
    borderRadius: '20px',
    // verticalAlign: 'middle',
    // appearance:'none',
    // margin:'0 40px'
  },

  titleOrder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px'
  },

  total: {
    fontSize: '20px'
  },

  btnRadio: {
    position: 'relative',
    fontSize: '20px',
    bottom: '0',
    right: '0',
    left: '0',
    color: 'rgba(#000, .4)',
    // width: '20px',
    // height: '20px',
  },


  //   btnRadio: {
  //   appearance:'none',
  //   // -mozAppearance: 'none',
  //   // -webkitAppearance: 'none',
  //   margin:'0 40px',
  //   width: '24px',
  //   height: '24px',
  //   background: '#eeeeee',
  //   // box-shadow: inset 0 0 0 .4em white,
  //   //   0 0 0 .1em;
  //   borderRadius: '50%',
  //   transition: '.2s',
  //   cursor:'pointer',
  //   color: '#09224E',
  //   margin: '10px',
  //   verticalAlign: 'middle'
  // },

  letters: {
    fontSize: '20px'
  },

  input: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '10px'
  },

  inputCli: {
    borderRadius: '10px',
    padding: '8px'
  },

  boxOrders: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  btnDelete: {
    marginLeft: '0,5%',
    marginBottom: '8px',
    marginRight: '10%'
  },

  btnAdd: {
    boxShadow: '0-3px 5px #555',
    borderColor: 'rgb(255, 153, 0)',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '10px',
    marginBottom: '8px'
  },

  btnSend: {
    ':hover': {
      backgroundColor: '#087C35',
    },
    display: 'block',
    borderRadius: '10px',
    borderColor: 'rgb(255, 153, 0)',
    boxShadow: '0-3px 5px #555',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '20px'
  },

  btnKitchen: {
    ':hover': {
      backgroundColor: ' #8C8C8C',
    },
    boxShadow: '0-3px 5px #555',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '20px',
    marginLeft: '80px'
  }
})
