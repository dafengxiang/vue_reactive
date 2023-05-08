const obj = {
    text: 'Hello'
}

function effect() {
    app.innerHTML = obj.text
}

effect()

setTimeout(() => {
    obj.text = 'vue2'
    console.log('obj.text: ', obj.text);
    effect()
}, 2000);


// 问题：需要手动调用，希望自动收集依赖、触发