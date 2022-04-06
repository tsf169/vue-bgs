import axios from './axios'

export const getMenu = (param) => {
    return axios.request({
        url: '/permission/getMenu',
        method: 'POST',
        data: param
    })
}
// axios拦截器
export const getData = () => {
    return axios.request({
        url: '/env/getData',
        //默认get请求
    })
}

export const getUser = (params) => {
    return axios.request({
        url: '/user/getUser',
        method: 'GET',
        params
    })
}