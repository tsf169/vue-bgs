import Vue from 'vue'
import Vuex from 'vuex'
// 这一步引入了tab中的所有数据
import tab from './tab'
import user from './user'
Vue.use(Vuex)
//Store模块的方式引入 Vuex.Store不要忘了

export default new Vuex.Store({
    modules: {
        tab,
        user,
    }
})