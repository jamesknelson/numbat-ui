import './Icon.less'
import React, {Component, PropTypes} from 'react'
import {base} from "../../util/decorators"


@base()
export default class Icon extends Component {
  static propTypes = {
    type: PropTypes.string,
  }


  render() {
    return (this.props.type.length === 1
      ? <span {...this.base({classes: "letter"})}>
          {this.props.type}
        </span>
      : <span {...this.base({classes: this.props.type})} />
    )
  }
}
