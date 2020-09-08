import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

// 定义TypeScript接口
export interface ToastProps {
  /**
   * 点击tab之后的回调事件
   * 无入参，出参是tabIndex
   */
  onSwitchTab: CommonEventFunction
  /**
   * 当前tab索引
   * @default -1
   */
  tabIndex: number
  /**
   * tab数组内容
   * @default []
   */
  tabArray: Array<any>
  /**
   * 是否滚动
   * @default false
   */
  scroll: boolean
}

export interface ToastState {}

declare const Toast: ComponentClass<ToastProps>

export default Toast
