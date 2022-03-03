export default {
    state: {
        //其原始的状态
        isCollapse: false,
    },
    mutations: {
        //对其进行取反 将aside的展开
        collaspeChange(state) {
            state.iscollaspe = !state.iscollaspe
        }
    }
}