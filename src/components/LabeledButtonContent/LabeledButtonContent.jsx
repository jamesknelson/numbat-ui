import './LabeledButtonContent.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"
import SelectRipple from "../SelectRipple/SelectRipple"
import BeaconRipple from "../BeaconRipple/BeaconRipple"


@base()
export default class LabeledButtonContent extends Component {
  static propTypes = {
    control: PropTypes.object.isRequired,
    label: PropTypes.node.isRequired,
    rippleType: PropTypes.string,
    type: PropTypes.string,
  }


  render() {
    const buttonContent = typeof this.props.label == 'string'
      ? <span className={this.c("label")}>{this.props.label}</span>
      : this.props.label

    const classes = {
      [`${this.props.type}-inner`]: true,
      'inner': true,
      'disabled-inner': this.props.control.disabled,
    };

    return (
      <div {...this.base({classes})}>
        <SelectRipple type={this.props.rippleType} control={this.props.control} />
        <BeaconRipple type={this.props.rippleType} control={this.props.control} />
        {buttonContent}
      </div>
    )
  }
}
