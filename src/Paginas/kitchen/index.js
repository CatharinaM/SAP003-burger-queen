import firebase from 'firebase';
import ButtonGeral from '../../Componentes/Button/button';
import db from '../../firebase'
import React, { useState, useEffect } from 'react';
import Card from '../../Componentes/Card/card';
import { Link } from 'react-router-dom';
import { StyleSheet, css } from 'aphrodite';
import imgbackground from '../../Componentes/img/background.jpg';

function kitchen() {

    const [order, setorder] = useState([]);

    useEffect(() => {
        db.collection('Pedidos').get()
            .then((snapshot) => {
                const Neworders = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))

                setorder(Neworders)

            })
    }, [0])

    const addStatus = (doc) => {
        doc.status = "Pronto";
        firebase.firestore().collection('Pedidos').doc(doc.id).update({
            status: "Pronto",
            timeK: new Date().getTime(),

        }).then(
            setorder([...order])
        )
    }

    // console.log(order)

    return (
        <div className={css(styles.background)}>
            <header className={css(styles.header)}>
                <Link to='/Hall'>
                    <button className={css(styles.btnHall)}>Salão</button>
                </Link>

                <h2 className={css(styles.titleKitchen)}>Cozinha</h2>

            </header>

            <section className={css(styles.box)}>
                {order.map((doc, indexItem) => {
                    if (doc.status === "Preparo") {
                        return (<div key={indexItem}>
                            <Card className={css(styles.cardKitchen)}>
                                <div>
                                    {/* <p className={css(styles.textKitchenStatus)}><strong>Status:</strong> Preparando... </p> */}
                                    <span className={css(styles.textKitchen)}><strong>Cliente:</strong> {doc.client} </span>
                                    <span className={css(styles.textKitchen)}><strong>Mesa:</strong> {doc.table}</span>
                                    <p className={css(styles.textKitchen)}><strong>Pedido foi feito às:</strong> {doc.time}</p>
                                </div>
                                {
                                    doc.order
                                        ? doc.order.map(item => <p className={css(styles.textKitchen)}>{item.Nome}</p>)
                                        : null
                                }
                                <ButtonGeral className={css(styles.btnReady)} onClick={() => addStatus(doc)}
                                    title={'Pronto'} />
                            </Card>
                        </div>)
                    }
                }
                )}
            </section>
        </div>

    )
}

export default kitchen

const styles = StyleSheet.create({
    background: {
        backgroundImage: `url(${imgbackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    header: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%'
    },

    box: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginBottom:'20px'
    },

    cardKitchen: {
        border: 'solid',
        backgroundColor: 'white',
        borderRadius: '4px',
        borderColor: '#CC9933',
        width: '35rem',
        alignItems: 'center',
        justifyContent: 'space-around',
        fontSize: '25px',
        boxShadow: '0-3px 5px #555',
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
        padding: '18px 0px'
    },

    // textKitchenStatus:{
    //     color: 'red',
    // fontSize: '20px',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginLeft: '30px',
    // },

    textKitchen: {
        marginLeft: '20px',
    },

    btnHall: {
        ':hover': {
            backgroundColor: ' #8C8C8C',
        },
        boxShadow: '0-3px 5px #555',
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: '10px',
        width: '100px'
    },

    titleKitchen: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '70px',
        fontFamily: 'Just Me Again Down Here',
        fontStyle: 'cursive',
        color: 'white',
        textShadow: '8px 8px black',
        marginRight: '33%'
    },

    btnReady: {
        ':hover': {
            backgroundColor: '#087C35',
        },
        boxShadow: '0-3px 5px #555',
        fontWeight: 'bold',
        backgroundColor: 'white',
        padding: '10px',
        width: '80px'
    }

})