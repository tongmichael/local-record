
import recordStore from './store/record/index'

const Home = () => import('./views/home/index.vue')
const RecordView = () => import('./views/home/cpns/design/cpns/record-view/index.vue')
const CustomTheme = () => import('./views/home/cpns/design/cpns/custom-theme/index.vue')

const install = function(Vue:any, opts:any={}) {
       
    if (!opts.store) {
        console.log("Please provide a store!");
        return
    }

    opts.store.registerModule("record", recordStore);
}

export default {
    install,
    Home,
    RecordView,
    CustomTheme,
}