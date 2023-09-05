import styles from './Footer.module.scss'

<template>
  <footer class="page-footer">
    <span>copyright 2023 </span>
  </footer>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'

defineProps({
  footerMessage: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.page-footer {
  border-top: 1px solid #ccc;
  width: 100%;
  height: 120px;
  font-size: .85rem;
  background: rgba(0,0,0,0.03);
  color: #aaa;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  position: relative;
  .logo {
    opacity: 0.7;
    height: 1.25rem;
    width: auto;
    margin: .5rem;
  }
}
</style>

