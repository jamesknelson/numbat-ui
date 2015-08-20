import './LabeledField.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"
import FieldLabel from "../FieldLabel/FieldLabel"
import FieldLine from "../FieldLine/FieldLine"


@base({passthrough: {force: ['disabled', 'value']}})
export default class LabeledField extends Component {
  static propTypes = {
    controlFactory: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }


  state = {control: {disabled: this.props.disabled}}


  onControl = control => {
    this.setState({control})
  }


  render() {
    const controlProps = Object.assign(
      this.passthrough(),
      {onControl: this.onControl, className: this.c('control')}
    )

    return (
      <FieldLabel
        className={this.cRoot()}
        control={this.state.control}
        empty={!this.props.value}
        label={this.props.label}
      >
        {this.props.controlFactory(controlProps)}
        <FieldLine control={this.state.control} />
      </FieldLabel>
    )
  }
}
