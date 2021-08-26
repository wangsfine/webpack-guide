import style from './index.less';
import { debounce } from '../../utils';
const handler = debounce((message) => {
    alert(message);
}, 1 * 1000);

export default {
    name: 'Navbar',
    methods: {
        handleClick: handler,
    },
    render() {
        return <div class={style.navbar}>
                    <button onClick={() => this.handleClick('Navbar')}>Navbar</button>
                </div>
    }
}