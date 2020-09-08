import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { CommonEvent } from '@tarojs/components/types/common'
import { View, Button, Image } from '@tarojs/components'
import { ServiceBtnProps, ServiceBtnState } from './index.interface'
import { doJump } from '@/utils/common'
import './index.scss'

import btn_online from '@/assets/images/btn/btn_32_service_online@3x.png'
import btn_complaint from '@/assets/images/btn/btn_32_service_complaint@3x.png'

class ServiceBtn extends Component<ServiceBtnProps, ServiceBtnState> {
  constructor(props: ServiceBtnProps) {
    super(props)
    this.state = {}
  }
  static options = {
    addGlobalClass: true
  }
  static defaultProps: ServiceBtnProps = {}
  toFeedback = () => {
    doJump('/pages/feedback/index')
  }
  render() {
    return (
      <View className="fx-serviceBtn-wrap">
        <Button className="contact-button" openType="contact">
          <Image className="btn" src={btn_online} />
        </Button>
        <Image className="btn" src={btn_complaint} onClick={this.toFeedback} />
      </View>
    )
  }
}

export default ServiceBtn
