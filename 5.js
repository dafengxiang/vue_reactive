/*
 * @Description: 调度器
 * @Author: wangfengxiang
 * @Date: 2023-05-09 08:24:09
 * @LastEditTime: 2023-05-09 08:41:12
 * @LastEditors: wangfengxiang
 */
const bucket = new WeakMap()

// {
//     target: {
//         key: [effect1, effect2, effect3]
//     }
// }

const obj = reactive({
    text: 'Hello',
    name: 'wfx'
})

let activeEffect

function reactive(data){
   return new Proxy(data, {
        get(target, key) {
            let depsMap = bucket.get(target)
            if (!depsMap) bucket.set(target, (depsMap = new Map()))
    
            let deps = depsMap.get(key)
            if (!deps) depsMap.set(key, (deps = new Set()))
    
            deps.add(activeEffect)
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
    
            const depsMap = bucket.get(target)
            if (!depsMap) return
            const deps = depsMap.get(key)
            
            deps && deps.forEach(fn => {
                if (fn?.options?.schedule) fn.options.schedule(fn)
                else fn()
            })
            return true
        }
    })
} 

function effect(fn, options = {}) {
    fn.options = options
    activeEffect = fn
    fn()
}

effect(() => {
    app.innerHTML = obj.name
})

effect(() => {
    console.log('执行了', obj.name);
}, {
    schedule(fn) {
        setTimeout(() => {
            fn()
        }, 2000);
    }
})

setTimeout(() => {
    obj.name = 'vue2'
}, 2000);
