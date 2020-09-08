import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

// 定义TypeScript接口
export interface ContainerProps {
  /**
   * 是否显示导航栏
   * @default false
   */
  showHeader?: boolean
  /**
   * 导航栏样式
   */
  className?: string
  /**
   * 导航栏标题
   */
  title?: string
  /**
   * 是否显示返回按钮
   */
  showBackBtn?: boolean
  /**
   * 是否悬浮顶部
   */
  isFixed?: boolean
  /**
   * 是否透明
   */
  isTransparent?: boolean
  /**
   * 背景图class类名：white(白色自定义背景图) red(红色自定义背景图)
   * 后期可自己添加class类名
   */
  classBackImg?: string
  /**
   * 返回按钮事件
   */
  onCallback?: CommonEventFunction
}

export interface ContainerState {
  _showHeader: boolean
  _headerStyle: string
  _containerHeight: string
  screenHeight: number
  headerHeight: number
}

declare const Container: ComponentClass<ContainerProps>

export default Container
