import './FloatingActionButton.less'
import React, {PropTypes, DOM} from "react"
import {bound} from "../../util/decorators"
import Base from "../Base"
import Target from "../Target"
import Icon from '../Icon/Icon'
import Paper from '../Paper/Paper'
import RippleControl from "../RippleControl/RippleControl"


export default class FloatingActionButton extends Base {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    size: PropTypes.oneOf(['default', 'mini']),
    targetFactory: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'accent']),
  }

  static defaultProps = {
    type: "accent",
    size: "default",
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
    // The content factory which produces the button content's structure is the
    // same across all rounded buttons. It is passed an `isKeyboardFocussed`
    // option by the button's RippleControl element.
    const contentFactory = (options, children) => {
      const className = this.c({
        'inner': true,
        [`${this.props.type}-inner`]: true,
        'mini-inner': this.props.size == "mini",
        'disabled-inner': this.props.disabled,
        'focused-inner': options.isKeyboardFocused,
      })

      return (
        <div className={className}>
          {children}
          <Icon type={this.props.iconType} />
        </div>
      )
    }

    // The target factory produces content which should be outside of the
    // displayed bounds, including padding, targets, etc. 
    const targetFactory = (options, children) => {
      let zIndex = 1
      if (this.props.disabled) zIndex = 0
      else if (this.state.touched) zIndex = 2

      const classes = {
        'container': true,
        'mini-container': this.props.size == "mini",
      }

      const inner = this.props.targetFactory(
        Object.assign(options, {className: this.c(classes)}),
        <Paper zDepth={zIndex} shape="circle">{children}</Paper>
      )

      return (
        <Target on={this.setTouched} off={this.unsetTouched}>{inner}</Target>
      )
    }

    return (
      <RippleControl {...this.baseProps()}
        type={this.props.type}
        targetFactory={targetFactory}
        contentFactory={contentFactory}
        centerRipple={true}
      />
    )
  }
}
