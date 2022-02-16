import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

//全局用户数据

export default new Vuex.Store({
  state: {
    //用户信息初始化状态
    token: localStorage.getItem("token"),
    userInfo: JSON.parse(sessionStorage.getItem("userInfo")),
    //管理员信息
    managerInfo: ''
  },
  mutations: {
    //相当于javaBean的set
    SET_TOKEN: (state, token) => {
      state.token=token
      localStorage.setItem("token",token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem("userInfo",JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.token = ''
      state.userInfo = {}
      localStorage.setItem("token",'')
      sessionStorage.setItem("userInfo",JSON.stringify(''))
    },

    SET_MANAGERINFO: (state, managerInfo) => {
      state.managerInfo = managerInfo
      sessionStorage.setItem("managerInfo",JSON.stringify(managerInfo))
    },

    REMOVE_MANAGERINFO: state => {
      state.managerInfo = {}
      sessionStorage.setItem("managerInfo",JSON.stringify(''))
    }



  },
  getters: {
    //相当于javaBean的get
    getUserInfo: state => {
      return state.userInfo
    },

    getManagerInfo: state => {
      return state.managerInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
