import { motion } from 'framer-motion'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Backdrop from '@components/Backdrop'
import styles from './Modal.module.scss'

const slideAnim = {
  hidden: {
    x: '100vw',
    opacity: .85
  },
  visible: {
    x: '0',
    opacity: 1,
    transition: {
      duration: 0.3,
      type: 'spring',
      damping: 60,
      stiffness: 650,
    }
  },
  exit: {
    x: '100vw',
    opacity: 0,
    transition: {
      duration: 0.15,
      type: 'spring',
      damping: 80,
      stiffness: 800,
    }
  }
}

const Modal = ({ handleClose, props }) => {

  return (
    <Backdrop onClick={handleClose}>
      <motion.div 
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
        className={styles.modal}
        variants={slideAnim}
        initial='hidden'
        animate='visible'
        exit='exit'
      >
        <>
          <div className={styles.modal__header} 
            style={{ 'backgroundColor': props?.brandColor || '#333' }} 
          > 
            <span className={styles.modal__iconclose} onClick={handleClose} >
              <img src="/icon-close.svg" alt="Close modal"  />
            </span>
            <img className={styles.modal__bannerimage} src={props?.logo} />
          </div>
          <div className={styles.modal__body} >
            <h2>{ props?.appName || "App name" }</h2>
            <h3>{ props?.appSubtitle || "App subtitle" }</h3>
            <p>by { props?.appPublisher || "Publisher" }</p>
          </div>
          <div className={styles.modal__body} >
            <img className={styles.modal__heroimage} src={props?.appHeroImage} />
          </div>
          <div>
            <h3>Description</h3>
            { documentToReactComponents(props?.appDescription) }
          </div>
          { props?.appHighlights &&
          <div>
            <h3>Highlights / Features</h3>
            { documentToReactComponents(props?.appHighlights) }
          </div>
          }
          { props?.appRequirements &&
          <div>
            <h3>Requirements</h3>
            { documentToReactComponents(props?.appRequirements) }
          </div>
          }
          { props?.appIntegrationSetup &&
          <div>
            <h3>Setup</h3>
            { documentToReactComponents(props?.appIntegrationSetup) }
          </div>
          }
          { props?.support && 
          <div>
            <h3>Support</h3>
            { documentToReactComponents(props?.support) }
          </div>
          }
          
          <div>
            <button onClick={handleClose}>Close</button>
          </div>
        </>
      </motion.div>
    </Backdrop>
  )
} 

export default Modal
