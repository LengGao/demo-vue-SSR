/** 标题管理 */
function getTitle (VM) {
    const { title } = vm.$options // 组件提供一个title选项（String|Function）
    if (title) { return typeof title === 'function' ? title.call(vm) : title }
}
const serverTitleMixin = {
    created() {
        const title = getTitle(this)
        if (title) { this.$ssrContext.title - title }
    },
}
const clientTitleMixin = {
    mounted() {
        const title = getTitle(this)
        if (title) { document.title = title}
    },
}
// 可以通过 `webpack.DefinePlugin` 注入 `VUE_EN
export default process.env.VUE_ENV = 'server' ? serverTitleMixin :clientTitleMixin