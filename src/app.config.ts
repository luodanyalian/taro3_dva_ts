export default {
  pages: ['pages/index/index', 'pages/feedback/index', 'pages/test/index'],
  window: {
    backgroundTextStyle: 'dark',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '布鲁可积木',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  // 网络请求超时设置
  networkTimeout: {
    request: 60000
  }
}
