import React from 'react'
import Taro from '@tarojs/taro'
import { View, Button } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import PropTypes, { InferProps } from 'prop-types' // 使用ProTypes进行类型检查
import { IProps, IState } from './type.interface' // TS接口类型配置

import './index.scss'

export default class Passport extends React.Component<IProps, IState> {
  static propTypes: InferProps<IProps>
  static defaultProps: IProps

  constructor(props: IProps) {
    super(props)
    this.state = {
      apiUrl:
        process.env.NODE_ENV === 'development'
          ? 'http://api-uas.test.ptevent.cn'
          : 'https://api-uas.putao.com'
    }
  }

  // 手机号授权登录
  doAuth(e: CommonEvent) {
    const { detail } = e
    const { type, tokenName } = this.props
    // 本地存储中获取用户token
    const token = Taro.getStorageSync(tokenName).token

    // 授权成功
    if (detail.encryptedData) {
      const params = {
        bind_token: token,
        encrypted_data: detail.encryptedData,
        iv: detail.iv
      }
      // 手机号绑定登录
      type === 'phone' && this.bindPhone(params)
      // 用户信息绑定
      type === 'userinfo' && this.bindUserInfo(params)
    }
  }

  // 小程序手机号绑定登录
  bindPhone(params: any) {
    const { appkey, onCallback } = this.props
    const { apiUrl } = this.state

    Taro.request({
      url: `${apiUrl}/login/wechat-miniapp/mobile`,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: params.token,
        appkey
      },
      data: params,
      success(res: any) {
        const { code, data } = res.data
        if (code === 0) {
          // 通行证授权成功后，执行回调
          onCallback && onCallback(data)
        }
      }
    })
  }

  // 用户信息授权并绑定
  bindUserInfo(params: any) {}

  render() {
    const { type } = this.props

    return (
      <View className="auth-button">
        {type === 'phone'
          ? <Button
              openType="getPhoneNumber"
              onGetPhoneNumber={this.doAuth.bind(this)}
            >
              {this.props.children}
            </Button>
          : <Button
              openType="getUserInfo"
              onGetUserInfo={this.doAuth.bind(this)}
            >
              {this.props.children}
            </Button>}
      </View>
    )
  }
}

Passport.defaultProps = {
  type: 'phone',
  appkey: '',
  tokenName: 'PT_USER_AUTH_INFO'
}

Passport.propTypes = {
  type: PropTypes.string,
  appkey: PropTypes.string,
  tokenName: PropTypes.string,
  onCallback: PropTypes.func
}
