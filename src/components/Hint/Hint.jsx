import './Hint.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class Hint extends Component {
  static propTypes = {
    hint: PropTypes.string.isRequired,
    visible: PropTypes.bool,
  }

  render() {
    const classes = {
      visible: this.props.visible,
    }

    return (
      <div {...this.base({classes})}>
        {this.props.hint}
      </div>
    )
  }
}
