<template>
	<view>
		<view class="search">
			<icon type="search" color="white" size="10"></icon>
			<input type="text" value="" v-model="searchinfo" placeholder="搜索商品" @confirm="doSearch(searchinfo)" placeholder-class="placeholder"  />
		</view>
		<view class="list">
			<view class="row" v-for="item in list" :key="item.id" @click="todetail(item.id)">
				<image :src="item.img" mode="widthFix"></image>
				<view class="info">
					<text>{{item.goodsname}}</text>	
					<text>￥{{item.price}}</text>	
					<text>3565评论</text>	
				</view>
			</view>
			
		</view>
		<view class="tishi">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {requstgetcategoods,baseUrl,requstgetgoodsinfo} from "@/utils/requestdata.js"
	export default{
		data(){
			return{
				searchinfo:"",//搜索的商品
				list:[]
			}
		},
		async onLoad(opction){
			const {id}=opction;
			var res=await requstgetcategoods({fid:id})
			this.list=res.data.list;
			if(this.list==null){
				return this.list=[]
			}
			this.list.forEach(item=>{
				item.img=baseUrl+item.img
			})
		},
		methods:{
			// 跳到商品详情页
			todetail(id){
				uni.navigateTo({
					url:"/pages/details/details?id="+id
				})
			},
			// 按下回车键进行搜索
			doSearch(msg){
				console.log(msg)
				// 跳到搜索结果页
				uni.navigateTo({
					url:"/pages/search/search?keywords="+msg
				})
				}
		}
	}
	
</script>

<style>
	.search{
		margin: 50rpx;
		height: 80rpx;
		background-color: #f26b11;
		border-radius: 80rpx;
		color: white;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	icon{
		margin:0 10rpx 0 250rpx;
	}
	.placeholder{
		color: white;
		font-size: 25rpx;
	}
	.row{
		position: relative;
		margin: 10rpx 20rpx;
		height: 330rpx;
		border-bottom: 1rpx solid #AAAAAA;
	}
	image{
		position: absolute;
		top: 0;
		left:10rpx;
		width: 160rpx;
	}
	.info{
		height: 85%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 200rpx;
		display: flex;
		justify-content: space-around;
		flex-direction: column;
		font-size: 25rpx;
	}
	.info text:nth-of-type(2){
		color: red;
	}
	.info text:nth-of-type(3){
		font-size: 20rpx;
		color: #AAAAAA;
	}
	.tishi{
		line-height: 200rpx;
		text-align: center;
		font-size: 40rpx;
		color: #006699;
	}
</style>
