import style from './a.component.less';

export default (props = { name: 'hello componentAA'}) => {
    const { name } = props
    return `<div class="${style.a}">${name}</div>`
}