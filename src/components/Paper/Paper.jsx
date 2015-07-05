import './Paper.less'
import React, {PropTypes} from "react"
import Base from "../Base"


export default class Paper extends Base {
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
      <div {...this.baseProps({classes})}>
        <div className={this.c("inner")}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
