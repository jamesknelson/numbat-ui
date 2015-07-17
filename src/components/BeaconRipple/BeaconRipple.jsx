import './BeaconRipple.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class BeaconRipple extends Component {
  static propTypes = {
    control: PropTypes.object,
    type: PropTypes.oneOf([
      "primary",
      "accent",
      "highlight-primary",
      "highlight-accent",
      "highlight",
    ]),
  }


  render() {
    const classes = {
      [`is-${this.props.type}`]: true,
      "is-shown": this.props.control.beacon,
    }

    return (
      <div {...this.base({classes})}>
        <div className={this.c("inner")} />
      </div>
    )
  }
}
