import { Component } from 'react'
import ForceGraph from '../ForceGraph'

import LocalContext from '../../context/LocalContext';

import styles from './SchemeSwitcher.module.scss'


import s_A from '../_data/scheme-A.json'
import s_B from '../_data/scheme-B.json'
import s_C from '../_data/scheme-C.json'
import s_D from '../_data/scheme-D.json'
import s_E from '../_data/scheme-E.json'
import s_F from '../_data/scheme-F.json'
import s_G from '../_data/scheme-G.json'
import s_H from '../_data/scheme-H.json'
import s_I from '../_data/scheme-I.json'
import s_J from '../_data/scheme-J.json'
import s_K from '../_data/scheme-K.json'
import s_L from '../_data/scheme-L.json'

const allSchemes = {
  "A": s_A,
  "B": s_B,
  "C": s_C,
  "D": s_D,
  "E": s_E,
  "F": s_F,
  "G": s_G,
  "H": s_H,
  "I": s_I,
  "J": s_J,
  "K": s_K,
  "L": s_L,
  "ALL": { 
    "nodes": [...s_A.nodes, ...s_B.nodes, ...s_D.nodes, ...s_E.nodes, ...s_F.nodes, ...s_G.nodes, ...s_H.nodes, ...s_I.nodes, ...s_J.nodes, ...s_K.nodes, ...s_L.nodes],
    "links": [...s_A.links, ...s_B.links, ...s_D.links, ...s_E.links, ...s_F.links, ...s_G.links, ...s_I.links, ...s_I.links, ...s_J.links, ...s_K.links, ...s_L.links],
  },
}

export default class SchemeSwitcher extends Component {
  state = {
    currentScheme: 'A',
    currentSchemeDetails: s_A,
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

  is

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
                data-scheme={letter}>{(
                  letter !== "ALL"
                    ? `Scheme ${letter}`
                    : `Show All`)
                }</button>
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