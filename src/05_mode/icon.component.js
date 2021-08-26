import style from './icon.component.less';

export default ({ src }) => {
    return jQuery('<img></img>').attr('src', src).addClass(style.image);
}