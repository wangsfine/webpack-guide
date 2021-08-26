import './style.less';
import baiduSrc from './baidu.png';
import Icon from './icon.component.js';

console.log(a);
const icon = Icon({ src: baiduSrc});
$mount(icon);

function $mount(vnode, el) {
    el ? jQuery(el).append(vnode) : jQuery('body').append(vnode);
}
