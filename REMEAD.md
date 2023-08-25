
hx-navbar 自定义导航栏插件
消息提示：this.$showToast('xxx', false) // 'xxx' 替换为提示内容，默认开启蒙版，设置false不开启
请求方法：
	otherConfig = { // 其他配置的默认值
		isFirst：true, // 是否需要token
		sucToast:false, // 请求成功的提示
		errToast: true, // 后端返回错误提示
	}
不带loading
	this.$get(url, data, otherConfig).then(res => {})
带loading
	this.$getLoading(url, data, otherConfig).then(res => {})
	