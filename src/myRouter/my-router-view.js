export default {
  render(h) {
    // 从注册的路由表中动态查询当前的组件
    // let component = null
    // const route = this.$router.$options.routes.find(route => route.path === this.$router.current)
    // if(route) {
    //   component = route.component
    // }
    const {routeMap, current} = this.$router
    const component = routeMap[current] ? routeMap[current].component : null
    return h(component)
  }
}