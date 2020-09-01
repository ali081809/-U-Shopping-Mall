<template>
	<view class="box">
		<view class="row">
			<text>手机号</text>
			<input type="text" v-model="phone" maxlength="12" />
		</view>
		<view class="row">
			<view class="send">
				<text>验证码</text>
				<!-- <text @click="send" :disabled="!showText">{{showText?'发送':second}}</text> -->
				<text  @click="send" v-if="showText">{{'发送'}}</text>
				<text  v-else="!showText">{{second}}</text>
			</view>
			<input type="text" v-model="code" placeholder="- - - -" maxlength="4" />
		</view>
		<view class="row">
			<text style="font-size: 23rpx;">收不到验证码？试试 <text style="color:#00BB00;font-size: 23rpx;"> 语音验证</text></text>
			<!--   -->
			<button type="primary" @click="login" style="width: 90%;border-radius: 80rpx;margin-top: 50rpx;">登录</button>
		</view>
		<view class="row">
			<text style="color: #006699;text-align: center;">通过微信授权登录</text>
		</view>
	</view>
</template>

<script>
	import {sms,wxlogin} from "@/utils/requestdata.js"
	export default {
		data() {
			return {
				phone:"",//手机号
				code:"",//验证码
				showText:true,
				second: 60 //60秒
			}
		},
		methods: {
			// 点击发送
			async send() {
				if(!(/^1[3456789]\d{9}$/.test(this.phone))){
					uni.showToast({
						title:"请输入正确的手机号！",
						icon:"none"
					})
					return
				}
				this.showText = false
				var interval = setInterval(() => {
					--this.second
				}, 1000)
				setTimeout(() => {
					clearInterval(interval)
					this.showText = true
					this.second=60
				}, 60000)
				
				// 请求短信验证码
				var dx=await sms({phone:this.phone})
				// 将短信验证存到本地
				var code=dx.data.list.code;
				uni.setStorageSync("code",code)
			},
			// 点击登录
			async login(){
				// 登录判空
				if(this.phone==""||this.code==""){
					uni.showToast({
						title:"手机号或验证码不能为空！",
						icon:"none"
					})
					return
				}
				// 校验验证码/
				var code=this.code;
				var codeStorage=uni.getStorageSync("code")
				if(code==codeStorage){
					// 执行登录
					var res =await wxlogin({phone:this.phone})
					let {scode,smsg}=res.data;
					console.log(res.data.code,res.data.msg)
					// 登录成功弹框
					if(res.data.code==200){
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
					// 获取用户的信息
					var userinfo=res.data.list;
					// 存到本地
					uni.setStorageSync("userinfo",userinfo)
					// 跳转到我的页面
					uni.reLaunch({
						url:"/pages/mine/mine"
					})
				}else{
					uni.showToast({
						title:"验证码错误!",
						icon:'none'
					})
				}
				}
		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	/* @import url("../../common/css/index.css"); */
	.box {
		position: relative;
	}

	.row {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		margin: 40rpx;
	}

	.send {
		display: flex;
		justify-content: space-between;
	}

	.send text:nth-of-type(2) {
		color: #00BB00;
	}

	text {
		font-size: 27rpx;
		margin-bottom: 10rpx;
	}

	input {
		border-bottom: 1rpx solid gray;
		height: 65rpx;
	}
</style>
