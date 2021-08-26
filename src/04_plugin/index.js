import './style.less';
import './baidu.png';
import Button from './button.component';

const button = Button({ 
    text: process.env.APP_VERSION, 
    color: 'red', 
    click: () => {
        alert(1111)
    }
});
$mount(button);

function $mount(vnode, el) {
    el ? jQuery(el).append(vnode) : jQuery('body').append(vnode);
}