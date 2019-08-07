import Vue from 'vue'
import Mapbox from './Mapbox.vue'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(Mapbox),
}).$mount('#mapbox')
