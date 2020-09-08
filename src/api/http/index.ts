import Taro from '@tarojs/taro'
import MD5 from 'js-md5'
import $config from '../../config/httpConfig'
import { PT_USER_AUTH_INFO } from '../../config/storage-key'

/**
 * @signType 1.通行证user 2.业务bus 3.文件上传upload 4.地址库other
 */

const initRetryTimes = 10 // 重新请求次数
const eCodeMap = [5002, 5003, 602] // 遇到相关错误码需重新请求

/** 去除空格和换行 */
const formatText = str => {
  return str.replace(/[ \r\n]/g, '')
}

/** 获取时间戳 */
const timeStamp = () => {
  return Math.round(new Date().getTime() / 1000)
}

/** 获取随机字符串 */
const randomString = (num = 8) => {
  const chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' // 默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1
  const maxPos = chars.length
  let pwd = ''
  for (let i = 0; i < num; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return pwd.trim()
}

/** 获取用户通行证签名 */
const getSignature = (params, signType) => {
  // 获取参数中的key，并将键值组成的数组排序
  const paramKeys = Object.keys(params)
  const keysArray = paramKeys.sort((a, b) => a.localeCompare(b))

  // 秘钥拼接
  let signature = ''
  keysArray.map(
    item => (signature += `${item}=${encodeURIComponent(params[item])}&`)
  ) // 拼接请求参数
  signature = signature.substr(0, signature.length - 1) // 去除末尾&

  formatText(signature) // 去除字符串中的空格和换行

  // 服务不同签名方式不同
  const { user, bus, upload, other } = $config.global.signature
  let newSignature = ''
  if (signType === 'user') {
    newSignature = signature + user
  } else if (signType === 'upload') {
    newSignature = signature + upload
  } else if (signType === 'other') {
    newSignature = signature + other
  } else {
    newSignature = bus + signature + bus
  }

  // MD5对拼接字符串加密
  if (signType === 'bus') {
    params.signature = MD5(newSignature)
  } else {
    params.sign = MD5(newSignature)
  }

  return params
}

export default class HttpRequest {
  constructor() {}

  // 初始化请求次数
  retryTimes = 0
  // 初始化定时器
  timer = null

  /** 封装请求方法 */
  static request(config) {
    const { token, uid } = Taro.getStorageSync(PT_USER_AUTH_INFO) || {}
    const { url, method, signType } = config
    // 请求方式
    const $method = method || 'POST'
    // 配置header
    const $header = {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: token ? `Bearer ${token}` : '',
      appkey: $config.global.appkey
    }
    // 配置请求参数
    let params = {}
    if (signType) {
      params = {
        ...config.params
      }
      if (signType !== 'user') {
        params['rnd'] = randomString()
        params['timestamp'] = timeStamp()
      }
    } else {
      params = {
        ...config.params,
        uid,
        token
      }
    }
    const $data = getSignature(params, signType)

    // 请求等待
    // Taro.showLoading({
    //   title: '加载中'
    // })

    return new Promise((resolve, reject) => {
      Taro.request({
        url,
        method: $method,
        data: $data,
        header: $header,
        // 响应成功
        success(r) {
          const { statusCode, data, message } = r

          if (statusCode === 200) {
            resolve(data)
          } else if (
            eCodeMap.includes[data.code] ||
            eCodeMap.includes[data.http_code] ||
            eCodeMap.includes[data.error_code]
          ) {
            // 重新请求
            if (this.retryTimes < initRetryTimes) {
              this.retryTimes++
              this.timer = setTimeout(() => {
                if (this.retryTimes < initRetryTimes) this.request(config)
              }, 100 * this.retryTimes)
            } else {
              clearTimeout(this.timer)
              reject() // 3次后提示接口异常，手动刷新
            }
          } else if (statusCode === 404) {
            // 接口404
            reject()
          } else {
            // 错误提示
            Taro.showToast({
              icon: 'none',
              title: message,
              duration: 2000
            })
            reject()
          }
        },
        // 响应失败
        fail(err) {
          Taro.showToast({
            icon: 'none',
            title: err.errMsg,
            duration: 2000
          })
          reject(err)
        },
        // 请求完成
        complete() {
          // Taro.hideLoading()
        }
      })
    })
  }
}
