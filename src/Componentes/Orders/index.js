import db from "../../firebase";

  
function Orders(props) {
  
    const [selecionados, setSelecionados] = useState([tipoMenu])

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


  export default Orders;
