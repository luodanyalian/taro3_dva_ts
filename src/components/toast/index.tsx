import React from 'react'
import { View } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'
import PropTypes, { InferProps } from 'prop-types' // 使用ProTypes进行类型检查
import { ToastProps, ToastState } from './type.interface' // TS接口类型配置

import './index.scss'

export default class Toast extends React.Component<ToastProps, ToastState> {
  static propTypes: InferProps<ToastProps>
  static defaultProps: ToastProps

  constructor(props: ToastProps) {
    super(props)
    const { isOpened, duration } = props
    if (isOpened) {
      this.makeTimer(duration || 0)
    }
    this._timer = null
    this.state = {
      _isOpended: isOpened
    }
  }

  componentWillReceiveProps(nextProps: ToastProps): void {
    const { isOpened, duration } = nextProps
    if (!isOpened) {
      this.close()
      return
    }

    if (!this.state._isOpended) {
      this.setState({
        _isOpended: true
      })
    } else {
      this.clearTimmer()
    }
    this.makeTimer(duration || 0)
  }

  private _timer: NodeJS.Timeout | null

  /**
   * 定时开启
   */
  makeTimer(duration: number): void {
    if (duration === 0) {
      return
    } else {
      this._timer = setTimeout(() => {
        this.close()
      }, +duration)
    }
  }

  /**
   * 关闭Toast
   */
  close(e?: CommonEvent): void {
    const { _isOpended } = this.state
    if (_isOpended) {
      this.setState(
        {
          _isOpended: false
        },
        this.handleClose
      )
      // 清除定时器
      clearTimeout(this._timer)
    }
  }

  /**
   * Toast关闭后回调处理
   */
  handleClose(e?: CommonEvent): void {
    const { onClose } = this.props
    onClose && onClose(e!)
  }

  /**
   * 清除定时器
   */
  clearTimmer(): void {
    if (this._timer) {
      clearTimeout(this._timer)
      this._timer = null
    }
  }

  render() {
    const { _isOpended } = this.state
    const { text, position } = this.props

    return _isOpended
      ? <View className={`pt-toast ${position}`}>
          <View>
            {text}
          </View>
        </View>
      : null
  }
}

Toast.defaultProps = {
  isOpened: false,
  duration: 2000,
  position: 'bottom'
}

Toast.propTypes = {
  isOpened: PropTypes.bool,
  duration: PropTypes.number,
  position: PropTypes.string,
  onClose: PropTypes.func
}
