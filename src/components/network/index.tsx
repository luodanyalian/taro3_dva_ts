import React from 'react'
import { View } from '@tarojs/components'
import PropTypes, { InferProps } from 'prop-types' // 使用ProTypes进行类型检查
import { NetworkProps, NetworkState } from './type.interface' // TS接口类型配置

export default class Network extends React.Component<
  NetworkProps,
  NetworkState
> {
  static propTypes: InferProps<NetworkProps>
  static defaultProps: NetworkProps

  constructor(props: NetworkProps) {
    super(props)
    const { isOpened } = props

    this.state = {
      _isOpended: isOpened
    }
  }

  return() {
    const { _isOpended } = this.state

    return _isOpended ? <View className="">呀，断网了</View> : null
  }
}

Network.defaultProps = {
  isOpened: false,
  code: 0
}

Network.propTypes = {
  isOpened: PropTypes.bool,
  code: PropTypes.number,
  onCallback: PropTypes.func
}
