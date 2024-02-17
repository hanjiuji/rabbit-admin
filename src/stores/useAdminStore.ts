import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('Admin', () => {
  // userinfo类型
  type userInfos = {
    id: Number,
    account: String,
    password: String,
    name: String,
    sex: Number,
    img: String,
    phone: String,
    leaveMsg: String,
    sign: Number,
    createTime: String,
    updateTime: String,
    token: String
    articleList: Number,
    categoryCount: Number,
    labelCount: Number,
  }
  const token = ref("");
  // 用户的信息
  const userInfo = ref<userInfos>({
    id: 0,
    account: '',
    password: '',
    name: '',
    sex: 0,
    img: '',
    phone: '',
    leaveMsg: '',
    sign: 0,
    createTime: '',
    updateTime: '',
    token: '',
    articleList: 0,
    categoryCount: 0,
    labelCount: 0,
  })
  // 设置用户信息
  const setUserInfo = (params: any) => {
    userInfo.value = params
  }
  return { token, userInfo, setUserInfo }
}, {
  persist: true
})
