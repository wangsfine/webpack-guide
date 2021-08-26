import style from './index.less';
import { debounce } from '../../utils';
const handler = debounce((message) => {
    alert(message);
}, 1 * 1000);

export default {
    name: 'Footer',
    methods: {
        handleClick: handler,
    },
    render() {
        return <div class={style.footer}>
                    <button onClick={() => this.handleClick('Footer')}>Footer</button>
                </div>
    }
}