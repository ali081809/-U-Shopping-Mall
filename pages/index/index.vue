<template>
	<view class="">
		<!-- 顶部信息 -->
		<view class="HomeTop">
			<view class="logoView">
				<!-- logo -->
				<img class="logo" src="/static/index/logo.jpg" alt="" />
			</view>
			<view class="inputView">
				<input class="textinput" style="center" type="text" v-model="searchinfo" @confirm="doSearch(searchinfo)"
				 placeholder="寻找商品" />
			</view>
		</view>

		<!-- 顶部导航  scroll-view -->
		<view class="tabs">
			<scroll-view id="tab-bar" class="scroll-h" :scroll-x="true" :show-scrollbar="false">
				<view class="uni-tab-item" data-current="0">
					<text class="uni-tab-item-title uni-tab-item-title1" :class="current==0?'uni-tab-item-title-active':''" @click="tolist(0)">
						推荐
					</text>
					<text class="uni-tab-item-title" :class="current==item.id?'uni-tab-item-title-active':''" v-for="(item,index) in navlist"
					 :key="item.id" @click="tolist(item.id)">
						{{item.catename}}
					</text>

				</view>
			</scroll-view>
		</view>
		<!-- 推荐轮播图 -->
		<view class="">
			<swiper :indicator-dots="true" :autoplay="true" :interval="2000" :duration="1000">
				<swiper-item v-for="item in bannerlist" :key="item.id">
					<view class="swiper-item">
						<image :src="item.img" mode=""></image>
					</view>
				</swiper-item>

			</swiper>
		</view>

		<!-- 功能导航开始 -->
		<!-- 功能导航 -->
		<view class="FunctNavCon">
			<view class="FunctNavLi">
				<image src="../../static/index/xiaohuoban.png" alt class="FunImg" />
				<p>限时抢购</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/jifentixicopy.png" alt class="FunImg" />
				<p>积分商城</p>
			</view>
			<view class="FunctNavLi">
				<image src="../../static/index/lianxiwomen.png" alt class="FunImg" />
				<p>联系我们</p>
			</view>
			<view class="FunctNavLi" @click="toclassif">
				<image src="../../static/index/-shangpinfenlei-gai.png" alt class="FunImg" />
				<p>商品分类</p>
			</view>
		</view>

		<!-- 推荐部分 未写 -->
		<view class="HotGoods">
			<!-- 热推左侧 -->
			<view class="HotLeft">
				<view class="LimitedContent">
					<image class="LimitedImg" src="../../static/index/xianshi.jpg" alt />
					<label class="Limited">限时秒杀</label>
				</view>
				<p class="LimitedTitle">每天零点场，好货秒不停</p>
				<!-- 倒计时 -->
				<view class="LimitTimeAll">
					<label class="LimitTime">{{hour}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{minute}}</label>
					<view class="maohao">:</view>
					<label class="LimitTime">{{second}}</label>
					<label class="Seckill">秒杀</label>
				</view>
				<image src="../../static/index/goods2.jpg" class="LimitedgoodsImg" alt="">
			</view>

			<!-- 热推右侧 -->
			<view class="HotRight">
				<!-- 右侧顶部部分 -->
				<view class="HotTop">
					<view class="HomeTopInfo">
						<view class="HomeTopInfoOne">
							<label class="BrandNew">品牌上新</label>
							<label class="Discount">折</label>
						</view>
						<view class="HomeTopRobbig">
							<label>每日九点，抢大牌</label>
						</view>
					</view>
					<!-- <div> -->
					<view class="Cloth">
						<image src="../../static/index/goods1.jpg" alt="">
					</view>

					<!-- </div> -->
				</view>
				<!-- 右侧底部 -->
				<view class="HotBottom">
					<view class="HotBottomLeft">
						<view class="HotBottomLeftInfo">
							<label class="HotBottomLeftInfoTitle">每日十件</label>
							<label class="HotBottomLeftInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomLeftImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
					<view class="HotBottomRight">
						<view class="HotBottomRightInfo">
							<label class="HotBottomRightInfoTitle">每日十件</label>
							<label class="HotBottomRightInfoDetail">只为你选好货</label>
						</view>
						<view class="HotBottomRightImage">
							<image src="../../static/index/goods1.jpg" mode=""></image>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 轮播图2 -->
		<div class="Swiper2">
			<image class="Swiper2Img" src="../../static/index/swiper1.jpg" alt />
		</div>

		<!-- 底部商品列表 -->
		<view class="products">
			<!-- 商品标签 -->
			<view class="tags">
				<view class="tag_list" :class="goodsTitle==index?'active_tag_list':''" v-for="(item,index) in titleArr" :key="item"
				 @click="changeTitle(index)">
					<label for="">{{item}}</label>
				</view>
			</view>
			<!-- 标签对应的商品 -->
			<view class="tags_product">
				<view class="product"  v-for="item in goodslist[goodsTitle].content" :key="item.id" @click="todetail(item.id)">
					<view class="GoodsLeft">
						<image class="GoodsImg" :src="$imgUrl+item.img" alt />
					</view>
					<view class="GoodsCont">
						<view class="GoodConTit">{{item.goodsname}}</view>
						<view class="GoodsPrice">￥{{item.price}}</view>
						<view class="yimai">已售8000件</view>
						<view class="Immed">立即抢购</view>
					</view>
				</view>

			</view>
		</view>
	</view>
