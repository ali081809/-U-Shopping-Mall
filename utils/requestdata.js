import request from "@/utils/request.js"
export const baseUrl = "http://127.0.0.1:3000"

// 获取一级分类信息(首页快速分类导航)
export const requstGetcate = async (data) => {
	return await request("/api/getcate", data)
}
//获取一级分类下的所有商品
export const requstgetcategoods = async (data) => {
	return await request("/api/getcategoods", data)
}
// 请求轮播图
export const requstBanner = async (data) => {
	return await request("/api/getbanner", data)
}
// 获取限时秒杀信息(首页)
export const requstseckill = async (data) => {
	return await request("/api/getseckill", data)
}
// 获取商品信息(首页)
export const requstgoods = async (data) => {
	return await request("/api/getindexgoods", data)
}
// 获取一个商品信息
export const requstgetgoodsinfo = async (data) => {
	return await request("/api/getgoodsinfo", data)
}
// 加入购物车
export const cartadd = async (data,header) => {
	return await request("/api/cartadd", data,header)
}
// 购物车列表
export const cartlist = async (data,header) => {
	return await request("/api/cartlist", data,header)
}
// 购物车修改
export const cartedit = async (data,header) => {
	return await request("/api/cartedit", data,header)
}
// 购物车删除
export const  cartdelete=async(data,header)=>{
	return await request("/api/cartdelete",data,header)
}
// 获取商品全部分类信息(首页全部分类，数据呈递归树状)
export const getcates = async (data) => {
	return await request("/api/getcates", data)
}
// 获取一级分类下的所有商品
export const getcategoods = async (data) => {
	return await request("/api/getcategoods", data)
}
// 搜索
export const search = async (data) => {
	return await request("/api/search", data)
}
// 订单的添加
export const orderadd = async (data,header) => {
	return await request("/api/orderadd", data,header)
}
// 订单查询
export const orders=async (data,header)=>{
	return await request("/api/orders",data,header)
}
// 发送短信验证
export const sms = async (data) => {
	return await request("/api/sms", data)
}
// 微信小程序登录注册（注册即登录  新用户登录	即注册，老用户即登录）
export const wxlogin =async (data)=>{
	return await request("/api/wxlogin",data)
}
// 检测token是否过期
export const checktoken=async (header)=>{
	return await request("/api/checktoken",{},header)
}
