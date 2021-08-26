// @别名
import baiduSrc from '@/06_resolve/baidu.png';
// utils别名
import { cube } from 'utils';
import mod from './module1';

import Icon from './icon.component.js';
import Button from './button.component.js';

mod();
const icon = Icon({ src: baiduSrc});
$mount(icon);

const button = Button({ text: cube(2) });
$mount(button);

function $mount(vnode, el) {
    el ? jQuery(el).append(vnode) : jQuery('body').append(vnode);
}
