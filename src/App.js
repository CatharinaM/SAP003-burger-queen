import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Salão from './Páginas/Salão/app';
import Cozinha from './Páginas/Cozinha/app';
import Nav from './Componentes/Nav/app';
import Transição from './Páginas/Transição/app';

 
  
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
 