import { Component } from 'react'
import ForceGraph from '../ForceGraph'

import LocalContext from '../../context/LocalContext';

import styles from './SchemeSwitcher.module.scss'


import schemeA from '../data/scheme-A.json'
import schemeB from '../data/scheme-B.json'
import schemeC from '../data/scheme-C.json'
import schemeD from '../data/scheme-D.json'
import schemeE from '../data/scheme-E.json'

const allSchemes = {
  "A": schemeA,
  "B": schemeB,
  "C": schemeC,
  "D": schemeD,
  "E": schemeE,
}

export default class SchemeSwitcher extends Component {
  state = {
    currentScheme: 'A',
    currentSchemeDetails: schemeA,
  }

  async componentDidMount() {
    console.log(" ----------- SchemeSwitcher componentDidMount")
    console.log(this.context)
  }

  /**
   * Actions to perform on modal open
   * @param {*|string} e Either a Click event, or a string
   */
  loadScheme = async (e) => {
    const scheme = e?.target?.getAttribute('data-scheme')

    this.setState({ 
      currentScheme: scheme,
      currentSchemeDetails: allSchemes[scheme],
    })
  } 

  render() {

    return (
      <LocalContext.Provider 
        value={this.state.currentSchemeDetails}
      >
        <div className={styles.switcher} >
          <div className={styles.switcher__nav}>
            <button onClick={(e) => this.loadScheme(e)} data-scheme="A">Scheme A</button>
            <button onClick={(e) => this.loadScheme(e)} data-scheme="B">Scheme B</button>
            <button onClick={(e) => this.loadScheme(e)} data-scheme="C">Scheme C</button>
            <button onClick={(e) => this.loadScheme(e)} data-scheme="D">Scheme D</button>
            <button onClick={(e) => this.loadScheme(e)} data-scheme="E">Scheme E</button>
          </div>
          <div className={styles.switcher__graph}>
            <ForceGraph />
          </div>
        </div>
      </LocalContext.Provider>
    )// end Return
  } // end render

} // end ListView

