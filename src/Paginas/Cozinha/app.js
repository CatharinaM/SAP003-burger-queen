import firebase from 'firebase';
import ButtonGeral from '../../Componentes/Button/button';
import db from '../../firebase'
import React, { useState, useEffect } from 'react';
import Card from '../../Componentes/Card/card';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import imgFundo from '../../Componentes/img/Fundo.jpg';

function Cozinha() {

    const [pedido, setPedido] = useState([]);

    useEffect(() => {
        db.collection('Pedidos').get()
            .then((snapshot) => {
                const NewPedidos = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setPedido(NewPedidos)

            })
    }, [0])

    const addStatus = (doc) => {
        doc.status = "Pronto";
        firebase.firestore().collection('Pedidos').doc(doc.id).update({
            status: "Pronto",
            timeK: new Date().getTime(),

        }).then(
            setPedido([...pedido])
        )
    }

    console.log(pedido)

    return (
        <div className={css(styles.fundo)}>
            <header>
                <h2 className={css(styles.tituloCozinha)}>Cozinha</h2>
                <Link to='/Salão'>
                    <button className={css(styles.btnSalao)}>Salão</button>
                </Link>
            </header>
            {pedido.map((doc, indexItem) => {
                if (doc.status === "Preparo") {
                    return (<div className={css(styles.caixas)} key={indexItem}>
                        <Card className={css(styles.cardCozinha)}>
                            <div className={css(styles.cardCozinhaPedidos)}>
                                {/* <p className={css(styles.textCozinhaStatus)}><strong>Status:</strong> Preparando... </p> */}
                                <p className={css(styles.textCozinha)}><strong>Cliente:</strong> {doc.cliente} </p>
                                <p className={css(styles.textCozinha)}><strong>Mesa:</strong> {doc.mesa}</p>
                                <p className={css(styles.textCozinha)}><strong>Pedido foi feito às:</strong> {doc.time}</p>
                            </div>
                            {
                                doc.pedido
                                    ? doc.pedido.map(item => <p className={css(styles.textCozinha)}>{item.Nome}</p>)
                                    : null
                            }
                            <ButtonGeral className={css(styles.btnPronto)} onClick={() => addStatus(doc)}
                                title={'Pronto'} />
                        </Card>
                    </div>)
                }
            }
            )}
        </div>
    )
}

export default Cozinha

const styles = StyleSheet.create({

    cardCozinha: {
        border: 'solid',
        // color: 'white',
        backgroundColor: 'white',
        borderRadius: '4px',
        borderColor: '#CC9933',
        width: '30rem',
        marginBottom: '10px',
        marginTop: '6px',
        marginLeft: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px',
        boxShadow: '0-3px 5px #555',
    },

    caixas: {
        // display: 'inline-block',
        // alignItems: 'center',
        // justifyContent: 'center'
    },

    textCozinhaStatus:{
        color: 'red',
        fontSize: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '30px',
    },

    textCozinha: {
        fontSize: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '30px',
    },

    btnSalao: {
        boxShadow: '0-3px 5px #555',
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: '10px',
        marginTop: '20px',
        marginLeft: '80px',
        marginBottom: '8px',
        width: '100px'
    },

    // cardCozinhaPedidos:{
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     fontSize:'25px'
    // },

    tituloCozinha: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '70px',
        fontFamily: 'Just Me Again Down Here',
        fontStyle: 'cursive',
        color: 'white',
        textShadow: '8px 8px black',
    },

    fundo: {
        // backgroundColor:' rgb(255, 153, 0)',
        backgroundImage: `url(${imgFundo})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        // columnCount: '2',
        // columnGap: '20px',    
        // display: 'grid',
        // gridTemplateColumns: '1fr 2fr',
        justifyContent: 'space-around',
        alignItems: 'center'
        // height: '100vh',
        // width: '100vw'
    },

    btnPronto: {
        ':hover': {
            backgroundColor: '#087C35',
          },
        boxShadow: '0-3px 5px #555',
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: '10px',
        marginTop: '20px',
        marginLeft: '100px',
        marginBottom: '20px',
        width: '80px'
    }


})