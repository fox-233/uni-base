import Vue from 'vue'
import App from './App'
import {get, getLoading, post, postLoading, put, putLoading, delLoading} from '@/utils/fetch'
import {showToast, formatDate} from '@/utils/common.js'
import config from "@/utils/config.js"
Vue.config.productionTip = false
import hxNavbar from "@/components/hx-navbar/hx-navbar.vue"

// 配置项
Vue.prototype.$host = config.host
// 导航栏 【自定义导航的时候用】
Vue.component('hx-navbar',hxNavbar)
// 请求
Vue.prototype.$get = get
Vue.prototype.$getLoading = getLoading
Vue.prototype.$post = post
Vue.prototype.$postLoading = postLoading
Vue.prototype.$put = put
Vue.prototype.$putLoading = putLoading
Vue.prototype.$delLoading = delLoading
Vue.prototype.$showToast = showToast
Vue.prototype.$imgHost = config.imgHost
// 状态栏高度
Vue.prototype.$statusBarHeight = '(' + uni.getSystemInfoSync().statusBarHeight + 'px + 44px)'
// 全局过滤器，格式化时间戳用
Vue.filter("formatDate", (data,type='YYYY-MM-DD HH:ii:ss') => {
	if(!data) return
	return formatDate(new Date(data * 1000), type)
})

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
