import './MenuField.less'
import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import {isDescendant} from "../../util/DOMUtil"
import KeyCodes from "../../util/KeyCodes"
import {base, baseControl} from "../../util/decorators"
import Menu from "../Menu/Menu"
import Field from "../Field/Field"


@base()
class MenuFieldIndicator extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    tabIndex: PropTypes.number, 
  }


  onSelectItem = item => {
    this.props.onSelectItem(item)
    this.focus()
  }


  focus() {
    ReactDOM.findDOMNode(this.refs.input).focus()
  }

  render() {
    const classes = {
      disabled: this.props.disabled,
      open: this.props.open,
    }

    return (
      <div {...this.base({classes})}>
        <div
          className={this.c("indicator")}
          tabIndex={this.props.tabIndex || 0}
          ref="input"
        >
          {this.props.value}
        </div>
        <Menu
          className={this.c("menu")}
          onSelectItem={this.onSelectItem}
          open={this.props.open}
          side="right"
        >
          {this.props.children}
        </Menu>
      </div>
    )
  }
}


@baseControl({passthrough: {force: ['value', 'disabled']}})
export default class MenuField extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    label: PropTypes.string,
  }

  state = {
    open: false,
  }


  onMenuMouseDown = () => {
    this.menuMouseDown = true
  }

  onMenuMouseUp = () => {
    this.menuMouseDown = false
  }


  handleDocumentClick = e => {
    const el = ReactDOM.findDOMNode(this)

    // Check if the target is inside the current component
    if (e.target != el && !isDescendant(el, e.target)) {
      this.toggle(false)
    }
  }


  @baseControl.on('keyDown')
  closeOnEscape(e) {
    if (e.keyCode == KeyCodes.ESC) {
      this.toggle(false)
    }
  }


  toggle(open='default') {
    if (open == 'default') {
      open = !this.state.open
    }

    if (!open) {
      this.menuMouseDown = false
    }

    this.setState({open})
  }


  // When the component mounts, listen to click events and check if we need to
  // Call the handleDocumentClick function.
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }


  controlPrimaryAction() {
    this.toggle()
  }

  controlWillUpdate(nextControl) {
    if (this.control.active && nextControl.active === false && !this.menuMouseDown) {
    }
  }


  render() {
    return (
      <Field
        {...this.targetCallbacks()}
        {...this.control}
        className={this.cRoot()}
        empty={!this.props.value}
        label={this.props.label}
      >
        <MenuFieldIndicator
          {...this.passthrough()}
          {...this.focusableCallbacks()}
          className={this.c('control')}
          open={this.state.open}
          onMouseDown={this.onMenuMouseDown}
          onMouseUp={this.onMenuMouseUp}
          onSelectItem={this.props.onSelectItem}
          disabled={this.props.disabled}
          ref='indicator'
        >
          {this.props.children}
        </MenuFieldIndicator>
      </Field>
    )
  }
}
