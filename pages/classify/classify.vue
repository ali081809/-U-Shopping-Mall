<template>
	<view class="container">
		<!-- left左侧列表 -->
		<view class="left">
			<!-- 循环遍历的 -->
			<view class="left_list" :class="current==index?'activeList':''" v-for="(item,index) in list" :key="item.id" @click="lookgoods(index,item.id)">
				<label for="">{{item.catename}}</label>
			</view>
			
		</view>
		<!-- right右侧详细分类商品 -->
		<view class="right">
			<!-- 每一个小类 -->
			<view class="right_list">
				<!-- 商品 -->
				<view class="bottom">
					<view class="bottom_list" v-for="item in list[current].children" :key="item.id" @click="toclassinfo(item.id)">
						<!-- 每个最多显示6个 -->
						<view >
							<image :src="$imgUrl+item.img" alt="">
						</view>
						<view class="title">
							<span>{{item.catename}}</span>
						</view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		
	</view>
</template>

<script>
	import {getcates,getcategoods} from "@/utils/requestdata.js"
	export default{
		data(){
			return{
				id:"",
				$imgUrl:this.$imgUrl,
				current:0,
				list:[{children:[]}]
			}
		},
		methods:{
			// 点击一级分类出二级分类商品
			lookgoods(index,id){
				// 一级分类的id
				this.id=id;
				// 选中状态的下标
				this.current=index
				},
				// 跳到商品列表页
				async toclassinfo(){
					// 所有一级分类下的商品
					// var result=await getcategoods({fid:id})
					// console.log("ddddd",result)
					// 跳转
					uni.navigateTo({
						url:"/pages/product/product?id="+this.id
					})
					}
		},
		async onLoad() {
			var res=await getcates()
			this.list=res.data.list;

		}
	}
</script>

<style>
	/* 导入外部的样式文件 */
	@import url("../../common/css/classify.css");
	
	/* 点击左侧导航，显示动态样式 */
	.activeList{
		border-left: 6rpx solid #f26b11;
		color: #f26b11;
	}
</style>
