import './RaisedButton.less'
import React, {PropTypes, DOM} from "react"
import {bound} from "../../util/decorators"
import labeledButtonContentFactory from "../../util/labeledButtonContentFactory"
import Base from "../Base"
import Target from "../Target"
import Paper from "../Paper/Paper"
import RippleControl from "../RippleControl/RippleControl"


const RippleControlTypeMap = {
  default: "highlight",
  accent: "accent",
  primary: "primary",
}


export default class RaisedButton extends Base {
  static propTypes = {
    targetFactory: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'accent', 'default']),
    shape: PropTypes.string,
    label: PropTypes.string,
  }

  static defaultProps = {
    type: "default",
    targetFactory: DOM.a,
  }


  constructor(props) {
    super(props)
    this.state = {touched: false}
  }


  @bound
  setTouched() {
    this.setState({touched: true})
  }


  @bound
  unsetTouched() {
    this.setState({touched: false})
  }
   

  render() {
    // The target factory produces content which should be outside of the
    // displayed bounds, including padding, targets, etc. 
    const targetFactory = (options, children) => {
      let zIndex = 1
      if (this.props.disabled) zIndex = 0
      else if (this.state.touched) zIndex = 2

      const inner = this.props.targetFactory(
        Object.assign(options, {className: this.c('container')}),
        <Paper zDepth={zIndex}>{children}</Paper>
      )

      return (
        <Target on={this.setTouched} off={this.unsetTouched}>{inner}</Target>
      )
    }

    return (
      <RippleControl {...this.baseProps()}
        type={RippleControlTypeMap[this.props.type]}
        targetFactory={targetFactory}
        contentFactory={labeledButtonContentFactory.bind(this)}
      />
    )
  }
}
