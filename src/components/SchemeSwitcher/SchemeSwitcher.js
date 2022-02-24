import styles from './SchemeSwitcher.module.scss'

// import { motion, AnimatePresence } from 'framer-motion'
// import Router from 'next/router'
import React, { Component, useState, useEffect } from 'react'
import { getSchemeData } from '../utils/helpers'

export default class SchemeSwitcher extends Component {
  state = {
    currentSchemeLetter: '',
    currentSchemeDetails: '',
    appTiles: [],
  }

  async componentDidMount() {
    console.log(" SchemeSwitcher componentDidMount")
  }

  /**
   * Actions to perform on modal open
   * @param {*|string} e Either a Click event, or a string
   */
  loadScheme = async (e) => {
    const scheme = e?.target?.getAttribute('data-scheme')

    getSchemeData(scheme)

    this.setState({ 
      currentScheme: scheme,
      currentSchemeDetails: [],
    })
  } 

  render() {
    const { currentScheme } = this.state

    return (
      <>
        <button onClick={(e) => this.loadScheme(e)} data-scheme="A">Scheme A</button>
        <button onClick={(e) => this.loadScheme(e)} data-scheme="B">Scheme B</button>
        <button onClick={(e) => this.loadScheme(e)} data-scheme="C">Scheme C</button>
        <button onClick={(e) => this.loadScheme(e)} data-scheme="D">Scheme D</button>
        <button onClick={(e) => this.loadScheme(e)} data-scheme="E">Scheme E</button>
      </>
    )// end Return
  } // end render

} // end ListView

