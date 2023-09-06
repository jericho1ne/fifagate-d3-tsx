<template>
  <div class="custom-page">

    <!-- Scheme switcher -->
    <div class="scheme-switcher">
      <RadioSwitch v-for="(option, idx) in radioOptions" 
        :key="idx" 
        :radio-id="`radio-${idx}`"
        v-model="currentScheme" 
        class="scheme-radio"
        :data-testid="`radio-${option.value}`" 
        :selected-value="option.value" type="card"
        @change="handleChange"
      >
        <img 
          :alt="option.label"
          class="scheme-icon" 
          :src="option.icon"
        >
        <div class="text-label">
          {{ option.label }}
        </div>
      </RadioSwitch>
    </div>

    <!-- D3 force graph -->
    <GraphlyD3 
      class="graphly-parent" 
      ref="graphly" 
      :dark="true" 
      height="100%" 
      remoteOrigin="/templates" 
      :envGravity="0"
      :linkDistance="350" 
      :animationDuration="-1" 
      :draggableNodes="true" 
      :zoomEnabled="false" 
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
import { computed, onMounted, ref, watch } from 'vue'

import PageFooter from './PageFooter.vue'
// import { KRadio } from '@kong/kongponents'
import RadioSwitch from './RadioSwitch.vue'
import '@kong/kongponents/dist/style.css'

// import { TemplateAPI } from "@livereader/graphly-d3"

// Datasets
import legend from '../_data/legend.json'
import { schemes } from '../_data/schemes'

const graphly = ref(null)
const simulation = computed<ForceSimulation>(() => graphly?.value.simulation)

// TODO: type as Ref<Graph>
const graphData = ref({nodes:[], links: []})

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

const handleChange = (): void => {
  // debugger
}

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
        scale: 1,
        url: "https://cdn.graphly.dev/@jason-rietzke/demo-hexagon/latest",
      }
    })

    return item
  })
  
  const transformedLinks = links.map((item: any) => {
    return Object.assign(item, {
      directed: true,
      strength: "weak"
    })
  })
  
  return {
    nodes: transformedNodes,
    links: transformedLinks
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
    .text-label {
      margin-top: 4px;
    }
    .scheme-icon {
      width: 60px;
      height: auto;
      display: flex;
      flex-grow: 1;
      margin: auto;
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
  // font-size: .85rem;
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

