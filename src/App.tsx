import React from 'react';
import Header from './components/Header'
import SchemeSwitcher from './components/SchemeSwitcher'
import ForceGraph from './components/ForceGraph'

import logo from './logo.svg'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Header title="FIFA Payoff Schemes, 1987-2014"></Header>
      
      <div className="schemes">
        <h3>Select a scheme</h3>
        <SchemeSwitcher />
        <ForceGraph />
      </div>
    </div>
  );
}

export default App;
