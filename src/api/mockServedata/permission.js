import Mock from "mockjs"
export default {
    getMenu: config => {
        const {
            username,
            password
        } = JSON.parse(config.body)
        //先判断用户是否存在
        //判断账号和密码是否对应
        if (username === "admin" && password === "123456") {
            return {
                code: 200,
                data: {
                    menu: [{
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "home/index.vue",
                        },
                        {
                            path: "/env",
                            name: "env",
                            label: "环境管理",
                            icon: "video-play",
                            url: "environment/index.vue",
                        },
                        {
                            path: "/user",
                            name: "user",
                            label: "用户管理",
                            icon: "user",
                            url: "user/index.vue",
                        },
                        {
                            label: "其他",
                            icon: "location",
                            children: [{
                                    path: "/page1",
                                    name: "page1",
                                    label: "页面1",
                                    icon: "setting",
                                    url: "other/pageOne.vue",
                                },
                                {
                                    path: "/page2",
                                    name: "page2",
                                    label: "页面2",
                                    icon: "setting",
                                    url: "other/pageTwo.vue",
                                },
                            ],
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else if (username === 'xiaoming' && password === 'xiaoming') {
            return {
                code: 200,
                data: {
                    menu: [{
                            path: "/",
                            name: "home",
                            label: "首页",
                            icon: "s-home",
                            url: "Home/Home",
                        },
                        {
                            path: "/env",
                            name: "env",
                            label: "环境管理",
                            icon: "video-play",
                            url: "envMange/envMange",
                        },
                    ],
                    token: Mock.Random.guid(),
                    message: '获取成功'
                }
            }
        } else {
            return {
                code: -999,
                data: {
                    message: '密码错误'
                }
            }
        }
    }
}