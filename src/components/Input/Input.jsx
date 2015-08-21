import './Input.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base({passthrough: {force: ['value', 'disabled']}})
export default class Input extends Component {
  static propTypes = {
    hint: PropTypes.string,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }

  render() {
    const inputProps = Object.assign(
      this.passthrough(),
      {className: this.c("input")}
    )

    const hint = this.props.hint &&
      <div className={this.c('hint', {visible: this.props.value.empty})}>
        {this.props.hint}
      </div>

    const classes = {
      disabled: this.props.disabled,
    }

    return (
      <div className={this.cRoot(classes)}>
        {hint}
        <input {...inputProps} />
      </div>
    )
  }
}
