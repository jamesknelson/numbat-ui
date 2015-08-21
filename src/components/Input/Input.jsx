import './Input.less'
import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import {base} from "../../util/decorators"


@base({passthrough: {force: ['value', 'disabled']}})
export default class Input extends Component {
  static propTypes = {
    hint: PropTypes.string,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }

  focus() {
    ReactDOM.findDOMNode(this.refs.input).focus()
  }

  render() {
    const hint = this.props.hint &&
      <div className={this.c('hint', {visible: this.props.value.empty})}>
        {this.props.hint}
      </div>

    return (
      <div className={this.cRoot({disabled: this.props.disabled})}>
        {hint}
        <input
          {...this.passthrough()}
          className={this.c("input")}
          ref="input"
        />
      </div>
    )
  }
}
