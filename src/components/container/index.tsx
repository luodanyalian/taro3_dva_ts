import React from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import PropTypes, { InferProps } from 'prop-types' // 使用ProTypes进行类型检查
import { ContainerProps, ContainerState } from './index.interface' // TS接口类型配置
import { doJump } from '@/utils/common'

import './index.scss'

export default class PtContainer extends React.Component<
  ContainerProps,
  ContainerState
> {
  static propTypes: InferProps<ContainerProps>
  static defaultProps: ContainerProps

  constructor(props: ContainerProps) {
    super(props)
    const { showHeader, className } = props
    this.state = {
      _showHeader: showHeader || false,
      _headerStyle: `header ${className}`,
      _containerHeight: '',
      screenHeight: 0,
      headerHeight: 0
    }
  }

  async componentWillMount() {
    const that = this
    const { _showHeader } = that.state
    // 获取当前可视宽高（高度不包括底部标签栏的高）
    const sys = await Taro.getSystemInfo()
    if (sys) {
      const { screenHeight, statusBarHeight } = sys
      console.log('设备信息', sys)
      const headerHeight = statusBarHeight
      const containerHeight = _showHeader
        ? screenHeight - statusBarHeight - 44
        : screenHeight - statusBarHeight
      const _containerHeight = `height: ${containerHeight}px;`
      that.setState({
        _containerHeight,
        screenHeight,
        headerHeight
      })
    }
  }

  /**
   * 返回按钮事件
   * @param e
   */
  doBack(e?: CommonEvent) {
    const { onCallback } = this.props
    // 点击返回按钮之后的方法
    if (onCallback) {
      e.stopPropagation()
      onCallback(e!)
    } else {
      let pageRouterLength = Taro.getCurrentPages().length
      if (pageRouterLength > 1) {
        Taro.navigateBack({
          delta: 1
        })
      } else {
        console.log('没有上一页')
        doJump('/pages/index/main', {}, 'reLaunch')
      }
    }
  }

  /**
   * 
   * @param e 容器滚动事件
   */
  onScroll(e?: CommonEvent) {
    e.stopPropagation()
    const { scrollTop } = e.detail
    const { isTransparent } = this.props

    if (scrollTop >= 44) {
      if (isTransparent) {
      }
    }
  }

  render() {
    const {
      _showHeader,
      _headerStyle,
      _containerHeight,
      screenHeight,
      headerHeight
    } = this.state
    const { title, showBackBtn, classBackImg } = this.props
    const appHeight = `height: ${screenHeight}px;` // 容器可用高度
    const headerHeightstr = `height:44px;padding-top: ${headerHeight}px;` // 导航栏高度=标题栏+状态栏
    const backBtnHeight = 'width: 44px;height: 44px;' // 返回按钮高度

    return (
      <View className="app" style={appHeight}>
        {_showHeader
          ? <View className={_headerStyle} style={headerHeightstr}>
              {showBackBtn
                ? <View
                    className="button"
                    onClick={this.doBack.bind(this)}
                    style={backBtnHeight}
                  >
                    返回
                  </View>
                : null}
              <View className="title">
                {title}
              </View>
            </View>
          : null}

        <ScrollView
          scrollY
          className={
            classBackImg ? `container bkg-${classBackImg}` : `container`
          }
          onScroll={this.onScroll.bind(this)}
          style={_containerHeight}
        >
          {this.props.children}
        </ScrollView>
      </View>
    )
  }
}

PtContainer.defaultProps = {
  showHeader: false,
  title: '',
  showBackBtn: false,
  isFixed: false,
  isTransparent: false,
  className: '',
  classBackImg: ''
}

PtContainer.propTypes = {
  showHeader: PropTypes.bool,
  title: PropTypes.string,
  showBackBtn: PropTypes.bool,
  isFixed: PropTypes.bool,
  isTransparent: PropTypes.bool,
  className: PropTypes.string,
  onCallback: PropTypes.func
}
