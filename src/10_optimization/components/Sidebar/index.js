import style from './index.less';
import { debounce } from '../../utils';
const handler = debounce((message) => {
    alert(message);
}, 1 * 1000);

export default {
    name: 'Sidebar',
    methods: {
        handleClick: handler,
    },
    render() {
        return <div class={style.sidebar}>
                    <button onClick={() => this.handleClick('Sidebar')}>Sidebar</button>
                </div>
    }
}