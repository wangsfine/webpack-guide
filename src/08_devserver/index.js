import './style.less';
import './baidu.png';
import componentA from './a.component';

const vnode = componentA();
$mount(vnode);

function $mount(vnode) {
    const el = document.createElement('div');
    el.innerHTML = vnode;
    document.body.appendChild(el);
}