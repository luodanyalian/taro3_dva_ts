import Toast from '../../components/toast/type.interface'
/**
 * index.state 参数类型
 * @interface IndexState
 */
export interface IndexState {}

/**
 * index.props 参数类型
 *
 * @export
 * @interface IndexProps
 */
export interface IndexProps {
  dispatch?: any
  data?: Array<DataInterface>
  toast: {
    isOpened: boolean
    text: string
  }
}

export interface DataInterface {
  des: string
  lunar: string
  thumbnail_pic_s: string
  title: string
  _id: string
}
