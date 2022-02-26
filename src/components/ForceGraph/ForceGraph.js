import styles from './ForceGraph.module.scss'
import { useContext } from 'react'

import ForceGraph2D from 'react-force-graph-2d'
import legend from '../_data/legend.json'

import { schemeContext } from "../SchemeSwitcher/SchemeSwitcher"

const ForceGraph = () => {
  const schemes = useContext(schemeContext)

  const currentScheme = schemes.currentSchemeDetails

  return (
    <div className={styles.fg}>
      {/* 
      All parameters:

      https://github.com/vasturiano/react-force-graph/blob/master/src/packages/react-force-graph-2d/index.d.ts#L42-L121
      */}
      <ForceGraph2D
        graphData={currentScheme}
        enablePanInteraction={true}
        enableZoomInteraction={true}
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.id;
          const fontSize = 12/globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          
          const textWidth = ctx.measureText(label).width;
          const bckgDimensions = 
            [textWidth, fontSize].map(n => n + fontSize * .85); // some padding

          ctx.nodeRadius = 20
          ctx.linkStrokeWidth = 10
          ctx.linkDistance = 550
          const bgColor = legend.actors[node.details.type].color

          ctx.fillStyle = `${bgColor}`;

          ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          ctx.fillStyle = "#fff";
          ctx.fillText(label, node.x, node.y);

          // Re-used in nodePointerAreaPaint
          node.__bckgDimensions = bckgDimensions; 
        }}
        nodePointerAreaPaint={(node, color, ctx) => {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.95)';
          const bckgDimensions = node.__bckgDimensions;
          bckgDimensions && ctx.fillRect(
            node.x - bckgDimensions[0] / 2, 
            node.y - bckgDimensions[1] / 2, ...bckgDimensions
          );
        }}
      />
    </div>  
    
  )// end Return

} 

export default ForceGraph
