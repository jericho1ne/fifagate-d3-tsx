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
    
    <div class="text-panel">
      <h3 class="graph-title">{{ graph.title }}</h3>
      <p v-if="graph.description !== ''" class="graph-description">{{ graph.description }}</p>
    </div>
    
    <!-- D3 force graph -->
    <ForceGraph 
      v-model="graph"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watch } from 'vue'

// import PageFooter from './PageFooter.vue'
import RadioSwitch from '../components/RadioSwitch.vue'
import ForceGraph from '../components/ForceGraph.vue'

// Datasets
import legend from '../_data/legend.json'
import { schemes } from '../_data/schemes'

// TODO: type as Ref<Graph>
const graphData = ref()
const graphTitle = ref('')
const graphDescription = ref(null)
const Actors = new Map(Object.entries(legend.actors))

const graph = reactive({
  data: {nodes:[], links: []},
  title: '',
  description: '',
  // The Conspirators and Bribe Types are static; used for the legend
  Conspirators: Actors,
  BribeTypes: new Map(Object.entries(legend.bribeTypes)),
})

const currentScheme = ref('A')
const chosenScheme =  computed(() => schemes.find((e) => e.id === currentScheme.value))

const radioOptions = schemes.map((scheme: any) => {
  return {
    label: `Scheme ${scheme.id}`,
    value: scheme.id,
    icon: scheme.icon
  }
})

const handleChange = (): void => {
}

const transformToD3 = (schemeData) => {
  const { nodes, links } = schemeData

  const transformedNodes = nodes.map((item: any) => {
    // TODO: define type
    let actor: any = Actors.get(item.details.type)

    Object.assign(item, {
      color: actor.color || '#fafafa',
      payload: {
        title: item.id,
      }
    })

    return item
  })
  
  // const transformedLinks = links.map((item: any) => {
  //   return Object.assign(item, {
  //   })
  // })
  
  return {
    nodes: transformedNodes,
    links
  }
}


watch(currentScheme, () => {
  graph.title = chosenScheme.value.title
  graph.description = chosenScheme.value?.description || ''
  graph.data = transformToD3(chosenScheme.value.content as any)
})

onMounted(() => {
  graph.title = schemes[0].title
  graph.description = schemes[0]?.description || ''
  graph.data = transformToD3(schemes[0].content)
})

</script>

<style lang="scss" scoped>

.text-panel {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  padding: 12px 4px;
  margin: 4px 0;
  
  width: 100%;
  .graph-title {
    display: flex;
    font-weight: 600;
    color: #222;
    font-size: 24px;
    line-height: 28px;
    width: 38ch;
  }
  .graph-description {
    display: flex;
    margin-left: 16px;
    color: #444;
    line-height: 28px;
    font-size: 14px;
  }  
}

.scheme-switcher {
  display: grid;
  grid-auto-rows: 1fr;
  grid-template-columns: repeat(6, 1fr);
  column-gap: 7px;
  row-gap: 7px;
  width: 100%;
  margin-bottom: 10px;
  
  .scheme-radio {    
    .text-label {
      margin-top: 3px;
    }
    .scheme-icon {
      width: 58px;
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
  color: #333;
  background: #fdfdfd;
  padding-top: 20px;
}
</style>

