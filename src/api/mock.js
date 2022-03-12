import Mock from "mockjs"
import envApi from "./mockServedata/env.js"
import permissionApi from "./mockServedata/permission.js"
Mock.mock('/env/getData', envApi.getEnvData)


// 定义一个getMenu的拦截器 拦截我们的getMenu这个结构

Mock.mock(/permission\/getMenu/, 'post', permissionApi.getMenu)