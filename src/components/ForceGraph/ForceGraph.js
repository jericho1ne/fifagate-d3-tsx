import styles from './ForceGraph.module.scss'

import ForceGraph2D from 'react-force-graph-2d'
import LocalContext from "../../context/LocalContext"

const ForceGraph = ({props}) => {
  console.log(props)

  return (
    <LocalContext.Consumer>
      {value => (
        <div className={styles.fgParent}>
          <p>{value}</p>
          <ForceGraph2D
            graphData={value}
            nodeAutoColorBy="details.type"
          />
        </div>  
      )}
    </LocalContext.Consumer>
    
  )// end Return

} 

export default ForceGraph
