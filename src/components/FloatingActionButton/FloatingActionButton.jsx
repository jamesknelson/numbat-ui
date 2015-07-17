import './FloatingActionButton.less'
import React, {Component, DOM, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import Icon from '../Icon/Icon'
import Paper from '../Paper/Paper'
import SelectRipple from "../SelectRipple/SelectRipple"
import BeaconRipple from "../BeaconRipple/BeaconRipple"


const RippleTypeMap = {
  default: "highlight",
  accent: "accent",
  primary: "primary",
}


@baseControl()
export default class FloatingActionButton extends Component {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
    size: PropTypes.oneOf(['default', 'mini']),
    targetFactory: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'accent']),
  }

  static defaultProps = {
    type: "accent",
    size: "default",
    targetFactory: DOM.a,
  }


  controlPrimaryAction() {
    this.props.onPress()
  }


  render() {
    let zIndex = 1
    if (this.control.disabled) zIndex = 0
    else if (this.control.acting) zIndex = 2

    const rippleType = RippleTypeMap[this.props.type]

    const classes = {
      [`${this.props.type}-inner`]: true,
      'inner': true,
      'mini-inner': this.props.size == 'mini',
      'disabled-inner': this.control.disabled,
    }

    return (
      <div className={this.cRoot()}>
        {
          this.props.targetFactory(
            Object.assign(this.passthrough(), {className: this.c("container")}, this.callbacks),
            <Paper zDepth={zIndex} shape="circle">
              <div className={this.c(classes)}>
                <SelectRipple type={rippleType} control={this.control} />
                <BeaconRipple type={rippleType} control={this.control} />
                <Icon type={this.props.iconType} />
              </div>
            </Paper>
          )
        }
      </div>
    )
  }
}
