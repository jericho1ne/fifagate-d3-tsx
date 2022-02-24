import { Component } from 'react'
import ForceGraph from '../ForceGraph'

import LocalContext from '../../context/LocalContext';

import styles from './SchemeSwitcher.module.scss'


import schemeA from '../_data/scheme-A.json'
import schemeB from '../_data/scheme-B.json'
import schemeC from '../_data/scheme-C.json'
import schemeD from '../_data/scheme-D.json'
import schemeE from '../_data/scheme-E.json'
import schemeF from '../_data/scheme-F.json'
import schemeG from '../_data/scheme-G.json'
import schemeH from '../_data/scheme-H.json'
import schemeI from '../_data/scheme-I.json'
import schemeJ from '../_data/scheme-J.json'
import schemeK from '../_data/scheme-K.json'
import schemeL from '../_data/scheme-L.json'

const allSchemes = {
  "A": schemeA,
  "B": schemeB,
  "C": schemeC,
  "D": schemeD,
  "E": schemeE,
  "F": schemeF,
  "G": schemeG,
  "H": schemeH,
  "I": schemeI,
  "J": schemeJ,
  "K": schemeK,
  "L": schemeL,
}

export default class SchemeSwitcher extends Component {
  state = {
    currentScheme: 'A',
    currentSchemeDetails: schemeA,
  }

  async componentDidMount() {
    //
  }

  /**
   * @param {string} schemeLetter Single letter representing a scheme
   */
  loadScheme = (schemeLetter) => {
    this.setState({ 
      currentScheme: schemeLetter,
      currentSchemeDetails: allSchemes[schemeLetter],
    })
  } 

  render() {

    return (
      <LocalContext.Provider 
        value={this.state.currentSchemeDetails}
      >
        <div className={styles.switcher} >
          <div className={styles.switcher__nav}>
            {Object.keys(allSchemes).map((letter, i) => (
              <button 
                key={`${letter}-${i}`} 
                onClick={() => this.loadScheme(letter)} 
                data-scheme={letter}>{`Scheme ${letter}`}</button>
            ))}

          </div>
          <div className={styles.switcher__graph}>
            <ForceGraph />
          </div>
        </div>
      </LocalContext.Provider>
    )// end Return
  } // end render

} // end ListView