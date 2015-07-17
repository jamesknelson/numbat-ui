import './IconButton.less'
import React, {Component, PropTypes, DOM} from 'react'
import {baseControl} from '../../util/decorators'
import Icon from '../Icon/Icon'
import Tooltip from '../Tooltip/Tooltip'
import SelectRipple from '../SelectRipple/SelectRipple'
import BeaconRipple from '../BeaconRipple/BeaconRipple'


const RippleControlTypeMap = {
  'light': "highlight",
  'light-primary': "highlight-primary",
  'light-accent': "highlight-accent",
  'dark': "highlight",
  'dark-primary': "highlight-primary",
  'dark-accent': "highlight-accent",
}


@baseControl()
export default class IconButton extends Component {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    targetFactory: PropTypes.func,
    tooltip: PropTypes.string,
    type: PropTypes.oneOf([
      'light', 'light-primary', 'light-accent',
      'dark', 'dark-primary', 'dark-accent',
    ]),
  }

  static defaultProps = {
    targetFactory: DOM.button,
    type: "light",
  }


  render() {
    const rippleType = RippleControlTypeMap[this.props.type]

    const tooltip = this.props.tooltip &&
      <Tooltip
        ref="tooltip"
        className={this.c("tooltip")}
        label={this.props.tooltip}
        show={this.control.hover}
      />

    const classes = {
      [`${this.props.type}-inner`]: true,
      'inner': true,
      'disabled-inner': this.control.disabled,
    }

    return (
      <div className={this.cRoot()}>
        {
          this.props.targetFactory(
            Object.assign(this.passthrough(), {className: this.c("container")}, this.callbacks),
            <div className={this.c(classes)}>
              <SelectRipple type={rippleType} control={this.control} centerRipple={true} />
              <BeaconRipple type={rippleType} control={this.control} />
              <Icon type={this.props.iconType} />
            </div>,
            tooltip
          )
        }
      </div>
    )
  }
}
