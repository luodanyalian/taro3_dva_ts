// @ts-nocheck

import React, { Component } from 'react'
import Taro from '@tarojs/taro'
import { Provider } from 'react-redux'
import dva from './utils/dva'
import models from './models'
import { globalData } from './utils/common'
import updateManager from './utils/update-app'
import config from './config/httpConfig'
import auth from './utils/auth'

import './app.scss'

const dvaApp = dva.createApp({
  initialState: {},
  models,
  onError(e, dispatch) {
    dispatch({ type: 'sys/error', payload: e })
  }
})
let store = dvaApp.getStore()

class App extends Component {
  componentWillMount() {
    updateManager()
  }
  /**
   *
   *  1.小程序打开的参数 globalData.extraData.xx
   *  2.从二维码进入的参数 globalData.extraData.xx
   *  3.获取小程序的设备信息 globalData.systemInfo
   */
  async componentDidMount() {
    // 获取参数
    // const referrerInfo = this.$router.params.referrerInfo
    // const query = this.$router.params.query
    // !globalData.extraData && (globalData.extraData = {})
    // if (referrerInfo && referrerInfo.extraData) {
    //   globalData.extraData = referrerInfo.extraData
    // }
    // if (query) {
    //   globalData.extraData = {
    //     ...globalData.extraData,
    //     ...query
    //   }
    // }
    // 获取设备信息
    const sys = await Taro.getSystemInfo()
    sys && (globalData.systemInfo = sys)
    console.log('信息', sys)
    Taro.setStorageSync('screenWidth', sys.screenWidth)
    Taro.setStorageSync('screenHeight', sys.screenHeight)
    Taro.setStorageSync(
      'containerHeight',
      sys.screenHeight - sys.statusBarHeight - 44
    )
    Taro.setStorageSync('headerHeight', sys.statusBarHeight)
    Taro.setStorageSync('allHeaderHeight', sys.statusBarHeight + 44)

    // await auth.getApiToken(config.global.appId)
  }
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App
