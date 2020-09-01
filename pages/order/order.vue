]<template>
	<view>
		<uni-search-bar radius="100" bgColor="#ffff"></uni-search-bar>
		<view class="list">
			<view class="row" v-for="(item,index) in orderlist" :key="item.id">
				<view class="products"  v-for="i in orderlist[index].child" :key="i.goodsname">
					<view class="imagebox">
						<image :src="$imgUrl+i.img" mode="widthFix"></image>
						<text>{{i.goodsname}}</text>
					</view>
				</view>
				<view class="info">
					<text  space="nbsp">总计{{item.countnumber}}商品  </text>  
					<text>应付金额 ￥{{item.countmoney}}</text>
				</view>
			</view>
		
		</view>
		<view class="tishi">
			没有数据亲！
		</view>
	</view>
</template>

<script>
	import {orders} from "@/utils/requestdata.js"
	export default{
		data(){
			return{
				$imgUrl:this.$imgUrl,
				orderlist:[{child:[]}]
			}
		},
		async onLoad() {
			let {token,uid}=uni.getStorageSync("userinfo");
			// let uid="2be08210-70fa-11ea-9c17-a5b3f9b0d2ba";
			var res=await orders({uid:uid},{authorization:token});
			this.orderlist=res.data.list;
		}
	}
</script>
<style>

	.row{
		margin: 10rpx 20rpx;
		/* height: 240rpx; */
		border: 1rpx solid #AAAAAA;
		border-radius: 30rpx;
	}
	
	.imagebox{
		float: left;
		margin:10rpx;
	}
	.products{
		overflow: hidden;
	}
	image{
		width: 160rpx;
		margin-left: 10rpx;
	}
	.info{
		/* position: absolute;
		top: 180rpx;
		right: 50rpx; */
		display: flex;
		justify-content: space-between;
		font-size: 25rpx;
		/* width: 340rpx; */
		padding: 20rpx;
		text-align: right;
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
