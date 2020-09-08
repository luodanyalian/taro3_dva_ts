import React, { Component } from 'react'
import { View, Button } from '@tarojs/components'
import { connect } from 'react-redux'
import { Passport, Toast } from '@/components/index'
import httpConfig from '@/config/httpConfig'
// import Api from '../../utils/request'
// import Tips from '../../utils/tips'
import { IndexProps, IndexState } from './index.interface'
import './index.scss'
// import {  } from '../../components'

@connect(({ toast, index }) => ({
  ...toast,
  ...index
}))
class Index extends Component<IndexProps, IndexState> {
  constructor(props: IndexProps) {
    super(props)
    this.state = {}
  }

  async getList() {
    await this.props.dispatch({
      type: 'index/getList',
      payload: {}
    })
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'toast/setToast',
      payload: {
        isOpened: true,
        text: '数据加载成功'
      }
    })
    this.getList()
  }
  /**
   * 通行证事件回调
   * @param data 通行证返回数据
   * @param e 
   */
  passportCallback(data: any, e: any) {
    console.log(data, e)
  }
  showToast() {
    const conf = {
      isOpened: true,
      text: '数据加载成功'
    }
    this.props.dispatch({
      type: 'toast/setToast',
      payload: conf
    })
  }
  render() {
    const { data, toast } = this.props
    return (
      <View className="fx-index-wrap">
        <Toast isOpened={toast.isOpened} text={toast.text} position="bottom" />
        <Button onClick={this.showToast.bind(this)}>Toast</Button>
        <Passport
          type="phone"
          appkey={httpConfig.global.appkey}
          onCallback={this.passportCallback.bind(this)}
        >
          授权登录
        </Passport>
        {/* <View className="index-topbar">New资讯</View>
        <View className="index-data">
          {data &&
            data.map((item, index) => {
              return (
                <View className="index-list" key={index}>
                  <View className="index-title">
                    {item.title}
                  </View>
                  <View
                    className="index-img"
                    style={`background-image: url(${item.thumbnail_pic_s})`}
                  />
                </View>
              )
            })}
        </View> */}
      </View>
    )
  }
}
export default Index
