import React from 'react';
import Header from './components/Header'
import SchemeSwitcher from './components/SchemeSwitcher'

import styles from './App.module.scss'

function App() {
  return (
    <div className={styles.App}>
      <Header title="FIFA Payoff Schemes, 1987-2014"></Header>
      <div className="schemes">
        <SchemeSwitcher />
      </div>
    </div>
  );
}

export default App;
