import config from './config'

function login() {
	uni.navigateTo({
		url: '/pages/login/login'
	})
}

function showToast(title) {
	setTimeout(() => {
		uni.showToast({
			title,
			icon: 'none',
			duration: 2000
		})
	}, 200)
}
/*
	isShowLoading： 是否显示loading
	isFirst： 是否需要token
	sucToast: 请求成功的提示
	errToast: 后端返回错误提示
*/
function request({
	method = 'GET',
	url,
	data = {},
	isShowLoading = false,
	isFirst = true,
	sucToast = false,
	errToast = true
}) {
	var header = {
		'Cache-Control': 'no-cache'
	}
	if (isFirst) {
		// 获取token、uid
		var token = uni.getStorageSync('token')
		if (!token) {
			uni.showToast({
				title: '缺少token',
				icon: 'none',
				duration: 2000
			})
			return new Promise((resolve, reject) => {
				login()
			})
		}
		header.token = token
	}
	if (isShowLoading) {
		uni.showLoading({
			title: '加载中',
			mask: true
		})
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: `${config.api}${url}`,
			data,
			method: method,
			header,
			success: res => {
				if (isShowLoading) {
					uni.hideLoading()
				}
				if (res.data.code === 2000) {
					resolve(res.data)
					if (sucToast) {
						showToast(res.data.msg)
					}
					return
				}
				if (res.data.code === 0) {
					resolve(res.data)
					if (errToast) {
						showToast(res.data.msg)
					}
					return
				}
				if (res.data.code === 401) { // 未登录
					showToast(res.data.msg)
					setTimeout(() => {
						login()
					}, 1500)
					return
				}
				if (res.data.code !== 2000) {
					// resolve(res.data)
					reject(res.data)
					if (errToast) {
						showToast(res.data.msg)
					}
					return
				}
			},
			fail: function(res) {
				// uni.hideLoading()
			},
			complete: () => {
				// setTimeout(() => {
				// uni.hideLoading()
				// }, 2000)
			}
		})
	})
}

function get(url, data, otherConfig) {
	var obj = {
		url,
		data,
	}
	Object.assign(obj, otherConfig) // otherConfig 其他配置
	return request(obj)
}

function getLoading(url, data, otherConfig) {
	var obj = {
		url,
		data,
		isShowLoading: true
	}
	Object.assign(obj, otherConfig) // otherConfig 其他配置
	return request(obj)
}

function post(url, data, otherConfig) {
	var obj = {
		method: 'POST',
		url,
		data,
	}
	Object.assign(obj, otherConfig)
	return request(obj)
}

function postLoading(url, data, otherConfig) {
	var obj = {
		method: 'POST',
		url,
		data,
		isShowLoading: true
	}
	Object.assign(obj, otherConfig)
	return request(obj)
}

function put(url, data, otherConfig) {
	var obj = {
		method: 'PUT',
		url,
		data,
	}
	Object.assign(obj, otherConfig)
	return request(obj)
}

function putLoading(url, data, otherConfig) {
	var obj = {
		method: 'PUT',
		url,
		data,
		isShowLoading: true
	}
	Object.assign(obj, otherConfig)
	return request(obj)
}

function delLoading(url, data, otherConfig) {
	var obj = {
		method: 'delete',
		url,
		data,
		isShowLoading: true
	}
	Object.assign(obj, otherConfig)
	return request(obj)
}
export {
	get,
	getLoading,
	post,
	postLoading,
	put,
	putLoading,
	delLoading
}