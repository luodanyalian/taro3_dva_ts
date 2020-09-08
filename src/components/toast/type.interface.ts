import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

// 定义TypeScript接口
export interface ToastProps {
  /**
   * 是否展示元素
   * @default false
   */
  isOpened: boolean,
  /**
   * 元素的内容
   */
  text?: string,
  /**
   * 元素持续的事件（设置为 0 将不会自动消失）
   * @default 2000
   */
  duration?: number,
  /**
   * 元素显示的位置（可选值为 top/center/bottom）
   * @default bottom
   */
  position?: string,
  /**
   * Toast关闭后回调事件
   */
  onClose?: CommonEventFunction
}

export interface ToastState {
  _isOpended: boolean
}

declare const Toast: ComponentClass<ToastProps>

export default Toast