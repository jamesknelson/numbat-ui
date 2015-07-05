import './Tooltip.less'
import React, {PropTypes} from 'react'
import Base from '../Base'


export default class Tooltip extends Base {
  static propTypes = {
    label: PropTypes.string.isRequired,
    show: PropTypes.bool,
  }


  componentDidMount() {
    this._setRippleSize()
  }


  componentDidUpdate() {
    this._setRippleSize()
  }


  render() {
    return (
      <div {...this.baseProps()}>
        <div ref="inner" className={this.c('inner', {'is-shown': this.props.show})}>
          <div ref="ripple" className={this.c("ripple")} />
          <span className={this.c("label")}>{this.props.label}</span>
        </div>
      </div>
    )
  }


  _setRippleSize() {
    const ripple = this.refs.ripple
    const tooltipSize = this.refs.inner.offsetWidth
    
    // TODO: how to automatically detect this?
    const ripplePadding = 20
    const rippleSize = tooltipSize + ripplePadding + 'px'

    if (this.props.show) {
      ripple.style.height = rippleSize
      ripple.style.width = rippleSize
    }
    else {
      ripple.style.width = '0px'
      ripple.style.height = '0px'
    }
  }
}
