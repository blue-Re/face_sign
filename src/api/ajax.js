import axios from 'axios'

export function ajax(config){
  const instance = axios.create({
    baseURL:'http://47.93.229.38:7664'
  })
  // 2.axios拦截器
  // 请求拦截
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    // console.log(err)
  })
  // 响应拦截
  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err)
  })
  return instance(config)
}