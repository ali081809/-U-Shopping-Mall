<template>
	<view class="container">
		<!-- 详情图片 -->
		<view class="detailImage">
			<image :src="info.img">
		</view>
		<!-- 详情基本信息 -->
		<view class="detailInfo">
			<view class="detailInfoName">
				<label>{{info.goodsname}}</label>
			</view>
			<view class="detailInfoPrice">
				<label style="color: red;">￥ {{info.price}}</label>
				<label style="font-size: 24rpx;color: #ccc;">(此价格不与套装优惠同时享受)</label>
			</view>
		</view>

		<!-- 基本信息改变 -->
		<view class="changeInfo">
			<view class="youhui">
				<view>促销：<label class="manjian">满减</label><label class="dazhe">满2件9折；3件8折</label></view>
			</view>
			<!-- 数量加减 -->
			<view class="changeNum">
				<view class="num">购买数量</view>
				<view class="action">
					<label class="jian" @click="sub">-</label>
					<label class="zhi">{{Mnum}}</label>
					<label class="jia" @click="add">+</label>
				</view>
			</view>
			<!-- 商品属性 -->
			<view class="changeState">
				<view class="productStat">
					<label for="">商品属性</label>
				</view>
				<view class="productGuige">
					<label>规格</label>
					<view class="threed3i1" v-for="item in info.specsattr" :key="item">{{item}}</view>
					<!-- <view class="threed3i2">5g</view> -->
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="productDetail">
			<view class="productDetailTitle">商品详情</view>
			<!-- 需要处理图片自适应问题 -->
			<view v-html="info.description"></view>
			<!-- <image src="/static/detail/2.jpg" mode="aspectFill"/> -->
		</view>

		<view class="productEval">
			<view class="eval">商品评价</view>
			<view>
				<label class="evalUsername">小李白</label>
				<label class="evalUsertitle">效果很好，物流到位，下次继续来</label>
				<view class="evalImage">
					<image src="../../static/detail/pingjia1.jpg" />
					<image src="../../static/detail/pingjia2.jpg" />
					<image src="../../static/detail/pingjia3.jpg" />

				</view>
				<label class="evalTime">2020-01-13</label>
			</view>
		</view>
		<!-- 底部按钮 -->
		<view class="foot">
			<button class="footbtn1" @click="addcart">加入购物车</button>
			<button class="footbtn2">立即购买</button>
		</view>
	</view>
</template>
<script>
	import {
		requstgetgoodsinfo,
		baseUrl,
		cartadd,
		checktoken
	} from "@/utils/requestdata.js"
	export default {
		data() {
			return {
				data: {},
				Mnum: 1,
				info: []
			}
		},
		methods: {
			// 点击-
			sub() {
				if (this.Mnum < 1) {
					this.Mnum = 0;
					return;
				}
				this.Mnum--
			},
			// 点击+
			add() {
				this.Mnum++
			},
			// 加入购物车
			async addcart() {
				// 进入页面首先判断token是否过期，过期就跳到登录页
				// token
				this.token = uni.getStorageSync("userinfo").token;
				var restoken = await checktoken({
					authorization: this.token
				})
				if (restoken.data.code == 403) {
					uni.reLaunch({
						url: "/pages/send/send"
					})
					return;
				} else {
					let uid = uni.getStorageSync("userinfo").uid
					this.data = {
							uid,
							goodsid: this.info.id,
							num: this.Mnum
						},
						this.carlist = await cartadd(this.data, {
							authorization: this.token
						});
					console.log(this.carlist)
					if (this.carlist) {
						uni.showToast({
							title: "加入购物车成功！"
						})
					}
				}


			}
		},
		async onLoad(opction) {
			const {
				id
			} = opction
			console.log(id)
			var res = await requstgetgoodsinfo({
				id: id
			});
			this.info = res.data.list[0]
			this.info.img = baseUrl + this.info.img
			// 将商品规格字符串转为数组
			this.info.specsattr = this.info.specsattr.split(',')
		}
	}
</script>
<style>
	@import url("../../common/css/details.css");
</style>
