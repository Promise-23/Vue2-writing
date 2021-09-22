<template>
  <echartsBaiduMap />
</template>
<script>
// import Table from './components/antd-vue-test/table01.vue'
// import Map from './components/charts/map.vue'
// import echartsBaiduMap from './components/charts/echartMigrationMap.vue'
import echartsBaiduMap from './components/charts/echartsBaiduMap.vue'
export default {
  components: {
    echartsBaiduMap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
p {
  cursor: pointer;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
