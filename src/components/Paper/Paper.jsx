import './Paper.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"


@base()
export default class Paper extends Component {
  static propTypes = {
    shape: PropTypes.oneOf(["rounded", "square", "circle"]),
    zDepth: PropTypes.oneOf([0,1,2,3,4,5]),
  }

  static defaultProps = {
    shape: "rounded",
    zDepth: 1,
  }


  render() {
    const classes = {
      [`z-depth-${this.props.zDepth}`]: true,
      [this.props.shape]: true,
    }

    return (
      <div {...this.base({classes})}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
