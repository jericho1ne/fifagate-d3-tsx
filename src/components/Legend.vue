<template>
  <div class="chart-legend">
    <div class="legend-header">Conspirators</div>
    <!-- Conspirator Details -->
    <ul class="legend-list">
      <li
        v-for="[key, item] in conspirators"
        :key="`${key}-{idx}`"
      >
        <div class="legend-bubble" :style="{background: item.color}"/>
        <div class="legend-text">{{ key }}</div>
      </li>
    </ul>
    
    <div class="legend-header">Bribe Types</div>
    <!-- Bribe Type Details -->
    <ul class="legend-list">
      <li
        v-for="[key, item] in schemeBribes"
        :key="`${key}-{idx}`"
      >
        <div class="legend-square" :style="{background: item.color}"/>
        <div class="legend-text">{{ key }}</div>
      </li>
    </ul>
  </div>
</template>


<script setup lang="ts">
import { computed, toRef, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object as any, // TYPE ME RIGHT
    required: true,
  },
})

const legendData = toRef(props, 'modelValue')

const conspirators = computed(() => legendData.value?.conspirators)
const schemeBribes = computed(() => legendData.value?.bribes)

watch(props.modelValue, () => {
  // console.log(" >> conspirators", props.modelValue)
})
</script>

<style lang="scss" scoped>
.chart-legend {
  border-radius: 8px;
  background: radial-gradient(circle at 18.7% 37.8%, rgba(240, 240, 240, 0.45) 0%, rgba(225, 234, 238, 0.45) 70%);
  padding: 20px 30px 10px 20px;
  position: absolute;
  height: auto;
  margin-top: 20px;
  margin-left: 20px;
  width: auto;
  
  .legend-header {
    color: #777;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 4px; 
  }
  
  ul.legend-list {
    list-style-type: none;
    margin-bottom: 12px;
    
    li {
      display: flex;
      flex-flow: row;
      align-items: center;
      column-gap: 8px;
      .legend-bubble {
        border-radius: 50%;
        width: 12px;
        height: 12px;
      }
      .legend-square {
        border-radius: 1px;
        width: 24px;
        height: 6px;
      }
    }
  }
}
</style>