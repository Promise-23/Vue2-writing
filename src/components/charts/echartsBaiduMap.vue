<template>
  <!--一定要给宽高，不然会报错，container没有高度-->
  <div id="chart">
    echarts百度地图
  </div>
</template>

<script>
//引入json数据
import baiduJSON from "../../assets/data/heatmap.json"
import echarts from 'echarts'
import 'echarts/extension/bmap/bmap'

export default {
  data() {
    return {};
  },
  mounted() {
    let myChart = echarts.init(document.getElementById("chart"));
    let pointsData = baiduJSON; //其实这一步是多余的
    //把数据处理成需要的格式，只是把数值都改成了1，具体项目可以根据自己实际来处理
    var points = [].concat.apply(
      [],
      pointsData.map(function(track) {
        return track.map(function(seg) {
          return seg.coord.concat([1]);
        });
      })
    );
    console.log('points', points)
    myChart.setOption(
      ({
        animation: false,
        bmap: {
          center: [120.13066322374, 30.240018034923],
          zoom: 14,
          roam: true,
        },
        visualMap: {
          show: true,
          top: "top",
          min: 0,
          max: 5,
          seriesIndex: 0,
          calculable: true,
          inRange: {
            color: ["blue", "blue", "green", "yellow", "red"],
          },
        },
        series: [
          {
            type: "heatmap",
            coordinateSystem: "bmap",
            data: points,
            pointSize: 5,
            blurSize: 6
          },
        ],
      })
    );

    var bmap = myChart
      .getModel()
      .getComponent("bmap")
      .getBMap();
    bmap.addControl(new BMap.MapTypeControl());
  },
  methods: {},
};
</script>

<style>
#chart {
  width: 100%;
  height: 100%;
}
</style>
