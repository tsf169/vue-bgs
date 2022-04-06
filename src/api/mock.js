import Mock from "mockjs"
import envApi from "./mockServedata/env.js"
import permissionApi from "./mockServedata/permission.js"
import userApi from "./mockServedata/01.js"
//echarts数据拦截器
// 指定的api地址
Mock.mock('/env/getData', envApi.getEnvData)


// 定义一个getMenu的拦截器 拦截我们的getMenu这个结构

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)

// 通过对接口的拦截实现对数据的模拟

Mock.mock(/user\/add/, 'post', userApi.createUser)
Mock.mock(/user\/edit/, 'post', userApi.updateUser)

Mock.mock(/user\/getUser/, 'get', userApi.getUserList)
Mock.mock(/user\/del/, 'post', userApi.deleteUser)