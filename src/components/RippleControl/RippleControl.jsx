import './RippleControl.less'
import React, {PropTypes} from "react"
import Base from "../Base"
import Control from "../Control"
import BeaconRipple from "./BeaconRipple"
import SelectRipple from "./SelectRipple"


export default class RippleControl extends Base {
  static propTypes = {
    centerRipple: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    disableBeaconRipple: PropTypes.bool,
    disableSelectRipple: PropTypes.bool,
    targetFactory: PropTypes.func.isRequired,
    contentFactory: PropTypes.func.isRequired,
  }


  render() {
    const beaconRipple = !this.props.disabled && !this.props.disableBeaconRipple &&
      <BeaconRipple type={this.props.type} />

    const selectRipple = !this.props.disabled && !this.props.disableSelectRipple &&
      <SelectRipple
        type={this.props.type}
        centerRipple={this.props.centerRipple}
      />

    const targetProps = Object.assign(
      this.baseProps({classes: false}),
      {disabled: this.props.disabled}
    )

    const target = this.props.targetFactory(
      targetProps,
      <div className={this.c("inner")}>
        {this.props.contentFactory(null, selectRipple)}
        {beaconRipple}
      </div>
    )

    return (
      <Control
        className={this.baseClasses()}
        actOnSelect={true}
        disabled={this.props.disabled}
      >
        {target}
      </Control>
    )
  }
}
