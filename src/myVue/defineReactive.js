function defineReactive(obj, key, val) {
  // 处理嵌套对象
  observe(val)
  Object.defineProperty(obj, key, {
    get: function() {
      console.log(`get ${key}: ${val}`)
      return val
    },

    set: function(v) {
      if(v !== val) {
        console.log(`set ${key}: ${val}`)
        observe(v) // 新值是对象的清况
        val = v
      }
    }
  })
}

function observe(obj) {
  if(typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}

// 给对象添加属性使用set方法
function set(obj, key, val) {
  defineReactive(obj, key, val)
}

// const foo = {}
// defineReactive(foo, 'foo', 'foo')
// foo.foo
// foo.foo = 'bar'

const obj = {foo: 'foo', bar: 'bar', baz: {a: 1}}
observe(obj)
obj.baz.a = 2
// console.log(JSON.stringify(obj))

// obj.dong = 'dong'
set(obj, 'dong', 'dong')
obj.dong