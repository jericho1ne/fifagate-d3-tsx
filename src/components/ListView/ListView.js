import styles from './ListView.module.scss'
import { motion, AnimatePresence } from 'framer-motion'
import Router from 'next/router'
import React, { Component, useState, useEffect } from 'react'
import { fetchEntries, fetchSingleEntry } from 'utils/contentful'

import Modal from '@components/Modal'

export default class ListView extends Component {
  state = {
    isModalOpen: false,
    currentAppCode: '',
    currentAppDetails: '',
    appTiles: [],
  }

  async componentDidMount() {
    // Get list of App tiles
    const res = await fetchEntries()
    // Clean up mapping
    const appTiles = await res.map((t) => {
      let tileFields = t.fields
      tileFields.logo = t.fields.logoSquare?.fields?.file?.url || t.fields.logo?.fields?.file?.url 
      tileFields.appHeroImage =  t.fields?.appHeroImage?.fields?.file?.url
      return tileFields
    })
    this.setState({ appTiles: appTiles})


    // Parse URL hash (if any)
    if (Router.asPath.includes('#')) {
      let urlHashMatches = Router?.asPath?.match(/#([a-z0-9]+)/gi )

      if (urlHashMatches && urlHashMatches.length) {
        const firstMatch = urlHashMatches[0]
        this.setState({ currentAppCode: firstMatch.slice(1, firstMatch.length) })
        this.openModal(firstMatch.slice(1, firstMatch.length))
      }
    }
  }

  /**
   * Actions to perform on modal open
   * @param {*|string} e Either a Click event, or a string
   */
  openModal = async (e) => {
    document.body.style.overflow = 'hidden'

    let currentAppCode = ''

    // Get appCode and append to url
    if (e?.target?.getAttribute('data-appcode')) {
      currentAppCode = e?.target?.getAttribute('data-appcode')
    } else {
      currentAppCode = e
    }
    
    window.location.hash = `${currentAppCode}`
    
    let tileDetails = {}
    const entries = await fetchSingleEntry(currentAppCode)

    if (entries[0] && entries[0]?.fields) {
      tileDetails = entries[0].fields
      // Only need the full Asset URL, so we can overwrite all the metadata
      tileDetails.logo = tileDetails?.logo?.fields?.file?.url
      tileDetails.appHeroImage = tileDetails?.appHeroImage?.fields?.file?.url
    }
    this.setState({ 
      isModalOpen: true, 
      currentAppCode: currentAppCode,
      currentAppDetails: tileDetails,
    })
  } 

  render() {
    const { appTiles, isModalOpen, currentAppDetails } = this.state

    /**
     * Actions to perform when the modal is closed
     */
    const closeModal = () => {
      document.body.style.overflow = 'auto'
      window.location.hash = ''

      this.setState({ 
        isModalOpen: false,
        currentAppCode: '',
        currentAppDetails: {},
       })
    } 

    return (
      <>
        {/* App Tiles Listing */}
        <div className={styles.tiles}>
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
        </div> 

        {/* Slide In Modal */}
        <AnimatePresence
            initial={false}
            exitBeforeEnter={true}
            onExitComplete={()=>null}
          >
          {isModalOpen && 
            <Modal 
              // modalOpen={ modalOpen } 
              handleClose={ closeModal } 
              props={ currentAppDetails } 
            />
          }
        </AnimatePresence>
      </>
    )// end Return
  } // end render

} // end ListView

