import './RippleControl.less'
import React, {DOM, PropTypes} from "react"
import {delay, except} from "../../util/functions"
import {onWindow} from "../../util/decorators"
import KeyCode from "../../util/KeyCodes"
import Base from "../Base"
import FocusRipple from "../FocusRipple/FocusRipple"
import TouchRipple from "../TouchRipple/TouchRipple"


@onWindow({
  keydown: 'onWindowKeyDown',
  keyup: 'onWindowKeyUp',
})
export default class RippleControl extends Base {
  static propTypes = {
    centerRipple: PropTypes.bool,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    disableFocusRipple: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,
    targetFactory: PropTypes.func.isRequired,
    contentFactory: PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {isKeyboardFocused: false}
  }


  get keyboardFocused() {
    return this.state.isKeyboardFocused
  }


  @Base.on('mouseDown', 'blur')
  resetKeyboardFocus() {
    this.setState({isKeyboardFocused: false})
  }

  @Base.on('focus')
  setKeyboardFocusIfTabPressed(e) {
    if (this._tabPressed) {
      this.setState({isKeyboardFocused: true})
    }
  }


  onWindowKeyDown(e) {
    if (e.keyCode == KeyCode.TAB) {
      this._tabPressed = true
    }

    if (e.keyCode == KeyCode.ENTER && this.state.isKeyboardFocused) {
      this.resetKeyboardFocus()
    }
  }

  onWindowKeyUp(e) {
    if (e.keyCode == KeyCode.SPACE && this.state.isKeyboardFocused) {
      this.resetKeyboardFocus()
    }
  }


  render() {
    const targetProps = Object.assign(
      this.baseProps({classes: false}),
      {disabled: this.props.disabled}
    )

    const contentProps = {
      className: this.c({
        'is-disabled': this.props.disabled,
        'is-keyboard-focused': this.state.isKeyboardFocused,
      }),
      isKeyboardFocused: this.state.isKeyboardFocused,
    }

    const focusRipple = !this.props.disabled && !this.props.disableFocusRipple &&
      <FocusRipple
        key="focusRipple"
        type={this.props.type}
        show={this.state.isKeyboardFocused}
      ></FocusRipple>

    const buttonFactory = (options, ripples) => this.props.targetFactory(
      targetProps,
      DOM.div(
        {className: this.c("inner")},
        this.props.contentFactory(contentProps, ripples),
        focusRipple,
      )
    )

    return ((!this.props.disabled && !this.props.disableTouchRipple)
      ? <TouchRipple
          className={this.baseClasses()}
          key="touchRipple"
          type={this.props.type}
          factory={buttonFactory}
          centerRipple={this.props.centerRipple}
        />
      : <div className={this.baseClasses()}>{buttonFactory()}</div>
    )
  }
}
