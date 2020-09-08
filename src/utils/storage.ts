import Taro from '@tarojs/taro'
import * as types from '../config/storage-key'

/** 设置Token信息 */
const setAuthInfo = data => {
  Taro.setStorageSync(types.PT_USER_AUTH_INFO, data)
}
/** 获取Token信息 */
const getAuthInfo = () => {
  const info = Taro.getStorageSync(types.PT_USER_AUTH_INFO)
  return info
}
/** 设置用户信息 */
const setUserInfo = data => {
  Taro.setStorageSync(types.PT_USER_INFO, data)
}
/** 获取用户信息 */
const getUserInfo = () => {
  const info = Taro.getStorageSync(types.PT_USER_INFO)
  return info
}

export default {
  setAuthInfo,
  getAuthInfo,
  setUserInfo,
  getUserInfo
}