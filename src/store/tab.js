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
            state.menu = val
            //大写的JSON
            Cookie.set('menu', JSON.stringify(val))
        },
        clearMenu(state) {
            state.menu = []
            Cookie.remove('menu')
        },
        addMenu(state, router) {
            if (!Cookie.get('menu')) {
                return
            }
            const menu = JSON.parse(Cookie.get('menu'))
            state.menu = menu
            const menuArray = []
            menu.forEach(item => {
                if (item.children) {
                    item.children = item.children.map(item => {
                        item.component = () =>
                            import(`../views/${item.url}`)
                        return item
                    })
                    console.log(item);
                    menuArray.push(...item.children)
                } else {
                    item.component = () => import(`../views/${item.url}`)
                    menuArray.push(item)
                }
                console.log(item);
            });
            // 路由的动态添加  用forEach遍历menuArray
            menuArray.forEach(item => {
                router.addRoute('Main', item)
            })
        },
    }
}