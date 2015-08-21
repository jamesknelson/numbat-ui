import './MenuField.less'
import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import {isDescendant} from "../../util/DOMUtil"
import {base, baseControl} from "../../util/decorators"
import Menu from "../Menu/Menu"
import Field from "../Field/Field"


@base()
class MenuFieldIndicator extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onSelectItem: PropTypes.func.isRequired,
    tabIndex: PropTypes.number, 
  }


  focus() {
    ReactDOM.findDOMNode(this.refs.input).focus()
  }

  render() {
    return (
      <div className={this.cRoot()}>
        <div
          {...this.passthrough()}
          {...this.callbacks}
          className={this.c("indicator")}
          tabIndex={this.props.tabIndex || 0}
          ref="input"
        >
          {this.props.value}
        </div>
        <Menu
          className={this.c("menu")}
          onSelectItem={this.props.onSelectItem}
          open={this.props.open}
          side="right"
        >
          {this.props.children}
        </Menu>
      </div>
    )
  }
}


@baseControl({passthrough: {force: ['value']}})
export default class MenuField extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
  }

  state = {
    open: false,
  }


  handleDocumentClick = e => {
    const el = ReactDOM.findDOMNode(this)

    // Check if the target is inside the current component
    if (e.target != el && !isDescendant(el, e.target)) {
      this.setState({open: false})
    }
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
    this.setState({open: !this.state.open})
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
        >
          {this.props.children}
        </MenuFieldIndicator>
      </Field>
    )
  }
}
