import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './index.css';

import App from '../src/pages/home/App';
import reportWebVitals from './reportWebVitals';
import cadastroClassificado from './pages/cadastro-classificados/cadastroClassificado'


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/cadastroClassificado" component={cadastroClassificado}/>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