</template>

<script>
	import {
		requstBanner,
		requstseckill,
		baseUrl,
		requstgoods,
		requstGetcate,
		getcates
	} from "@/utils/requestdata.js"
	export default {
		data() {
			return {
				hour:"",//时
				minute:"",//分
				second:"",//秒
				searchinfo: "", //搜索框的值
				$imgUrl: this.$imgUrl,
				goodsTitle: 0, //商品标签
				titleArr: ["热门推荐", "发现好货", "只看专场"], //商品标题
				current: 0, //分类导航下标
				navlist: [], //首页分类导航
				bannerlist: [], //轮播图路径
				goodslist: [{content:[]}], //商品三组信息列表
			}
		},
		methods: {
			// 跳到搜索页
			doSearch(msg) {
				uni.navigateTo({
					url: "/pages/search/search?keywords=" + msg
				})
			},
			// 跳到详情页
			todetail(id) {
				uni.navigateTo({
					url: "/pages/details/details?id=" + id
				})
			},
			// 列表导航跳到列表页
			tolist(id) {
				this.current = id
				// console.log(id)
				// 跳转
				uni.navigateTo({
					url: "/pages/product/product?id=" + id
				})
			},
			// 点击商品标签
			changeTitle(index) {
				this.goodsTitle = index;
			},
			// 点击商品分类
			toclassif() {
				uni.navigateTo({
					url: "/pages/classify/classify"
				})
			}
		},
		async onLoad() {
			// 请求分类导航
			var navdata = await requstGetcate();
			this.navlist = navdata.data.list
			// 请求轮播图
			var banner = await requstBanner();
			this.bannerlist = banner.data.list;
			this.bannerlist.forEach(item => {
				item.img = baseUrl + item.img
			})
			// 请求秒杀
			var mseckill = await requstseckill()
			// 开启定时器
			let timer = setInterval(() => {
				// 开始的时间（获取当前的时间）
				var begintime = new Date().getTime();
				// 结束时间（获取活动的结束时间）
				var endtime = mseckill.data.list[0].endtime;
				// 获取活动的时间差，结束-开始
				var time = parseInt((endtime - begintime) / 1000); //时间差
				// 时
				this.hour = Math.floor(time / 3600)
				// 分
				this.minute = Math.floor(time % 3600 / 60)
				// 秒
				this.second = Math.floor(time % 3600 % 60)
				// 判位数，少于两位数时添0
				this.hour=this.hour < 10 ? '0' + this.hour : this.hour
				this.minute=this.minute < 10 ? '0' + this.minute : this.minute
				this.second=this.second < 10 ? '0' + this.second : this.second
				if (this.hour == '00' && this.minute == '00' && this.second == '00') {
					clearInterval(timer)
				}
			}, 1000)
			// 请求商品列表信息
			var goods = await requstgoods();
			this.goodslist = goods.data.list;

		}

	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/index.css");
</style>
