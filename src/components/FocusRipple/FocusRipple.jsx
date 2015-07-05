import './FocusRipple.less'
import React, {PropTypes} from "react"
import Base from "../Base"


export default class FocusRipple extends Base {
  static propTypes = {
    show: PropTypes.bool,
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
      "is-shown": this.props.show,
    }

    return (
      <div {...this.baseProps({classes})}>
        <div className={this.c("inner")} />
      </div>
    )
  }
}
