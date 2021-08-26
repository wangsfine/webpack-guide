import style from './button.component.less';

export default ({ text, color, click }) => {
    return jQuery(`<button></button>`)
    .css('color', color)
    .addClass(style.button)
    .append(text)
    .click(click);
}