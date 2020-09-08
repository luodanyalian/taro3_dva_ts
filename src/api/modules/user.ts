import config from '../../config/httpConfig'
import $HTTP from '../http'
import apiCode from '../code'

export default class User {
  // 微信静默登陆
  static async wxLogin(params) {
    const res = await $HTTP.request({
      url: `${config.server.uas}/oauth2/wechat-miniapp`,
      params,
      signType: 'user',
      errCode: apiCode.wxLogin
    })
    return res
  }
}
