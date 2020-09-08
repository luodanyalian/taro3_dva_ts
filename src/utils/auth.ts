import Taro from '@tarojs/taro'
import USER from '../api/modules/user'
import * as keys from '../config/storage-key'

export default class Auth {
  /**
   * 通行证登录后回调，并进行数据处理
   * @param data
   */
  static passDataHandle(data) {
    // 授权后的数据进行处理
  }

  /**
   * 微信静默授权登录，获取接口访问token
   * @param cb 
   */
  static getApiToken(client_id: string) {
    return new Promise(async (resolve, reject) => {
      // 获取code
      const { code } = await Taro.login()
      const res = USER.wxLogin({
        client_id,
        code
      })

      if (res.code === 0) {
        Taro.setStorageSync(keys.PT_USER_AUTH_INFO, res.data)
      }
      resolve(res.data)
    })
  }
}
