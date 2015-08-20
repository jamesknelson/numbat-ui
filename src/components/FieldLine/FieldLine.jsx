import './FieldLine.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class FieldLine extends Component {
  static propTypes = {
    control: PropTypes.object.isRequired,
  }

  render() {
    const control = this.props.control
    const classes = {
      full: control.active,
      half: control.selecting || control.acting,
      disabled: control.disabled,
    }

    return (
      <div {...this.base({classes})} />
    )
  }
}
