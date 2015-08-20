import './Input.less'
import React, {Component, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import Hint from "../Hint/Hint"


@baseControl({passthrough: {force: ['value']}})
export default class Input extends Component {
  static propTypes = {
    hint: PropTypes.string,
    value: PropTypes.string.isRequired,
  }

  render() {
    const inputProps = Object.assign(
      this.passthrough(),
      {className: this.c("input")},
      this.callbacks
    )

    const hint = this.props.hint &&
      <Hint className={this.c('hint')} visible={!!this.props.value.empty} />

    const classes = {
      disabled: this.control.disabled,
    }

    return (
      <div className={this.cRoot(classes)}>
        <input {...inputProps} />
        {hint}
      </div>
    )
  }
}
