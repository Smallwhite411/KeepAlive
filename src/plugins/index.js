import {
    Button,
    Empty,
} from 'element-ui'

const element = {
    install: function (Vue) {
        Vue.use(Button),
        Vue.use(Empty)
    }
}
export default element