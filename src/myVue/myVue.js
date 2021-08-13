class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // 为$data作代理
    observe(this.$data)

    // 代理
    proxy(this)

    //编译
    new Compile(options.el, this)
  }
}

class Observe {
  constructor(value) {
    this.value = value
    this.walk(value)
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

const watchers = [] //临时存放watch的数组

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn
    watchers.push(this)

    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // 更新
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}

class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)
    if(this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if(this.isElement(node)) {
        // console.log('编译元素' + node.nodeName)
        this.compileElement(node)
      } else if(this.isInterpolation(node)) {
        // console.log('插值文本' + node.textContent)
        this.compileText(node)
      }
      // 如果还有子元素则递归遍历
      if(node.childNodes && node.childNodes.length > 0) {
        this.compile(node)
      }
    })
  }

  isElement(node) {
    return node.nodeType === 1
  }
  compileElement(node) {
    const attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      let exp = attr.value
      if(this.isDirective(attrName)) { // v-*
        let dir = attrName.substring(2)
        this[dir] && this[dir](node, exp) 
      }
    })
  }
  text(node, exp) {
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  html(node, exp) {
    // node.innerHTML = this.$vm[exp]
    this.update(node, exp, 'html')
  }
  textUpdater(node, val) {
    node.textContent = val
  }
  htmlUpdater(node, val) {
    node.innerHTML = val
  }

  isDirective(name) {
    return name.indexOf('v-') === 0
  }

  isInterpolation(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    // console.log(RegExp.$1)
    // node.textContent = this.$vm[RegExp.$1]
    this.update(node, RegExp.$1, 'text')
  }
  update(node, exp, dir) {
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
}

function defineReactive(obj, key, val) {
  observe(val)

  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get: function() {
      Dep.target && dep.addDep(Dep.target)
      return val
    },

    set: function(newVal) {
      if(newVal !== val) {
        val = newVal
        dep.notify()
      }
    }
  })
}

// 代理 app.data.counter --->  app.counter 
function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, { // 注意这里是 vm 而不是 vm.$data
      get: function() {
        return vm.$data[key]
      },
      set: function(newVal) {
        vm.$data[key] = newVal
      }
    })
  })
}

function observe(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return
  }
  new Observe(obj)
}

