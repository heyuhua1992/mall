import axios from 'axios'
// let base = 'http://cerky.s3.natapp.cc/btrisys'
let base = ''

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// axios.defaults.withCredentials = true

// 检查是否登陆
export const apiCheckLogin = () => {
  return axios.get(`${base}/users/checkLogin`).then(res => res.data)
}
// 登陆接口
export const apiLogin = params => {
  return axios.post(`${base}/users/login`, params).then(res => res.data)
}
// 登出接口
export const apiLogout = () => {
  return axios.post(`${base}/users/logout`).then(res => res.data)
}
// 查询商品数量
export const apiGetCartCount = () => {
  return axios.get(`${base}/users/getCartCount`).then(res => res.data)
}
// 查询用户地址接口
export const apiAddressList = () => {
  return axios.post(`${base}/users/addressList`).then(res => res.data)
}
// 设置默认地址
export const apiSetDefault = params => {
  return axios.post(`${base}/users/setDefault`, params).then(res => res.data)
}
// 删除地址
export const apiDelAddress = params => {
  return axios.post(`${base}/users/delAddress`, params).then(res => res.data)
}
// 查询当前用户购物车数据
export const apiCartList = () => {
  return axios.get(`${base}/users/cartList`).then(res => res.data)
}
// 购物车删除商品
export const apiCartDel = params => {
  return axios.post(`${base}/users/cartDel`, params).then(res => res.data)
}
// 商品数量修改
export const apiCartEdit = params => {
  return axios.post(`${base}/users/cartEdit`, params).then(res => res.data)
}
// 全选
export const apiEditCheckAll = params => {
  return axios.post(`${base}/users/editCheckAll`, params).then(res => res.data)
}
// 查询商品列表
export const apiList = params => {
  return axios.get(`${base}/goods/list`, params).then(res => res.data)
}
// 加入购物车
export const apiAddCart = params => {
  return axios.post(`${base}/goods/addCart`, params).then(res => res.data)
}
// 付款
export const apiPayMent = params => {
  return axios.post(`${base}/users/payMent`, params).then(res => res.data)
}
// 根据订单ID查询订单信息
export const apiOrderDetail = params => {
  return axios.get(`${base}/users/orderDetail`, params).then(res => res.data)
}
