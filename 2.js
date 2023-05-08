/*
 * @Description: 响应式数据基本实现
 * @Author: wangfengxiang
 * @Date: 2023-05-08 21:16:52
 * @LastEditTime: 2023-05-08 21:33:19
 * @LastEditors: wangfengxiang
 */
const bucket = new Set()

const data = {
    text: 'Hello'
}

const obj = new Proxy(data, {
    get(target, key) {
        bucket.add(effect)
        return target[key]
    },
    set(target, key, value) {
        target[key] = value
        bucket.forEach(fn => fn())
        return true
    }
})

function effect(){
    app.innerHTML = obj.text
}
effect()

setTimeout(() => {
    obj.text = 'vue2'
}, 2000);


// 问题：effect函数硬编码