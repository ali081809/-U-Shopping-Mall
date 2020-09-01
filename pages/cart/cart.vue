<template>
	<view class="container">
		<view class="top">
			<view v-for="(item,index) in cartlist" :key="item.id">
				<scroll-view class="scroll-view_H" scroll-x="true" scroll-left="0">
					<view class="cartInfo" id="demo1">
						<!-- 购物车商品信息 -->
						<view class="cartInfochild">
							<!-- 选择框 -->
							<view class="cartInfo_switch common">
								<!-- 点击当前商品 -->
								<switch type="checkbox" @change="isonechecked($event,index)" :checked="item.checked" />
							</view>
							<!-- 图片 -->
							<view class="cartInfo_image common">
								<image :src="$imgUrl+item.img" mode=""></image>
							</view>

							<!-- 信息 -->
							<view class="cartInfo_info">
								<label for="" style="font-size: 26rpx;">{{item.goodsname}}</label>
								<label for="" style="font-size: 24rpx; color: #ccc;">规格：黑色</label>
								<label for="" style="color: red;">￥{{item.price}}</label>
							</view>
							<!-- 加减数量 -->
							<view class="cartInfo_num">
								<view class="cartInfo_num_child">
									<label for="" @click="changesub(index)">-</label>
									<label for="">{{item.num}}</label>
									<label for="" @click="changeadd(index)">+</label>
								</view>
							</view>
						</view>
						<view class="cartDel" id="demo2" @click="del(item.id)"><label for="">删除</label></view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- 底部 -->
		<view class="foot">
			<view class="footd1">
				<switch type="checkbox" :checked="allchecked" @change="isAll" />
				<label>全选</label>
			</view>
			<view class="footd2">
				<view class="footd2sp1">
					总计：
					<label style="color: red;">{{Totalprice}}</label>
				</view>
				<label class="footd2sp2">不含运费，已优惠￥0.00</label>
			</view>
			<!-- 跳到提交订单，结算页面 -->
			<view class="footd3" @click="orderadd">
				<!-- 被选中的商品的个数 -->
				<label>去结算({{allnum}}件)</label>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		cartlist,
		cartedit,
		cartdelete,
		checktoken
	} from "@/utils/requestdata.js"
	export default {
		data() {
			return {
				allnum: 0, //结算的数量
				allchecked: false, //是否选中
				isclose: true, //-号的开关
				adddata: {},
				subdata: {},
				$imgUrl: this.$imgUrl,
				cartlist: []
			}
		},
		// 计算属性
		computed: {

			Totalprice() {
				if (this.cartlist != null) {
					return this.cartlist.reduce((val, item) => item.checked ? val + item.price * item.num : val, 0)
				}


			}
		},
		methods: {
			// 点击删除
			async del(id) {
				// 调接口
				var deldata = await cartdelete({
					id: id
				}, {
					authorization: this.token
				})
				// 删除成功重新请求数据库
				if (deldata.data.code == 200) {
					this.uid = uni.getStorageSync("userinfo").uid;
					var res = await cartlist({
						uid: this.uid
					}, {
						authorization: this.token
					});
					this.cartlist = res.data.list;
				}

			},
			// 点击全选
			isAll(e) {
				this.allchecked = e.detail.value;
				this.cartlist = this.cartlist.map(item => {
					item.checked = this.allchecked;

					return item
				})

				this.cartlist.forEach(item => {
					console.log(item);
					let id = item.id;
					let num = item.num;
					let checked = item.checked ? 1 : 0;

					// token
					// this.token = uni.getStorageSync("userinfo").token;
					// console.log(this.token)
					if (checked) {
						// 结算的数量
						this.allnum += num;
					} else {
						this.allnum = 0
					}
					cartedit({
						id,
						num,
						checked
					}, {
						authorization: this.token
					});
				})
			},
			// 单个选中状态
			isonechecked(e, index) {
				const open = e.detail.value;
				this.cartlist[index].checked = open;
				this.allchecked = this.cartlist.every(item => item.checked);
				let {
					id,
					num,
					checked
				} = this.cartlist[index];
				checked = checked ? 1 : 0;
				if (checked) {
					// 结算的数量
					this.allnum += num;
				} else {
					this.allnum = this.allnum
				}
				cartedit({
					id,
					num,
					checked
				}, {
					authorization: this.token
				});

			},
			// 点击加号
			async changeadd(index) {
				this.cartlist[index].num += 1;
				let {
					id,
					num,
					checked
				} = this.cartlist[index];
				checked = checked ? 1 : 0;
				var result = await cartedit({
					id,
					num,
					checked
				}, {
					authorization: this.token
				});

			},
			// 点击减号
			async changesub(index) {
				if (this.cartlist[index].num < 2) {
					return;
				}
				this.cartlist[index].num -= 1;
				let {
					id,
					num,
					checked
				} = this.cartlist[index];
				checked = checked ? 1 : 0;
				await cartedit({
					id,
					num,
					checked
				}, {
					authorization: this.token
				});

			},

			// 点击结算
			orderadd() {
				var arr = []
				// 循环选中就存到本地
				this.cartlist.forEach(item => {
					if (item.checked) {
						arr.unshift(item)
					}
				})
				// 结算时为购物车为0时返回
				if (arr.length == 0) {
					uni.showToast({
						title: "请选择商品！",
						icon: 'none'
					})
					return;
				}
				// 存进本地
				uni.setStorageSync("order", arr)
				//跳到订单确认页
				uni.navigateTo({
					url: "/pages/confirm/confirm"
				})
			},

		},
		async onShow() {
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
				var res = await cartlist({
					uid: uid
				}, {
					authorization: this.token
				});
				if (res.data.list != null) {
					res.data.list.forEach(item => {
						item.checked = item.checked == 0 ? false : true;
					})
					this.cartlist = res.data.list;
					this.allchecked = this.cartlist.every(item => item.checked);
				}
			}

		}
	};
</script>

<style>
	@import url('../../common/css/cart.css');

	.cartInfo_image_img {
		width: 120rpx;
		height: 120rpx;
	}
</style>
