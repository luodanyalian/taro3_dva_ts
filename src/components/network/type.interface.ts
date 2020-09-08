import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

// 定义TypeScript接口
export interface NetworkProps {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean
  /**
   * 错误码
   */
  code: number
  /**
   * 接口回调
   */
  onCallback?: CommonEventFunction
}

export interface NetworkState {
  _isOpended: boolean
}

declare const Network: ComponentClass<NetworkProps>

export default Network
