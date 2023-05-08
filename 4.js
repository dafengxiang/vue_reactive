/*
 * @Description: 完整响应式
 * @Author: wangfengxiang
 * @Date: 2023-05-08 21:45:36
 * @LastEditTime: 2023-05-08 21:58:24
 * @LastEditors: wangfengxiang
 */
const bucket = new WeakMap()

// {
//     target: {
//         key: [effect1, effect2, effect3]
//     }
// }

const data = {
    text: 'Hello',
    name: 'wfx'
}

let activeEffect

const obj = new Proxy(data, {
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
        deps && deps.forEach(fn => fn())
        return true
    }
})

function effect(fn) {
    activeEffect = fn
    fn()
}

effect(() => {
    app.innerHTML = obj.name
})

effect(() => {
    console.log('执行了',obj.name);
})

setTimeout(() => {
    obj.name = 'vue2'
}, 2000);
