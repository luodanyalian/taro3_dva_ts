import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { EmptyProps, EmptyState } from './index.interface'
import './index.scss'

import icon_empty from '@/assets/images/img/img_108_red_packet_nor@3x.png'

class Empty extends Component<EmptyProps, EmptyState> {
  static defaultProps: EmptyProps
  constructor(props: EmptyProps) {
    super(props)
    this.state = {}
  }
  render() {
    const { iconUrl, text, desc } = this.props
    return (
      <View className="fx-empty-wrap">
        {iconUrl
          ? <Image className="img" src={iconUrl} />
          : <Image className="img" src={icon_empty} />}

        <View className="title">
          {text}
        </View>
        {desc
          ? <View className="p">
              {desc}
            </View>
          : ''}
      </View>
    )
  }
}
Empty.defaultProps = {
  iconUrl: '',
  text: '', //这里是提示文案最好控制在2行之内
  desc: ''
}
export default Empty
