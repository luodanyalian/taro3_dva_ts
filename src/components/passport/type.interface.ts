import { ComponentClass } from 'react'
import { CommonEventFunction } from '@tarojs/components/types/common'

// 定义TypeScript接口
export interface IProps {
  /**
   * 授权方式（phone手机号授权、userinfo用户信息授权）
   * @default phone
   */
  type: string
  /**
   * 小程序appKey
   */
  appkey: string
  /**
   * 获取本地存储中Token的值（设置为 0 将不会自动消失）
   * @default PT_USER_AUTH_INFO
   */
  tokenName: string
  /**
   * 授权成功后回调事件
   */
  onCallback?: CommonEventFunction
}

export interface IState {
  apiUrl: string
}

declare const Passport: ComponentClass<IProps>

export default Passport
