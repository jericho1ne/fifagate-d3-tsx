<template>
  <div class="custom-page">

    <!-- Scheme switcher -->
    <div class="scheme-switcher">
      <KRadio v-for="(option, idx) in radioOptions" 
        :key="idx" 
        v-model="currentScheme" 
        class="scheme-radio"
        :data-testid="`radio-${option.value}`" 
        :selected-value="option.value" type="card"
      >
        <img 
          :alt="option.label"
          class="scheme-icon" 
          :src="option.icon"
        >
        <div class="k-radio-label">
          {{ option.label }}
        </div>
      </KRadio>
    </div>

    <!-- D3 force graph -->
    <GraphlyD3 
      class="graphly-parent" 
      ref="graphly" 
      :dark="true" 
      height="100%" 
      remoteOrigin="/templates" 
      :envGravity="200"
      :linkDistance="375" 
      :animationDuration="350" 
      :draggableNodes="true" 
      :zoomEnabled="true" 
      :zoomScaleExtent="[0.1, 1.5]"
      @node-click="(e, d) => console.log(d.id)" 
      @link-click="(e, d) => console.log(d.id)" 
    />
  </div>
  <PageFooter />
</template>

<script setup lang="ts">
import type { ForceSimulation, Graph, Shape } from "@livereader/graphly-d3"
import GraphlyD3 from "@livereader/graphly-d3/component/vue3";
import "@livereader/graphly-d3/style.css";
import { computed, onMounted, ref, Ref, watch } from 'vue'

import PageFooter from './PageFooter.vue'
import { KRadio } from '@kong/kongponents'
import '@kong/kongponents/dist/style.css'

// import { TemplateAPI } from "@livereader/graphly-d3"

// Datasets
import legend from '../_data/legend.json'
import { schemes } from '../_data/schemes'

const graphly = ref(null)
const simulation = computed<ForceSimulation>(() => graphly?.value.simulation)

// TODO: type as Ref<Graph>
const graphData = ref(null)

const currentScheme = ref('A')

const radioOptions = schemes.map((scheme: any) => {
  return {
    label: `Scheme ${scheme.id}`,
    value: scheme.id,
    icon: scheme.icon
  }
})

const Actors = new Map(Object.entries(legend.actors))

// const nodeShape:Shape = TemplateAPI.Shape.Circle(48)

const transformToD3 = (schemeData) => {
  const { nodes, links } = schemeData

  const transformedNodes = nodes.map((item: any) => {
    // TODO: define type
    let actor: any = Actors.get(item.details.type)

    Object.assign(item, {
      payload: {
        title: item.id,
        color: actor.color || '#fafafa'
      }
    })

    Object.assign(item, {
      shape: {
        type: "hexagon",
        scale: 1.05,
        url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/latest",
      }
    })

    return item
  })
  
  return {
    nodes: transformedNodes,
    links
  }
}

// const graph: Graph = {
//   nodes: [
//     {
//       id: "node1",
//       shape: {
//         type: "hexagon",
//         scale: 1,
//         url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/latest",
//       },
//       payload: {
//         title: "Hello\nWorld",
//         color: "teal",
//       },
//     },
//     {
//       id: "node2",
//       shape: {
//         type: "hexagon",
//         scale: 1,
//         url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/latest",
//       },
//       payload: {
//         title: "",
//         color: "#9575cd",
//       },
//     },
//   ],
//   links: [
//     {
//       source: "node1",
//       target: "node2",
//       type: "solid",
//       directed: true,
//       label: "",
//       strength: "weak",
//     },
//   ],
// }

watch(currentScheme, () => {
  const chosenScheme = schemes.find((e) => e.id === currentScheme.value)
  
  graphData.value = transformToD3(chosenScheme.content as any)
  simulation.value.render(graphData.value)
})

onMounted(() => {
  graphData.value = transformToD3(schemes[0].content)
  simulation.value.render(graphData.value)
})

</script>

<style lang="scss" scoped>
.scheme-switcher {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 8px;
  width: 100%;
  row-gap: 8px;
  margin-bottom: 10px;
  .scheme-radio {
    justify-content: center;
    min-width: 100px;
    font-size: 9px;

    .scheme-icon {
      width: 60px;
      height: auto;
      display: flex;
      flex-grow: 1;
      margin: auto;
    }

    .k-radio-label {
      margin-top: 2px;
      justify-content: center;
      text-align: center;
    }

    &:deep(label) {
      padding: 4px !important;
      margin-bottom: 0;
    }
  }
}

.custom-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 1rem;
  width: 100%;
  height: 100%;
  font-size: .85rem;
  color: #bababa;

  .graphly-parent {
    width: 100%;
    height: auto;
    border: 1px solid #eaeaea;
    border-radius: 8px;

    &:deep(svg) {
      display: flex;
      justify-content: center;
      height: 600px !important;
    }
  }
}
</style>

