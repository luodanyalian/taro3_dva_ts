import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import { Passport, Toast } from '@/components/index'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import Container from '@/components/container'
import Loading from '@/components/loading'
import { FeedbackProps, FeedbackState } from './index.interface'
import './index.scss'
// import {  } from '../../components'

// @connect(({toast, feedback }) => ({
//     ...toast,
//     ...feedback,
// }))

class Feedback extends Component<FeedbackProps, FeedbackState> {
  constructor(props: FeedbackProps) {
    super(props)
    this.state = { isLoaded: true }
  }

  componentDidMount() {
    // this.props.dispatch({
    //   type: 'toast/setToast',
    //   payload: {
    //     isOpened: true,
    //     text: '数据加载成功'
    //   }
    // })
  }

  render() {
    // const { toast } = this.props
    const { isLoaded } = this.state
    return (
      <View className="fx-feedback-wrap">
        {/* <Toast isOpened={toast.isOpened} text={toast.text} position="bottom" /> */}
        <Container showHeader title={'页面标题'} isFixed>
          {isLoaded ? <View>页面内容</View> : <Loading show={true} />}
        </Container>
      </View>
    )
  }
}
export default Feedback
