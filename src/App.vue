<template>
  <div id="app">
    <my-map></my-map>
  </div>
</template>

<script>
import map from './components/map.vue'

export default {
  name: 'app',
  components: {
    'my-map': map
  }
}
</script>

<style>
#app {
  height: 100vh;
}
</style>
