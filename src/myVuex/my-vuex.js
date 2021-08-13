let Vue

class Store {
  constructor(options = {}){
    // 保存用户配置的getters选项
    wrapGetter(this, options.getters || {})
    resetStoreVM(this, options.state)
    console.log(this)
    // 保存用户配置的mutations选项
    this._mutations = options.mutations || {}
    // 保存用户配置的actions选项
    this._actions = options.actions || {}

    // 绑定commit上下文否则action中调用commit时可能会出问题！
    // 同时也把action绑定，因为action可以互调
    const store = this
    const {commit, action} = store
    this.commit = function boundCommit(type, payload) {
      commit.call(store, type, payload)
    }
    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload)
    }
  }

  get state() {
    return this._vm._data.state
  }

  set state(v) {
    console.error('不能直接给state赋值!') // 这里通过拦截set属性防止直接赋值
  }

  // 实现commit: 根据用户传入type获取并执行对应mutation
  commit(type, payload) {
    // 获取type对应的mutation
    const entry = this._mutations[type]

    if(!entry) {
      console.error(`unknown mutation type: ${type}`)
      return
    }
    // 指定上下文为Store 传递state给mutation
    entry(this.state, payload)
  }

  dispatch(type, payload) {
    const entry = this._actions[type]

    if(!entry) {
      console.error(`unknown action type: ${type}`)
      return
    }
    // 指定上下文为Store 传递state给mutation
    entry(this, payload)
  }
}

function install(_Vue){
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })
}

function wrapGetter(store, moduleGetter) {
  store._wrappedGetters = {}
  Object.keys(moduleGetter).forEach(getterKey => {
    const rawGetter = moduleGetter[getterKey]
    // 将options中的getter赋值到_wrappedGetters
    // 因为computed的赋值就是return一个函数
    store._wrappedGetters[getterKey] = function wrappedGetter(store) {
      return rawGetter(
        store.state,
        store.getters
      )
    }
  })
}

function resetStoreVM(store, state) {
  store.getters = {}
  // 获取拼接的_wrappedGetters
  const wrappedGetters = store._wrappedGetters
  // 开始拼接computed
  const computed = {}
  Object.keys(wrappedGetters).forEach(key => {
    const fn = wrappedGetters[key]
    computed[key] = () => fn(store)
    Object.defineProperty(store.getters, key, {
      get: () => store._vm[key]
    })
  })

  // store._vm.state = state
  // store._vm.computed = computed
  store._vm = new Vue({
    data: {
      state
    },
    computed
  })
}

export default { Store, install }