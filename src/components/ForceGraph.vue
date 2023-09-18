<template>
  <div 
    id="d3-forcegraph" 
    class="chart-parent"
  />
</template>

<script setup lang="ts">
import * as d3 from 'd3'
import { computed, onMounted, onUnmounted, PropType, toRef, watch } from 'vue'

interface ForceGraphData {
  nodes: Array<any>
  links: Array<any>
}

interface D3ChartData {
  data: ForceGraphData
  title: String
  description: String
}

const props = defineProps({
  modelValue: {
    type: Object as PropType<D3ChartData>,
    required: true,
  },
})

const chartData = toRef(props, 'modelValue')
const links = computed(() => chartData.value.data?.links)
const nodes = computed(() => chartData.value.data?.nodes)

const drag = (simulation) => {    
  const dragstarted = (event) => {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }

  const dragged = (event) => {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }

  const dragended = (event) => {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
    .on('start', dragstarted)
    .on('drag', dragged)
    .on('end', dragended);
}

const intern = (val) => {
  return val !== null && typeof val === "object" ? val.valueOf() : val
}

const getLinkClass = (type) => {
  return type.toLowerCase().replace('/', '-')
}

const d3ForceSim = () => {
  if (!nodes.value.length || !links.value.length) return
  
  var width = 800, height = 600
 
  const N       = d3.map(nodes.value, d => d.id).map(intern)
  const LS      = d3.map(links.value, ({source}) => source).map(intern)
  const LT      = d3.map(links.value, ({target}) => target).map(intern)
  
  const Titles     = d3.map(nodes.value, d => d.id)
  const NodeColors = d3.map(nodes.value, d => d.color)
  
  // Clone nodes and links, allowing for mutations
  const mNodes = d3.map(nodes.value, (_, i) => ({ id: N[i] }))
	const mLinks = d3.map(links.value, (_, i) => ({
    source: LS[i],
    target: LT[i],
    details: JSON.parse(JSON.stringify(_.details))
  }))

  // console.warn(" > mLinks >", mLinks)
  
  // Construct the forces, start the simulation
	const forceLink = d3.forceLink(mLinks).id(( {index: i} ) => N[i]);
  const simulation = d3.forceSimulation(mNodes)
    .alphaDecay(.075)
    .force("link", forceLink.strength(0.15))
    .force("charge", d3.forceManyBody().strength(-800))
    .force("center",  d3.forceCenter())
    .on("tick", ticked)
  
  let chartParent = d3.select('#d3-forcegraph').append("svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", [-width / 2, -height / 2, width, height])
		.attr("style", "max-width: 100%; height: auto; height: intrinsic; background: #fff");

  d3.forceSimulation(nodes.value)
    .force('link', d3.forceLink(mLinks).id(d => d.id))
    .force('charge', d3.forceManyBody())
    .force('center', d3.forceCenter(width / 2, height / 2))
    .stop()
  
    
  // Create link paths between nodes, hiding the actual line
  const link = chartParent.append("g")
    .attr("stroke-opacity", 0) // Increase opacity to debug graph
    .attr("stroke", "#999")
    .attr("stroke-width", 0.5)
    .attr("stroke-linecap", "round")
    .selectAll("line")
    .data(mLinks)
    .join("line")
  
  // Build nodes
  const node = chartParent.append('g')
    .attr("stroke", "#222")
    .selectAll('circle')
    .data(mNodes)
    .join("circle")
      .attr("r", 10)   // node radius, in pixels
      .call(drag(simulation))
  
  // Set node fills
  if (NodeColors) node.attr("fill", ( {index: i} ) => NodeColors[i] || '#bababa')
      
  // Appends `<title>` tag inside each node's `<circle>` tag; not actually visible
  if (Titles) node.append("title").text(( {index: i} ) => Titles[i])
      
  /**
   *  Link type descriptions
   * 
   *  <marker id="Basic | Kickback | etc">
   */
   chartParent.append('defs').selectAll('marker')
    .data(mLinks)
    .enter().append('marker')
    .attr('id', (d) => d.details.type)
    .attr('viewBox', '0 -5 10 10')
    .attr('refX', 15)
    .attr('refY', -1.5)
    .attr('markerWidth', 6)
    .attr('markerHeight', 6)
    .attr('orient', 'auto')
    .append('path')
    .attr('d', 'M0,-5L10,0L0,5')
    
  // Link paths; can inherit individual CSS styles
  const path = chartParent.append('g').selectAll('path')
    .data(mLinks)
    .enter().append('path')
    .attr('class', (d) => `link link-${getLinkClass(d.details.type)}` )
    .attr('marker-end', (d) => `url(#${d.details.type})` )

      
  // Add text labels
  const text = chartParent.append("g").selectAll("text")
    .data(mNodes)
    .enter().append("text")
    .text((d)=> d.id)
    // Offset from icon marker
    .attr("x", 12)
    .attr("y", 6)
  
  // Allows for two-way elliptical arc path segments 
  const linkArc = (d) => {
    const dx = d.target.x - d.source.x,
        dy = d.target.y - d.source.y,
        dr = Math.sqrt(dx * dx + dy * dy)
        
    return `M${d.source.x},${d.source.y}A${dr},${dr} 0 0,1 ${d.target.x},${d.target.y}`
  }
  
  const transform = ((d) => `translate(${d.x + 10},${d.y})`)

  function ticked() {
    link
      .attr('x1', d => d.source.x)
      .attr('y1', d => d.source.y)
      .attr('x2', d => d.target.x)
      .attr('y2', d => d.target.y)

    text.attr("transform", transform)
    node.attr("transform", transform)
    
    path.attr('d', linkArc)
  }
}

onMounted(() => {
})

watch(props.modelValue, () => {
  d3.select('#d3-forcegraph').selectAll('*').remove()
  d3ForceSim()
})
</script>

<style lang="scss" scoped>
.chart-parent { 
  width: 100%; 
  padding: 0; 
  margin: 0;
  border: 1px solid gray;
  border-radius: 8px;
  min-height: 300px;
  overflow: hidden;
  
  :deep(svg) {
    text {
      pointer-events: none;
      text-shadow: 1px 0px 7px rgba(0,0,0,.4);
    }
    
    .link {
      fill: none;
      stroke: #666;
      stroke-width: 2px;
      
      // Bribe types
      &.link-basic {
        stroke-dasharray: 0,4 1;
        stroke: lightgreenen; 
      }
      &.link-kickback {
        stroke: magenta; 
        stroke-dasharray: 0,10 1;
      }
      &.link-marketing {
        stroke: lightblue; 
        stroke-dasharray: 0,6 1;
      }
      
      &.link-meeting-travel {
        stroke: yellowgreen;
        stroke-dasharray: 0,5 1;
      }
    }
  }
}

</style>