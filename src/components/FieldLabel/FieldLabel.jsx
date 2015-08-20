import './FieldLabel.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class FieldLabel extends Component {
  static propTypes = {
    control: PropTypes.object.isRequired,
    label: PropTypes.string.isRequired,
    empty: PropTypes.bool.isRequired,
  }

  render() {
    const control = this.props.control
    const classes = {
      raised: control.active || !this.props.empty,
      lowered: !control.active && this.props.empty,
      active: control.active,
      disabled: control.disabled,
    }

    return (
      <label {...this.base({classes})}>
        <div className={this.c('spacer')}>
          <div className={this.c('label')}>{this.props.label}</div>
        </div>
        {this.props.children}
      </label>
    )
  }
}
