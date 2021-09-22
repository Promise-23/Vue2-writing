<template>
  <div ref="map" class="map"></div>
</template>
 
<script>
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'
import linesData from '../../assets/data/lines-data.json'
// import mapConfig from '../../assets/data/map-config.json'
import { series } from './FlowDiagram'
 
export default {
  name: 'Map',
  data () {
    return {
      chart: echarts.ECharts,
      bmap: {},
      mapZoom: 1,
      trainIcon: `path://M678.4 122.9c75.1-11.3 145.5 11.7 202.6 65.8 58 54.9 85.7 127.4 77.9 203.3-7.9 75-48.8 149-117.8 214.4-19.3 18.3-71 67.5-145.1 138.2-33.3 31.8-68.9 65.7-104.6 99.8l-34.8 33.1-13.8 13.2c-16.6 15.8-43 15.8-59.6 0L363.1 775.9l-25.4-24.2c-50.9-48.5-101.9-97-152.8-145.4C116 541 75 466.9 67.1 391.8c-7.9-76 19.9-148.3 77.9-203.3 57.1-54.1 127.6-77.1 202.6-65.8 55.8 8.5 112.3 35.4 165.4 78.5 53.2-43 109.7-70 165.4-78.3z`
    }
  },
  mounted () {
    console.log('series', series)
    this.initMap()
  },
  methods: {
    initMap () { // echarts配置
      this.chart = echarts.init(this.$refs.map)
 
      this.chart.setOption({
        animation: false,
        legend: {
          orient: 'vertical',
          top: 30,
          left: 30,
          data: linesData.map(v => v.name),
          textStyle: {
            color: '#222222'
          },
          selectedMode: 'multiple'
        },
        // bmap: { // 加载 bmap 组件
        //   center: [108.479, 23.1152],
        //   zoom: 6, // 地图当前的缩放比例
        //   roam: true, // 开启鼠标缩放和平移漫游
        //   // scaleLimit: { min: 6, max: 12 }, // echarts设置地图最小最大缩放比例的接口不起作用，要使用百度地图的接口设置
        //   mapStyle: {
        //     styleJson: mapConfig
        //   }
        // },
        geo: {
          map: 'world',       // 与引用进来的地图js名字一致
          roam: false,        // 禁止缩放平移
          itemStyle: {        // 每个区域的样式 
              normal: {
                  areaColor: '#ff8800'
              },
              emphasis: {
                  areaColor: 'red'
              }
          },
          regions: [{        // 选中的区域
              name: 'China',
              selected: true,
              itemStyle: {   // 高亮时候的样式
                  emphasis: {
                      areaColor: '#7d7d7d'
                  }
              },
              label: {    // 高亮的时候不显示标签
                  emphasis: {
                      show: false
                  }
              }
          }]
        },
        series: series
      })
      // 获取百度地图实例，使用百度地图自带的控件
      this.bmap = this.chart.getModel().getComponent('bmap').getBMap()
      this.bmap.setMinZoom(6) // 设置地图最小缩放比例
      this.bmap.setMaxZoom(12) // 设置地图最大缩放比例
      // this.bmap.addControl(new BMap.MapTypeControl({ mapTypes: [] })) // 不显示地图右上方的控件
      this.bmap.addControl(new BMap.ScaleControl({ anchor: BMAP_ANCHOR_BOTTOM_LEFT })) // 在左下角显示比例尺控件
      const _this = this
      // 监听地图比例缩放， 可以根据缩放等级控制某些图标的显示
      this.bmap.addEventListener('zoomend', function () {
        _this.mapZoom = _this.bmap.getZoom()
      })
    }
  }
}
</script>
 
<style scoped>
.map {
  width: 100%;
  height: 100%;
}
</style>