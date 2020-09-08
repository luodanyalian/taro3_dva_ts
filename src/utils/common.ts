import Taro from '@tarojs/taro'

/** 
 * 共用函数
*/

// 全局的公共变量
export let globalData: any = {}

// 时间格式装换函数
export const repeat = (str = '0', times) => new Array(times + 1).join(str)
// 时间前面 +0
export const pad = (num, maxLength = 2) =>
  repeat('0', maxLength - num.toString().length) + num

export const formatTime = time => {
  ;`${pad(time.getHours())}:${pad(time.getMinutes())}:${pad(
    time.getSeconds()
  )}.${pad(time.getMilliseconds(), 3)}`
}
/**
   * 轻提示
   * @param {*} msg 提示内容 
   */
export const showToast = (title: string) => {
  Taro.showToast({
    title,
    icon: 'none',
    duration: 2000
  })
}

/**
   * 页面跳转
   * @param {*} url 目标页面
   * @param {key: value} query 参数
   * @param method 小程序打开页面方式，navigateTo/switchTab/reLaunch/redirectTo
   */
export const doJump = (pathname: string, query?: object, method?: string) => {
  let params2String = ''

  query &&
    Object.keys(query).map(key => {
      params2String += `${key}=${query && query[key]}&`
      return params2String
    })

  params2String = params2String.substring(0, params2String.length - 1)

  const url =
    method === 'switchTab' || !query ? pathname : `${pathname}?${params2String}`
  const methods = method || 'navigateTo'

  Taro[methods]({ url })
}
// iphone x兼容处理
export const isIpx = () => {
  let flag = false
  let model = Taro.getSystemInfoSync().model
  console.log('机型', model)
  var data = model.substring(0, model.lastIndexOf('X')) + 'X'
  if (data == 'iPhone X') {
    flag = true
  }
  return flag
}
