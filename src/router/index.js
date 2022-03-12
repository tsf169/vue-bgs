//全局路由的文件
import Vue from 'vue'
import VueRouter from 'vue-router'

//路由文件被引用
Vue.use(VueRouter)
//定义路由的文件
// 重复跳转异常问题
// 如果重复跳转相同的界面会产生如下的错误，这时可以自行判断跳转时拒绝跳转到相同的界面
//解决重复跳转问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [{
        //首先打开的时main页面
        path: '/',
        //在这里设置默认打开的页面
        redirect: '/login',
        name: 'Main',
        component: () => import('../views/Main.vue'),
        //     children: [{
        //             //点击侧边栏的时候会显示home页面或者user页面
        //             // 指当浏览器的路由地址是web站点（准确的说是单体应用）根目录时，我们将要触发的路由，它的名字叫Home，它将为系
        //             // 统挂接Home组件
        //             //更简单的方式：采用component动态注入（路由懒加载），即示例中about的挂接方式。
        //             // 如下配置，是指当浏览器的路由地址是web站点（准确的说是单体应用）根目录+"/user"时，我们将要触发的路由，
        //             // 它的名字叫home，它将为系统挂接views目录下的home.vue组件
        //             path: '/home',
        //             //根据他的名字来找到其文件
        //             name: 'home',
        //             component: () => import('../views/home'),
        //         },
        //         {
        //             path: '/env',
        //             name: 'env',
        //             component: () => import('../views/environment'),
        //         },
        //         {
        //             path: '/user',
        //             name: 'user',
        //             component: () => import('../views/user'),
        //         },

        //         // {
        //         //     path: "/page1",
        //         //     name: "page1",
        //         //     component: () => import('../views/other/pageOne.vue'),
        //         // },
        //         // {
        //         //     path: "/page2",
        //         //     name: "page2",
        //         //     component: () => import('../views/other/pageTwo.vue'),
        //         // },
        //     ]
    },
    {
        path: "/login",
        name: "login",
        component: () => import('../views/login/login.vue'),
    },

]
const router = new VueRouter({
    //mode代表路由模式，它的默认值是hash模式，hash模式很丑，且不支持锚定向，所以如果希望有个漂亮的路由或支持锚定向，
    // 可以考虑使用history模式
    mode: 'history',
    //routes 则是具体的路由配置列表，这个参数最核心也最关键
    routes
})

export default router