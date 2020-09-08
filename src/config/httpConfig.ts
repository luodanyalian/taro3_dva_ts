/** 环境配置 */
const global = {
  appId: '',
  appkey: '',
  appSecret: '',
  shareImg: '',
  userSignature: '',
  busSignature: '',
  signature: {
    user: '',
    bus: '',
    upload: '',
    other: ''
  }
}

/** 接口地址配置 */
const server = {
  base: 'http://test.fe.ptevent.cn/mini_paiblocks',
  uas: 'http://api-uas.test.ptevent.cn'
}

/** 请求错误码 */
const errorCodeMaps = {
  400: '请求参数有误',
  401: '当前请求需要用户验证',
  403: '请求拒绝执行',
  404: '接口不存在',
  405: '请求方法不匹配',
  406: '未满足请求头中的条件',
  408: '请求超时',
  413: '服务器拒绝处理当前请求',
  500: '服务端异常',
  501: '服务器无法识别请求',
  502: 'Bad Gateway'
}

export default {
  global,
  server,
  errorCodeMaps
}
