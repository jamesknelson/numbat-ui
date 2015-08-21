import './Field.less'
import React, {Component, PropTypes} from "react"
import ReactDOM from 'react-dom'
import {isDescendant} from "../../util/DOMUtil"
import {base} from "../../util/decorators"
import FieldLabel from "../FieldLabel/FieldLabel"
import FieldLine from "../FieldLine/FieldLine"


@base()
export default class Field extends Component {
  static propTypes = {
    label: PropTypes.string,
    children: PropTypes.element.isRequired,
    acting: PropTypes.bool.isRequired,
    selecting: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
    active: PropTypes.bool.isRequired,
    disabled: PropTypes.bool.isRequired,
    empty: PropTypes.bool.isRequired,
  }


  @base.on('click')
  focus(e) {
    const focusableNode = ReactDOM.findDOMNode(this.refs.focusable)
    if (focusableNode != e.target && !isDescendant(focusableNode, e.target)) {
      this.refs.focusable.focus()
    }
  }


  render() {
    const focusableWithRef = React.cloneElement(this.props.children, {ref: 'focusable'})
  
    return (
      <div {...this.base()}>
        {this.props.label && <FieldLabel
          label={this.props.label}
          active={this.props.active}
          disabled={this.props.disabled}
          empty={this.props.empty}
        />}
        {focusableWithRef}
        <FieldLine 
          acting={this.props.acting}
          selecting={this.props.selecting}
          active={this.props.active}
          disabled={this.props.disabled}
        />
      </div>
    )
  }
}
