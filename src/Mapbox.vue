<template>
  <div id="app">
    <Geocoder mapWidth="800px" mapHeight="403px"/>
  </div>
</template>

<script>
import Geocoder from './components/Geocoder.vue'


export default {
  name: 'app',
  components: {
    Geocoder
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
