import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		userBase: {},
	},
	mutations: {
		setUserBase (state, status) {
			state.userBase = status
		},
	},
	
	// this.$store.dispatch
	actions: {
		// 获取用户基础信息
		getUserBase(context, data) {
			if(!uni.getStorageSync("token")) return
			this._vm.$get("/user/base").then(res => {
				context.commit('setUserBase', res.data)
				if(data?.fn) data.fn(data.vm)
			})
		},
	}
})

export default store