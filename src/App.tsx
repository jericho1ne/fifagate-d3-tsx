import React from 'react';
import Header from './components/Header'
import ForceGraph from './components/ForceGraph'

import logo from './logo.svg'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Header title="FIFA Payoff Schemes, 1987-2014"></Header>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ForceGraph />
      </header>
    </div>
  );
}

export default App;
