/*
 * @Description: effect 软编码
 * @Author: wangfengxiang
 * @Date: 2023-05-08 21:33:51
 * @LastEditTime: 2023-05-08 21:44:21
 * @LastEditors: wangfengxiang
 */
const bucket = new Set()

const data = {
    text: 'Hello',
    name: 'wfx'
}

let activeEffect

const obj = new Proxy(data, {
    get(target, key) {
        bucket.add(activeEffect)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        bucket.forEach(fn => fn())
        return true
    }
})

function effect(fn) {
    activeEffect = fn
    fn()
}

effect(() => {
    app.innerHTML = obj.text
})

effect(() => {
    console.log('执行了');
})

setTimeout(() => {
    obj.name = 'vue2'
}, 2000);


// 问题：未读取数据发生变化时，副作用函数也执行
