import './FlatButton.less'
import React, {PropTypes, DOM} from "react"
import labeledButtonContentFactory from "../../util/labeledButtonContentFactory"
import Base from "../Base"
import RippleControl from "../RippleControl/RippleControl"


const RippleControlTypeMap = {
  default: "highlight",
  accent: "highlight-accent",
  primary: "highlight-primary",
}


export default class FlatButton extends Base {
  static propTypes = {
    type: PropTypes.oneOf(['primary', 'accent', 'default']),
    targetFactory: PropTypes.func,
  }

  static defaultProps = {
    type: "default",
    targetFactory: DOM.button,
  }


  render() {
    // The target factory produces content which should be outside of the
    // displayed bounds, including padding, targets, etc.
    // Note that all relevant style is removed from the passed in target.
    const targetFactory = (options, children) => this.props.targetFactory(
      Object.assign(options, {className: this.c('container')}),
      children
    )

    return (
      <RippleControl {...this.baseProps()}
        type={RippleControlTypeMap[this.props.type]}
        targetFactory={targetFactory}
        contentFactory={labeledButtonContentFactory.bind(this)}
      />
    )
  }
}
