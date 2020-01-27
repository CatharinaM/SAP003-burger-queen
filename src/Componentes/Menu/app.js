import db from '../../firebase';
import React, { useState, useEffect } from 'react';
import Button from '../Button/app';
import { StyleSheet, css } from 'aphrodite';
import ButtonGeral from '../Button/button';
import Input from '../Input/app.js';
import { Link } from 'react-router-dom';
import trash from '../img/trash.png';
import alertify from 'alertifyjs';
import imgFundo from '../img/Fundo.jpg';

const Menu = (props) => {

  const [menu, setMenu] = useState([]);
  const [menuEscolhido, setMenuEscolhido] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [mesa, setMesa] = useState('');
  const [cliente, setCliente] = useState('');

  const [modal, setModal] = useState({ staus: false });
  const [options, setOptions] = useState('')
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
      setMenuEscolhido(menuEscolhido)
    }
  }

  //ADICIONANDO OS PEDIDOS FEITOS
  function fazerPedido(item) {
    setPedido(estadoAtual => [...estadoAtual, { ...item }])
  }

  //DELETANDO OS PEDIDOS
  const deletarPedido = (item) => {
    console.log(pedido, item)
    const indexItem = (pedido.findIndex(itemPedido => itemPedido.Nome == item.Nome));
    pedido.splice(indexItem, 1);
    setPedido([...pedido]);
  }

  //SOMANDO OS PEDIDOS
  const total = pedido.reduce((acumulador, item) => {
    const preçoExtra = (item.selectextras === "" || item.selectextras === undefined) ? 0 : 1;
    return ((acumulador + item.Preço) + preçoExtra)
  }, 0)



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
        time: new Date().getHours() + 'h' + new Date().getMinutes() + 'min'

      })
        .then(() => {
          alertify.success('Seu pedido foi enviado com sucesso!');
          setCliente([''])
          setMesa([''])
          setPedido([])
        })
    } else if (!cliente) {
      alertify.error('Digite o nome')
    } else if (!mesa) {
      alertify.error('Digite a mesa')
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
      alertify.error('Escolha a opção')
    } else {
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
        <img className={css(styles.img)} src={require("../img/burgerImport.png")} alt="Logo da imagem"></img>
        <h1>BURGER QUEEN</h1>
        <Link to='/Cozinha'>
          <button className={css(styles.btnCozinha)}>Cozinha</button>
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

        <div className={css(styles.divBtnCardapio)}>
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
          </div>
        </section>



        <section className={css(styles.pedidos)}>
          <div className={css(styles.input)}>
            <Input className={css(styles.inputCli)} value={cliente} type={'text'} placeholder={'Nome'} handleChange={event => setCliente(event.currentTarget.value)} />
            <Input className={css(styles.inputCli)} value={mesa} type={'number'} placeholder={'Mesa'} handleChange={event => setMesa(event.currentTarget.value)} />
          </div>

          <h3 className={css(styles.tituloPedido)}>Pedido</h3>

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
              <button className={css(styles.btnAdicionar)} onClick={addOptionsAndExtras}>Adicionar</button>
            </div>
          ) : false}



          {pedido.map(elem => (
            <div>
              <div className={css(styles.caixaPedidos)}>
                <span className={css(styles.letras)}>
                  {elem.Nome}
                </span>
                <span className={css(styles.letras)}>
                  R$ {elem.Preço} ,00
              </span>
                <ButtonGeral className={css(styles.btnDeletar)}
                  onClick={(e) => { e.preventDefault(); deletarPedido(elem) }}
                  img={trash}
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

  divBtnCardapio:{
  width:'100%',
  display:'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around'
  },

  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100vh',
    // background: '#1C150F'
    // background:'#303030'
    // background:'#403501'
    // background:'#404040'
    // // background: '#7c7676'
    // backgroundImage: 'url("./img/Fundo.jpg")',
    backgroundImage: `url(${imgFundo})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    backgroundAttachment: 'fixed',
    // width: '100vw'
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
    color:'rgb(255, 153, 0)',
    textShadow: '8px 8px black'
    // margin: 'green'
  },

  img: {
    // width: '30%',
    width: '14%'
  },

  main: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: 'none'
  },

  tituloCardapio: {
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

  divBtnFiltro: {
    display: 'flex',
    justifyContent: 'space-around',
  },

  btnFiltro: {
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

  cardapio: {
    display: 'block',
    // background: '#720201',
    // borderColor: '#CC6600',
    color: 'white',
    margin: '10px',
    padding: '10px',
    borderRight: '4px solid white',
    // border: '4px solid white',
    width: '55%',
    // borderRadius: '10px',
    justifyContent: 'space-around',
    alignItems: 'center'
  },

  pedidos: {
    display: 'block',
    // background: '#FF9900',
    color: '#FFF',
    margin: '10px',
    padding: '10px',
    // border: '1px solid #CC6600',
    width: '45%',
    borderRadius: '20px'
  },

  tituloPedido: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '25px'
  },

  btnRadio: {
    //border: '0px',
    // width: '100%',
    // left: '2em'
    //display: 'flex',
    // position: 'relative',
    // paddingLeft:' 35px',
    // marginBottom: '12px',
    // cursor: 'pointer',
    // fontSize: '18px',
    // height: '1em',
    // width:'2em',
    // height: '1vh',
    // width:'1vw'
    position: 'relative',
    fontSize: '20px',
    bottom: '0',
    right: '0',
    left: '0',
    color: 'rgba(#000, .4)'
  },

  letras: {
    // fontSize: '40px'
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
    // display: 'flex',
    // flexdirection: 'row',
    // padding: '5px',
    // marginBottom: '7%',
    // alignItems: 'center'
  },

  caixaPedidos: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
    // fontSize: '16px'
  },

  btnDeletar: {
    marginLeft: '0,5%',
    marginBottom: '8px',
    marginRight: '10%'
  },

  btnAdicionar: {
    boxShadow: '0-3px 5px #555',
    borderColor: 'rgb(255, 153, 0)',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '20px',
    borderRadius: '10px',
    marginBottom: '8px'
  },

  btnEnviar: {
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

  btnCozinha: {
    boxShadow: '0-3px 5px #555',
    fontWeight: 'bold',
    backgroundColor: 'white',
    padding: '10px',
    marginTop: '20px',
    marginLeft: '80px'
  }
})
