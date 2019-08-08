<template>
  <div id="app">
    <Geocoder mapWidth="100%" mapHeight="403px" @select="displaySelected" />
    <div v-if="selectedStore">
      <h1>{{selectedStore.properties.name}}</h1>
      <p>{{`${selectedStore.properties.address}, ${selectedStore.properties.city}, ${selectedStore.properties.postalCode}, ${selectedStore.properties.country}`}}</p>
      <p>{{selectedStore.properties.phoneFormatted}}</p>
    </div>
  </div>
</template>

<script>
import Geocoder from "./components/Geocoder.vue";

export default {
  name: "app",
  data() {
    return {
      selectedStore: null
    };
  },
  // watch: {
  //   selectedStore: {
  //     handler: function(val, oldVal) {
  //       console.log(val, oldVal);
  //     },
  //     deep: true
  //   }
  // },
  methods: {
    displaySelected(data) {
      this.selectedStore = data;
      console.log(data);
    }
  },
  components: {
    Geocoder
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
