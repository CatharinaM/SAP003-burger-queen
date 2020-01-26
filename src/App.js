import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Salão from './Paginas/Salão/app';
import Cozinha from './Paginas/Cozinha/app';
import Nav from './Componentes/Nav/app';
import Transição from './Paginas/Transição/app';

 
   
function App() {
  
  return (
 
    <BrowserRouter>
       {/* <div>
        <img  src={require('../src/Componentes/img/BGB.npg')} alt="Logo da imagem"></img>
      </div> */}
        <Switch>
          <Route exact path="/" component={Nav} />
          <Route path="/Salão" component={Salão} />
          <Route path="/Cozinha" component={Cozinha} />
          <Route path="/Transição" component={Transição} />
        </Switch>
    </BrowserRouter>
  );
}

export default App;
 