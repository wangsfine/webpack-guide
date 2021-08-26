import Vue from 'vue';
// const renderer = require('vue-server-renderer').createRenderer();

const str = `${1 + 2}wangzhibing`;
const { a } = { a: 1}
console.log(a, str);

const vm = new Vue({
    data() {
        return {
            state: 'vue app'
        }
    },
    render() {
        return <div>{this.state}</div>;
    }
});

vm.$mount('#app');
// renderer.renderToString(vm, (err, html) => {
//     console.log(err, html);
// })

