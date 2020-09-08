import React from 'react'
import classNames from 'classnames'
import PropTypes, { InferProps } from 'prop-types'
import { ToastProps, ToastState } from './type.interface' // TS接口类型配置
import { ScrollView, View, Image } from '@tarojs/components'
import { CommonEvent } from '@tarojs/components/types/common'

export default class SwitchTab extends React.Component<ToastProps, ToastState> {
  public static defaultProps: ToastProps
  public static propTypes: InferProps<ToastProps>

  public constructor(props: ToastProps) {
    super(props)
    this.state = {}
  }
  private handleClick(index: any, event: CommonEvent): void {
    const { onSwitchTab } = this.props
    onSwitchTab && onSwitchTab(index)
  }
  public componentDidMount(): void {}
  public render(): JSX.Element {
    const { tabArray, tabIndex, scroll } = this.props
    return scroll
      ? <ScrollView
          scrollX
          scrollWithAnimation
          scroll-into-view={`item${tabIndex < 4 ? 0 : tabIndex - 3}`}
          className="switch-tab-scroll"
        >
          {tabArray.map((item, index) =>
            <View
              key={index}
              id={`item${index}`}
              className={`tab tab-${index} ${tabIndex == index
                ? 'active'
                : ''}`}
              onClick={this.handleClick.bind(this, index)}
            >
              <View className="title">
                {item.iconUrl
                  ? <Image className="icon" src={item.iconUrl} />
                  : ''}
                {item.title}
              </View>
              <View className="bottom_border" />
            </View>
          )}
        </ScrollView>
      : <View className="navbar">
          <View className="switch-tab">
            {tabArray.map((item, index) =>
              <View
                key={index}
                className={`tab tab-${index} ${tabIndex == index
                  ? 'active'
                  : ''}`}
                onClick={this.handleClick.bind(this, index)}
              >
                <View>
                  {item}
                </View>
                <View className="bottom_border" />
              </View>
            )}
          </View>
        </View>
  }
}

SwitchTab.defaultProps = {
  tabIndex: 0,
  tabArray: [],
  scroll: false,
  onSwitchTab: () => {}
}

SwitchTab.propTypes = {
  tabIndex: PropTypes.number,
  tabArray: PropTypes.array,
  scroll: PropTypes.bool,
  onSwitchTab: PropTypes.func
}
