<template>
	<view class="container">
		<!-- s收货地址 -->
		<view class="address">
			<view class="address_info">
				<label for="">收件人:{{username}}</label>
				<label for="">{{userphone}}</label>
			</view>
			<view class="address_res">
				收货地址：<label for="">{{address}}</label>
			</view>
		</view>

		<!-- 商品信息 -->
		<view class="carts">

			<view class="cartsInfo" v-for="(item,index) in orderlist" :key="id">
				<!-- 70px -->
				<view class="carts_detail">
					<view class="carts_image">
						<image :src="$imgUrl+item.img" mode=""></image>
					</view>
					<view class="carts_name">
						<view for="" style="font-size: 30rpx;">{{item.goodsname}}</view>
						<view for="" style="font-size: 26rpx; color: #C0C0C0;">规格:300</view>
					</view>
					<view class="carts_price">
						<label for="">￥ {{item.price}}</label>
					</view>
				</view>
				<!-- 50px -->
				<view class="cart_num">
					<view class="">
						购买数量：
					</view>
					<view class="">
						<label for="" class="jian" @click="sub(index)">-</label>
						<label for="" class="num">{{item.num}}</label>
						<label for="" class="jia" @click="add(index)">+</label>
					</view>
				</view>
				<!-- 横线 -->
				<view class="xian"></view>
			</view>

			<!-- 50px -->
			<view class="kuaidi">
				<label for="">配送方式</label>
				<label for="">XX快递</label>
			</view>
		</view>

		<!-- 优惠券 -->
		<view class="yhquan">
			<label for="">优惠券</label>
			<label for="" style="margin-right: 40rpx;">无可用</label>
		</view>
		<!-- jifen积分 -->
		<view class="jifen">
			<view class="use">
				<label for="">使用积分</label>
			</view>
			<view class="input" style="margin-right: 40rpx;">
				<input type="text" value="" placeholder="输入积分" />
				<label for="" class="input_use">使用</label>
				<label for="" class="input_keyi">可使用50积分</label>
			</view>
		</view>

		<!-- 具体详细 -->
		<view class="resDetail">
			<view class="">
				<label for="">商品金额</label>
				<label for="" style="margin-right:40rpx;color:red">￥{{allPrice}}</label>
			</view>
			<view class="">
				<label for="">运费</label>
				<label for="" style="margin-right:40rpx;color:red">+￥0.00</label>
			</view>
			<view class="">
				<label for="">优惠券</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">会员优惠</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
			<view class="">
				<label for="">积分抵扣</label>
				<label for="" style="margin-right:40rpx;color:red">-￥0.00</label>
			</view>
		</view>
		<!-- 实付金额 -->
		<view class="sfje">
			实付金额：<label for="" style="color:red">￥{{ allPrice }}</label>
		</view>

		<!-- 确认订单按钮 -->
		<view class="btn">
			<!-- 点击提交订单按钮，发起支付请求 -->
			<button type="primary" @click="pay">提交订单</button>
		</view>
	</view>
</template>

<script>
	import {
		orderadd
	} from "@/utils/requestdata.js"
	export default {
		data() {
			return {
				// allPrice:0,//商品总金额
				username: "悟空", //收货人姓名
				userphone: "18301628393", //收货人联系方式
				address: "花果山水帘洞27号", //收货人地址
				$imgUrl: this.$imgUrl,
				orderlist: [] //选中订单额列表
			}
		},
		computed: {
			allPrice() {
				return this.orderlist.reduce((val, item) => val + item.price * item.num, 0)
			}
		},
		methods: {
			// 点击提交订单
			async pay() {
				// 挑出所有订单id
				var idarr = this.orderlist.map(item => {
					return item.id
				})
				// 将所有订单id转为字符串
				let idstr = idarr.join()

				// 所有商品的总数
				var countnumber = 0;
				this.orderlist.forEach(item => {
					countnumber += (item.num);

				})

				let {
					uid
				} = this.orderlist[0];
				// 商品总价
				let countmoney = this.allPrice;
				// 创建的时间
				let addtime = new Date().getTime()
				// token
				this.token = uni.getStorageSync("userinfo").token;
				// console.log(this.token)
				// 请求接口
				var data = {
					uid,
					username: this.username,
					userphone: this.userphone,
					address: this.address,
					countmoney,
					countnumber,
					addtime,
				}

				var res = await orderadd({
					params: JSON.stringify(data),
					idstr
				},{authorization:this.token})
				if (res.data.code == 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					// 跳到订单页
					uni.navigateTo({
						url: "/pages/order/order"
					})
				}
			},
			// 点击-
			sub(index) {
				if (this.orderlist[index].num < 2) {
					return;
				}
				this.orderlist[index].num -= 1;
				uni.setStorageSync("order", this.orderlist)
			},
			// 点击+
			add(index) {
				this.orderlist[index].num += 1;
				uni.setStorageSync("order", this.orderlist)
			}
		},
		onLoad() {
			var res = uni.getStorageSync("order");
			this.orderlist = res;
			console.log(res)
		}
	}
</script>
<style>
	@import url("../../common/css/confirm.css");
</style>
