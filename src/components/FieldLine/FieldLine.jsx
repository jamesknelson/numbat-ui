import './FieldLine.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class FieldLine extends Component {
  static propTypes = {
    acting: PropTypes.bool.isRequired,
    selecting: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
  }

  render() {
    const classes = {
      full: this.props.active,
      half: this.props.selecting || this.props.acting,
      disabled: this.props.disabled,
    }

    return (
      <div {...this.base({classes})} />
    )
  }
}
