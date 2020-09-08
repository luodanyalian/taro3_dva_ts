import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image, Text } from '@tarojs/components'
import { LoadingProps, LoadingState } from './index.interface'
import './index.scss'

import icon_loading from '@/assets/images/img/ani_loading.gif'

class PTLoading extends Component<LoadingProps, LoadingState> {
  static defaultProps: LoadingProps
  constructor(props: LoadingProps) {
    super(props)
    const { show } = props
    this.state = {
      _show: show,
      containerHeight: 0
    }
  }
  static options = {
    addGlobalClass: true
  }
  componentDidMount() {
    this.setState({
      containerHeight: Taro.getStorageSync('containerHeight')
    })
  }
  render() {
    const { _show, containerHeight } = this.state
    return _show
      ? <View
          className="fx-ptloading-wrap"
          style={{ minHeight: containerHeight }}
        >
          <View className="content">
            <Image className="icon_loading" src={icon_loading} />
            <Text className="label">正在加载，请稍后</Text>
          </View>
        </View>
      : null
  }
}
PTLoading.defaultProps = {
  show: false
}
export default PTLoading
