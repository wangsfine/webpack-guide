import style from './App.less';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Main from './components/Main';

export default {
    components: {
        Sidebar,
        Navbar,
        Footer,
        Main
    },
    render() {
        return <div class={style.app}>
            <div class={style.app_sidebar}><Sidebar/></div>
            <div class={style.app_container}>
                <div class={style.app_navbar}><Navbar/></div>
                <div class={style.app_footer}><Footer/></div>
                <div class={style.app_main}><Main/></div>
            </div>
        </div>
    }
}