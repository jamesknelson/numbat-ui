import './AppCanvas.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class AppCanvas extends Component {
  render() {
    return <div {...this.base()}>{this.props.children}</div>
  }
}
