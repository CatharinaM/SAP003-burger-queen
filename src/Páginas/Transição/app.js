import React, { useState, useEffect } from 'react'
import firebase from 'firebase'
import ButtonGeral from '../../Componentes/Button/button';


function Transição () {

    const [pedido, setPedido] = useState([])
   
    useEffect(
        () => {
            firebase.firestore().collection('Pedidos').get().then(querySnapshot => {
                const pedido = [];
                querySnapshot.forEach(doc => { 
                    pedido.push({id: doc.id,
                        ...doc.data()})
                })
                setPedido(pedido)
            })
        },
        []
    )

    const updateStatus = (doc) => {
        doc.status = "Entregue";
        firebase.firestore().collection('Pedidos').doc(doc.id).update({
            status: "Entregue"
        }).then(
            setPedido([...pedido])
        )
    } 


//CONTA  DO TEMPO DE PREPARO DA COMIDA
const time = (item) => {
    const timestamp = (item.timeK - item.time) / 1000;
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor((timestamp - hours * 60 * 60) / 60);
    const seconds = Math.floor(timestamp - hours * 60 * 60 - minutes * 60 );
    return hours + ':' + minutes + ':' +  seconds
}

return (
    <div>
         <div>
            {pedido.map((doc, indexItem) => 
            <div key={indexItem}>
                {doc.status === 'Pronto' ?
                    <div>
                        <p>Mesa: {doc.mesa}</p>
                        <p>Nome: {doc.cliente}</p>
                        {doc.pedido.map(item => item.Nome)}
                        <p>time: {time(doc)}</p>
                        <ButtonGeral OnClick={() => updateStatus(doc)} title={'Entregue'}></ButtonGeral>
                        
                    </div>                
                : false}
            </div>)}
        </div>
        
        <div>
            
            {pedido.map((doc, indexItem) => 
            <div key={indexItem}>
                {doc.status === 'Pronto' ?
                <div>
                <h1>Finalizado</h1>
                    <div>
                        <p>Mesa: {doc.mesa}</p>
                        <p>Nome: {doc.cliente}</p>
                        <p>time: {time(doc)}</p>
                        {doc.pedido.map(item => 
                            <p>{item.Nome}</p>)}
                    </div>  
                    </div>              
                : false}
            </div> )}
        </div>
    </div>
  )
 }


export default Transição
