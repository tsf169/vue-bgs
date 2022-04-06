import Cookie from 'js-cookie';
export default {
    state: {
        //其原始的状态
        isCollapse: true,
        tabsList: [
            //记录当前的路由是哪一项
            {
                path: '/',
                name: 'home',
                lable: '首页',
                icon: 'home',
            }

        ],
        currentMenu: null,
        menu: [],
    },
    // mutations: 对其store的数据进行改变      在组件中修改store中的状态
    mutations: {
        //对其进行取反 将aside的展开
        collaspeMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        // 用于改变tabsList中的数据，在我们每次点击左侧菜单时候就改变
        // selectMenu(state, val) {

        //     //判断传过来的值是不是home
        //     if (val.name !== 'home') {
        //         // 先对currentMenu进行赋值 判断面包屑上面的值name值是否与我们传入进来的菜单是否相同,其存在
        //         //将传过来的值赋给currentMenu
        //         state.currentMenu = val
        //         const result = state.tabsList.findIndex(item => item.name === val.name)
        //         // 如果没有符合条件元素时findIndex()返回的是-1，
        //         if (result === -1) {
        //             state.tabsList.push(val)
        //         } else {
        //             state.currentMenu = null
        //             //        如果不存在是往tabslist添加我们的数据
        //             // 使用push添加进我们的数组如果存在就对我们为您的currentMenu的数值进行重置

        //         }
        //     }
        // }
        selectMenu(state, val) {
            // 判断当前菜单name是否为home，如果是则将currentMenu属性设置为null，如果不是则将val赋值给currentMenu属性
            // val.name === 'home' ? (state.currentMenu = null) : (state.currentMenu = val)
            if (val.name !== 'home') {
                // 如果点击导航菜单不是home，将用户点击导航菜单对象赋值给currentMenu对象
                state.currentMenu = val
                // 如果点击导航菜单不是home，首先遍历tag标签数组tabsList是否已有val中的name，如果有则不再重复添加，没有则添加val到tag标签数组tabsList
                let result = state.tabsList.findIndex(item => item.name === val.name)
                result === -1 ? state.tabsList.push(val) : ''
            } else {
                state.currentMenu = null
            }
        },
        setMenu(state, val) {
            // 将传过来的menu放入cookie中 避免在浏览器刷新的时候丢失mneu数据
            //将传过来的val值放入menu中
            state.menu = val
            //大写的JSON
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            //将menu清空
            state.menu = []
            // 将cookie中的menu清空
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            // 如果cookie中没有值会返回开始的页面
            if (!Cookie.get('menu')) {
                return
            }
            //定义menu，然后是从cookie中的取出menu的值放入其中 后转成对象
            const menu = JSON.parse(Cookie.get('menu'))
            // 将menu状态中原为空的值改为传过来的的值
            state.menu = menu
            // 将其中分为有children的和没有chirldren的
            const menuArray = []
            // 对menu数据进行遍历 forEach
            menu.forEach(item => {
                if (item.children) {
                    // 要动态添加路由  对数据中的url进行拼接 路由的跳转在router/index.js中要有component所以要把他挑出来拼接到一起
                    item.children = item.children.map(item => {
                        item.component = () =>
                            // 将component用其mock中的路由模拟出来的 在permission.js中 然后用模板字符串拼接成component
                            import(`../views/${item.url}`)
                        return item
                    })
                    // ...item.children解构item.children
                    menuArray.push(...item.children)
                    console.log(item.children);
                    // 如果他是一个一级菜单 
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }

            });
            // 路由的动态添加  用forEach遍历menuArray
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        },
    }
}