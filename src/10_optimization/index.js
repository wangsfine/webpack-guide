import './global.less';
import Vue from 'vue';
import App from './App.js';

// 动态导入
import(/* webpackChunkName: 'dy' */ './dynamic.js').then((res) => {
    const { default: fn } = res;
    fn();
})


const vm = new Vue({
    components: {
        App,
    },
    render() {
        return <App/>;
    }
});

vm.$mount('#app');