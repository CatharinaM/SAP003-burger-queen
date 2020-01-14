
import firebase from 'firebase';
import ButtonGeral from '../../Componentes/Button/button';
import db from '../../firebase'
import React, { useState, useEffect } from 'react';
import Card from '../../Componentes/Card/card'
import {Link} from 'react-router-dom'
import { StyleSheet, css } from 'aphrodite'

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

    //console.log(setPedido)
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
        <div>
            <header>
                <h2>Cozinha</h2>
                <Link to='/Salão'>
                <button>Salão</button>
                </Link> 
            </header>
            {pedido.map((doc, indexItem) => {
                if (doc.status === "Preparo") {
                    return (<div key={indexItem}>
                        <Card className={css(styles.cardCozinha)}>
                        <p className={css(styles.textCozinha)}>Cliente:{doc.cliente}</p>
                        <p className={css(styles.textCozinha)}>Mesa:{doc.mesa}</p>
                        <p className={css(styles.textCozinha)}>Pedido foi feito as:{doc.time}</p>
                         {/* <span>Cliente:{doc.cliente}</span><br/>
                         <span>Mesa:{doc.mesa}</span><br/>
                         <span>Pedido:<br/>{doc.pedido}</span><br/> */}
                        {/* <p>Cliente:{doc.cliente}</p>
                        <p>Mesa:{doc.mesa}</p>
                        <p>time:{doc.timeS}</p> */}
                        {
                            doc.pedido
                                ? doc.pedido.map(item => <p>{item.Nome}</p>)
                                : null
                        }
                        <ButtonGeral onClick={() => addStatus(doc)} 
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
 
    cardCozinha:{
        border: 'solid',
        borderRadius: '4px',
        borderColor: '#CC9933',
        width: '20rem',
        marginBottom: '6px',
        marginTop: '6px'
},
    textCozinha: {
        fontSize: '20px',
    }

})