import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
    // baseURL: process.env.VUE_APP_URL, // api 的 base_url
    timeout: 5000 // 请求超时时间
})
// console.log(111111111);
// console.log(process.env.VUE_APP_URL);
// request拦截器
service.interceptors.request.use(
    config => {
        // if (store.getters.token) {
        // config.headers['X-Token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
        // }
        return config
    },
    error => {
        // Do something with request error
        console.log(error) // for debug
        Promise.reject(error)
    }
)

// response 拦截器
service.interceptors.response.use(
    response => {
        /**
         * code为非20000是抛错 可结合自己业务进行修改
         */
        const res = response.data;
        if (res.flag) {
            return res;
        } else {
            console.log(`查看错误输出`, res)
            Message({
                message: res.message,
                type: "error",
                duration: 5 * 1000
            });
            return false;
        }
    },
    error => {
        console.log('err' + error) // for debug
        Message({
            message: `没有请求到数据`,
            type: 'error',
            duration: 5 * 1000
        })
        return false
    }
)

export default service;