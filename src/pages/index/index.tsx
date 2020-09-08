import Taro from '@tarojs/taro'
import React, { Component } from 'react'
import { View } from '@tarojs/components'
// import { connect } from '@tarojs/redux'
// import { Passport, Toast } from '@/components/index'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import Container from '@/components/container'
import Loading from '@/components/loading'
import Empty from '@/components/empty'
import ServiceBtn from '@/components/serviceBtn'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {  } from '../../components'

// @connect(({toast, index }) => ({
//     ...toast,
//     ...index,
// }))

class Index extends Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props)
    this.state = {
      isLoaded: true
    }
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
      <View className="fx-index-wrap">
        {/* <Toast isOpened={toast.isOpened} text={toast.text} position="bottom" /> */}
        <Container showHeader title={'首页'} isFixed classBackImg="white">
          {isLoaded
            ? <View>
                <Empty text="没有进行中的活动" desc="关注布鲁可积木公众号，第一时间获取活动信息" />
                <ServiceBtn />
              </View>
            : <Loading show={true} />}
        </Container>
      </View>
    )
  }
}
export default Index
