<template>
	<view>
		<hx-navbar title="首页" :back="false" color="#000" :background-color="[255,255,255]" statusBarFontColor="#000000" fixed></hx-navbar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				imgHost: this.$imgHost,
			}
		},
		onLoad() {},
		onShow() {},
		methods: {
			// 跳转
			goPage(url) {
				uni.navigateTo({
					url: url
				})
			}
		},
	}
</script>

<style lang="stylus" scoped>
	
</style>