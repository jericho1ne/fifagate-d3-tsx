import styles from './ForceGraph.module.scss'
// import { motion, AnimatePresence } from 'framer-motion'
// import Router from 'next/router'
import React, { Component, useState, useEffect } from 'react'

import flags from '../data/flags.json'
import legend from '../data/legend.json'
// import schemeA from '../data/scheme-A.json'
// import schemeB from '../data/scheme-B.json'
// import schemeC from '../data/scheme-C.json'
// import schemeD from '../data/scheme-D.json'

export default class ForceGraph extends Component {
  state = {
    currentSchemeLetter: '',
    currentSchemeDetails: '',
  }

  async componentDidMount() {
    //
  }

  /**
   * Actions to perform on modal open
   * @param {*|string} e Either a Click event, or a string
   */
  openModal = async(e) => {
    this.setState({ 
      isModalOpen: true, 
      currentAppCode: "",
      currentSchemeDetails: [],
    })
  } 

  render() {
    return (
      <div className={styles.uniqueClass}>
        {/* <div className={styles.tiles}>
          {appTiles.map(({
            appCode, 
            appName, 
            logo, 
            brandColor,
            appPublisher,
            appIntegrationCategory,
          }, i) => (
            <div key={`${appCode}-${i}`} className={styles.tile}>
              <span className={styles.appCode}>{appCode}</span>
              <span className={styles.appLogoParent}>
                <span className={styles.applogo} style={{ backgroundColor: brandColor }}><img src={logo}></img></span>
              </span>
              <span className={styles.appPublisher}><h2>{appName}</h2><h5>by {appPublisher}</h5></span>
              <span className={styles.appCategory}>{appIntegrationCategory}</span>
              <span className={styles.appPreview}>

                <motion.button 
                  whileHover={{ scale: 1 }}
                  whileTap= {{ scale: 0.975 }}
                  className={styles.button}
                  data-appcode={appCode}
                  onClick={(e) => (isModalOpen ? closeModal() : this.openModal(e)) }
                >
                  Preview
                </motion.button>
              </span>
            </div> 
          ))} 
        </div>  }
      */}
      </div>
    )// end Return
  } // end render

} // end ListView

