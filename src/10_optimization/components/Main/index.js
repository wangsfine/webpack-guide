import style from './index.less';
import { debounce } from '../../utils';
const handler = debounce((message) => {
    alert(message);
}, 1 * 1000);

export default {
    name: 'Main',
    methods: {
        handleClick: handler,
    },
    render() {
        return <div class={style.main}>
                    <button onClick={() => this.handleClick('Main')}>Main</button>
                </div>
    }
}