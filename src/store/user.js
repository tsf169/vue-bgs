 import Cookie from 'js-cookie'
 export default {
     state: {
         //  先设定一个token的空字符串
         token: ''
     },
     mutations: {
         //  设定几个mutations用于改变token
         // setToken用于设置token
         setToken(state, val) {
             //  传过来的val设置为toke
             state.token = val;
             // Cookie.set将传过来的val的设置为token
             Cookie.set('token', val);
         },
         //清空token
         clearToken(state) {
             state.token = ""
            //  清空token
             Cookie.remove('token');
         },
         //getToken用于获取我们的token 向外暴露的值
         getToken(state) {
             //如果有Cookie中token就用Cookie的,如果没有就state.token
             state.token = state.token || Cookie.get('token');
         },
     },
 }