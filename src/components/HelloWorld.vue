<template>
  <a-form>
    <a-form-item label="日期">
      <mark
        class="_mark"
        v-show="showSeason"
        @click.stop="showSeason=false"
      ></mark>
      <a-input placeholder="请选择季度" v-model="showValue" style="width:138px;" @focus="showSeason=true">
        <a-icon slot="prefix" type="calendar" />
      </a-input>
      <a-card
        class="box-card"
        v-show="showSeason"
      >
        <div class="clearfix yearBtn">
          <button type="button" @click="prev" title="上一年" class="ant-calendar-month-panel-prev-year-btn"></button>
          <span role="button" class="a-date-picker__header-label">{{year}}年</span>
          <button type="button" @click="next" title="下一年" class="ant-calendar-month-panel-next-year-btn"></button>
        </div>
        <div class="text item">
          <a-button
            type="text"
            class="_left"
            @click="selectSeason(0)"
          >第一季度</a-button>
          <a-button
            type="text"
            class="_right"
            @click="selectSeason(1)"
          >第二季度</a-button>
        </div>
        <div class="text item">
          <a-button
            type="text"
            class="_left"
            @click="selectSeason(2)"
          >第三季度</a-button>
          <a-button
            type="text"
            class="_right"
            @click="selectSeason(3)"
          >第四季度</a-button>
        </div>
      </a-card>
    </a-form-item>
  </a-form>
</template>
<script>
/**
 * @file:  View 组件 季节选择控件
 * @author: v_zhuchun
 * @date: 2019-05-23
 * @description: UI组件  可选择季节
 * @api: valueArr : 季度value defalut['01-03', '04-06', '07-09', '10-12'] 默认值待设置
 */
export default {
  props: {
    valueArr: {
      default: () => {
        return ['01-03', '04-06', '07-09', '10-12']
      },
      type: Array
    },
    getValue: {
      default: () => {},
      type: Function
    },
    defaultValue: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      showSeason: false,
      season: '',
      year: new Date().getFullYear(),
      showValue: ''
    }
  },
  created() {
    if (this.defaultValue) {
      let value = this.defaultValue
      let arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      let arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
    }
  },
  watch: {
    defaultValue: function(value, oldValue) {
      console.log(oldValue)
      let arr = value.split('-')
      this.year = arr[0].slice(0, 4)
      let str = arr[0].slice(4, 6) + '-' + arr[1].slice(4, 6)
      let arrAll = this.valueArr
      this.showValue = `${this.year}年${arrAll.indexOf(str) + 1}季度`
    }
  },
  methods: {
    one() {
      this.showSeason = false
    },
    prev() {
      this.year = this.year * 1 - 1
    },
    next() {
      this.year = this.year * 1 + 1
    },
    selectSeason(i) {
      // eslint-disable-next-line
      // debugger
      let that = this
      that.season = i + 1
      let arr = that.valueArr[i].split('-')
      that.getValue(that.year + arr[0] + '-' + that.year + arr[1])
      that.showSeason = false
      this.showValue = `${this.year}年${this.season}季度`
    },
    getLastDay(year,month) {         
      var new_year = year //取当前的年份
      var new_month = month++ //取下一个月的第一天，方便计算（最后一天不固定）
      if(month>12) {         
        new_month -= 12//月份减
        new_year++ //年份增
      }         
      var new_date = new Date(new_year,new_month,1) //取当年当月中的第一天          
      return (new Date(new_date.getTime()-1000*60*60*24)).getDate() //获取当月最后一天日期          
    }
  }
}
</script>
<style scoped>
._mark {
  position:fixed;top:0;bottom:0;left:0;right:0;background:rgba(0,0,0,0);z-index:999;
}
.yearBtn {
  text-align:center;padding:0
}
.box-card {
  width:322px;padding: 0 3px 20px;margin-top:10px;position:fixed;z-index:9999
}
.text.item {
  text-align: center;
}
.text.item >>> .a-button{
  width:40%;color: #606266;
}
.text.item ._left {
  float: left;
}
.text.item ._right {
  float: right;
}
.ant-calendar-month-panel-prev-year-btn::before{
  content: "\e6dd";
}
</style>
 