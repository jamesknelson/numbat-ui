import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class Toolbar extends Component {
  render() {
    return <div {...this.base()}>{this.props.children}</div>
  }
}
