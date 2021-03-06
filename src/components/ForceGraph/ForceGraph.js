import styles from './ForceGraph.module.scss'

import ForceGraph2D from 'react-force-graph-2d'
import LocalContext from "../../context/LocalContext"
import legend from '../_data/legend.json'

const ForceGraph = () => {
  // function dothis() {
  //   console.log("here")
  //   thing.select('svg').selectAll('*').remove()
  // }

  return (
    <LocalContext.Consumer>
      {context => (
        <div className={styles.fg}>
          {/* 
          All parameters:

          https://github.com/vasturiano/react-force-graph/blob/master/src/packages/react-force-graph-2d/index.d.ts#L42-L121
          */}
          <ForceGraph2D
            graphData={context}
            enablePanInteraction={true}
            enablePointerInteraction={true}
            enableZoomInteraction={true}
            minZoom={3}
            maxZoom={100}
            // nodeStrokeWidth={10}
            // nodeRadius={10}
            // linkStrokeWidth={4}
            // charge={-10}
            nodeCanvasObject={(node, ctx, globalScale) => {
              const label = node.id;
              const fontSize = 12/globalScale;
              ctx.font = `${fontSize}px Sans-Serif`;
              
              const textWidth = ctx.measureText(label).width;
              const bckgDimensions = 
                [textWidth, fontSize].map(n => n + fontSize * .85); // some padding

              // Label rectangle, bg color
              const bgColor = legend.actors[node.details.type].color
              ctx.fillStyle = `${bgColor}`;
              ctx.fillRect(
                node.x - bckgDimensions[0] / 2, 
                node.y - bckgDimensions[1] / 2, 
                ...bckgDimensions
              );
  
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';

              ctx.fillStyle = "#fff";
              ctx.fillText(label, node.x, node.y);
  
              // Re-used in nodePointerAreaPaint
              node.__bckgDimensions = bckgDimensions; 
            }}
            nodePointerAreaPaint={(node, color, ctx) => {
              ctx.fillStyle = 'rgba(255, 0, 0, 0.95)'

              const bckgDimensions = node.__bckgDimensions;
              bckgDimensions && ctx.fillRect(
                node.x - bckgDimensions[0] / 2, 
                node.y - bckgDimensions[1] / 2,
                ...bckgDimensions
              );
            }}
          />
        </div>  
      )}
    </LocalContext.Consumer>
    
  )// end Return

} 

export default ForceGraph
