//全局配置
//先引入Vue
import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import http from 'axios'
import router from './router'
import * as echarts from 'echarts'

import store from './store/index'
import '../src/api/mock.js'

Vue.config.productionTip = false

Vue.prototype.$echarts = echarts

router.beforeEach((to, form, next) => {
  // 调用store中的getToken
  store.commit('getToken')
  //拿到store中的token现有的值
  const token = store.state.user.token
  // 如果获取的token为空或者导航页不是登录页就返回login,否则就进行下一步的操作
  if (!token && to.name !== 'login') {
    next({
      name: 'login'
    })
  }
  // else if (token && to.name == 'login') {
  //   next(
  //     this.router.push('/home')
  //   )
  // } 
  else {
    next()
  }

})


Vue.prototype.$http = http
new Vue({
  router,
  store,
  render: h => h(App),
  // 解决页面刷新之后白屏的问题
  created() {
    store.commit('addMenu', router)
  }
}).$mount('#app')