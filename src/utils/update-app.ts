import Taro from '@tarojs/taro'

const updateManager = () => {
  // 当前微信版本是否支持更新机制
  if(Taro.canIUse('getUpdateManager')) {
    const UpdateManager = Taro.getUpdateManager()

    // 监听向微信后台请求检查更新结果事件。微信在小程序冷启动时自动检查更新，不需由开发者主动触发。
    UpdateManager.onCheckForUpdate(r => {
      if(!r.hasUpdate) {}
    })

    // 监听小程序有版本更新事件。客户端主动触发下载（无需开发者触发），下载成功后回调
    UpdateManager.onUpdateReady(() => {
      Taro.showModal({
        title: "更新提示",
        content: "新版本已经准备好，是否马上重启小程序？",
        success(r) {
          // 强制小程序重启并使用新版本。
          if(r.confirm) {
            Taro.clearStorageSync()
            UpdateManager.applyUpdate()
          }
        }
      })
    })
  }
  else {
    Taro.showModal({
      title: '很抱歉',
      content: '当前微信版本过低，无法使用，请升级到最新微信版本后重试。'
    })
  }
}

export default updateManager