import Link from './my-router-link.js'
import View from './my-router-view.js'

let Vue

class VueRouter {
  constructor(options) {
   this.$options = options // 保存选项

   const initial = window.location.hash.slice(1) || '/'
   Vue.util.defineReactive(this, 'current', initial)

   // 监听hashchange事件
   window.addEventListener('hashchange', this.onHashChange.bind(this))
   window.addEventListener('load', this.onHashChange.bind(this))

   // 优化：提前创建路由表，减少循环查询次数
   this.routeMap = {}
   this.$options.routes.forEach(route => {
     this.routeMap[route.path] = route
   })
  }

  onHashChange(){
    this.current = window.location.hash.slice(1)
  }
}

// 实现install方法，注册$router
VueRouter.install = function(_Vue) {
  Vue = _Vue // 引用构造函数

  // 使用混入方式是因为调用use的时间非常之早
  Vue.mixin({
    beforeCreate() {
      // 只有根组件拥有router选项
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router // 挂载$router
      }
    }
  })

  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}

export default VueRouter