//FUNÇÃO FILTRAR
// document.getElementById("option-filter").addEventListener("change", filterMenu);
// const optionFilter = document.getElementById("option-filter");

// function filterMenu() {
//   let resposta = "";
//   const filterType = optionFilter.value;
//   const arrayFiltrada = data.filter(Menu, filterType);
//   arrayFiltrada.map(elem => resposta += ....(elem));
//   optionFilter.innerHTML = `<p> ${(arrayFiltrada)}.</p>`;
// }

//  function handleSubmit(event){
//   event.preventDefault();

//   console.log(menu)
// }


// db.collection('Menu').where('breakfast', '==', true)
// .onSnapshot(querySnapshot => {
//   console.log(querySnapshot)
//   querySnapshot.docChanges().forEach(change => {
//       console.log('New city: ', change.doc.data());
//   });
// });

//     return (
//       <>
//         <p>Café da manhã</p>
//         <button onClick = {() => setMenu(true)}> 
//         Exibir
//         </button>

//         <form onSubmit={handleSubmit}>
//             <label> Nome e número da mesa</label>
//           <input
//           id="nome e número"
//           type="text"
//           placeholder="Nome e número da mesa"
//           valeu ={menu}
//           onChage={event => setMenu(event.targer.value)}>
//           </input>
//         </form >

//         {menu}
//       </>
//     ) 
// }



// function App () {
//   useEffect(() => {
//     db.collection('Menu').get()
//     .then((snapshot) => {
//       snapshot.forEach((doc) => {
//         console.log(doc.id, '=>', doc.data());
//       });
//     })
//     }, [])
//     return (
//       <div></div>
//     ) 
// }

// useEffect(() => {
// firebase.firestore().collection('Teste').add({
//   nome:'eu'
//   });
// });

///function Cardápio() {
// const [menu, setMenu] = useState (0);

// useEffect(() => {
//   db.collection('Menu').get()
//   .then((snapshot) => {
//     snapshot.forEach((doc) => {
//       console.log(doc.id, '=>', doc.data());
//     });
//   })
//   }, [])

// return (
//   <div>
//     <p> </p>
//     <button onClick={() => setCount(count + 1)}>
//       Click me
//     </button>
//   </div>
// );
//}

// useEffect(() => {
// db.collection('Menu').get()
// .then((snapshot) => {
//   snapshot.forEach((doc) => {
//     console.log(doc.id, '=>', doc.data());
//   });
// })
// }, [])


// const renderMenu = () => {

// }

// const onClick = () => {

// }
