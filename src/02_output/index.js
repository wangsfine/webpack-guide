import { add } from './math.js';
import icon from './baidu.png';

console.log('icon------>', icon);
console.log('result-->', add(1, 2))
import('./dynamic.js').then((m) => {
    console.log('m--->', m);
})