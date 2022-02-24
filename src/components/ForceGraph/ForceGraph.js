import styles from './ForceGraph.module.scss'
// import { motion, AnimatePresence } from 'framer-motion'
// import Router from 'next/router'
import React, { Component, useState, useEffect } from 'react'
// import { fetchEntries, fetchSingleEntry } from 'utils/contentful'


import flags from '../data/flags.json'
import legend from '../data/legend.json'
import schemeA from '../data/scheme-A.json'
import schemeB from '../data/scheme-B.json'
import schemeC from '../data/scheme-C.json'
import schemeD from '../data/scheme-D.json'


export default class ForceGraph extends Component {
  state = {
    currentSchemeLetter: '',
    currentSchemeDetails: '',
    appTiles: [],
  }

  async componentDidMount() {

    console.log(flags)
    console.log(legend)
    console.log(schemeA)
    console.log(schemeB)
    console.log(schemeC)
    console.log(schemeD)

    // Get list of App tiles
    // const res = await fetchEntries()
    // // Clean up mapping
    // const appTiles = await res.map((t) => {
    //   let tileFields = t.fields
    //   tileFields.logo = t.fields.logoSquare?.fields?.file?.url || t.fields.logo?.fields?.file?.url 
    //   tileFields.appHeroImage =  t.fields?.appHeroImage?.fields?.file?.url
    //   return tileFields
    // })
    // this.setState({ appTiles: appTiles})


    // // Parse URL hash (if any)
    // if (Router.asPath.includes('#')) {
    //   let urlHashMatches = Router?.asPath?.match(/#([a-z0-9]+)/gi )

    //   if (urlHashMatches && urlHashMatches.length) {
    //     const firstMatch = urlHashMatches[0]
    //     this.setState({ currentAppCode: firstMatch.slice(1, firstMatch.length) })
    //     this.openModal(firstMatch.slice(1, firstMatch.length))
    //   }
    // }
  }

  /**
   * Actions to perform on modal open
   * @param {*|string} e Either a Click event, or a string
   */
  openModal = async (e) => {

    this.setState({ 
      isModalOpen: true, 
      currentAppCode: "",
      currentAppDetails: [],
    })
  } 

  render() {
    const { currentScheme } = this.state

    return (
      <>
      
      </>
    )// end Return
  } // end render

} // end ListView

