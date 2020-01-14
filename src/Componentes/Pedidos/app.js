import db from "../../firebase";

// import React from 'react'
  
function Pedidos(props) {
  
    const [selecionados, setSelecionados] = useState([tipoMenu])

    // Add a new document with a generated id.
// let addDoc = db.collection('cities').add({
//   name: 'Tokyo',
//   country: 'Japan'
// }).then(ref => {
//   console.log('Added document with ID: ', ref.id);
// });

    //TEM Q TÁ AQUI OU NO SALÃO OU NO MENU?
    // useEffect(() => {
    //     db.collection('Pedidos').add()
          
    //       }, [])

   //OU
    // function onSubmit(e){
    //     e.preventDefault()

    //     db.collection('Pedidos').add({
    //         title,
    //         R$
    //     })
    //     .then(()=>{
    //         setSelecionados('')
    //     })
    // }

    return (
        <div>
           { selecionados.map((props) => (
               <div> 
                   <p>{props.Nome}</p>
                   <p>{props.Preço}</p>
               </div>

           ))}
            
        </div>
        )
      
  }


// const Pedidos = ({itens}) => (
//       <>
//       <h3> Itens selecionados</h3>
//       {itens.map((item) => (
//           <>
//               <div>{item.Nome}</div>
//               <span>R$ {item.Preço}</span>
//           </>
//       ))}
//       </>
//     );



//     return (
//     <div>
//     className={props.className}
//      onclick={props.onClick} >
//      {props.title}
//      <br></br>
//      <p>R$ {props.R$},00</p>
//     </div>
//   )
// }
  
 
  
//   export default Pedidos;