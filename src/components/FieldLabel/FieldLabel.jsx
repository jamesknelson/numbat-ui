import './FieldLabel.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class FieldLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
  }

  render() {
    const raised = this.props.active || !this.props.empty
    const classes = {
      raised: raised,
      lowered: !raised,
      active: this.props.active,
      disabled: this.props.disabled,
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
