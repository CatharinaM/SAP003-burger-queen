import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Hall from './Paginas/Hall/index';
import kitchen from './Paginas/kitchen/index';
import Nav from './Componentes/Nav/index';
// import Transição from './Paginas/Transição/index';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Nav} />
        <Route path="/Hall" component={Hall} />
        <Route path="/kitchen" component={kitchen} />
        {/* <Route path="/Transição" component={Transição} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
