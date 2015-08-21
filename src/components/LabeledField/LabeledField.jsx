import './LabeledField.less'
import React, {Component, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import FieldLabel from "../FieldLabel/FieldLabel"
import FieldLine from "../FieldLine/FieldLine"


@baseControl({passthrough: {force: ['disabled', 'value']}})
export default class LabeledField extends Component {
  static propTypes = {
    controlFactory: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  }


  render() {
    const controlProps = Object.assign(
      this.passthrough(),
      {className: this.c('control')},
      this.inputCallbacks()
    )

    return (
      <FieldLabel
        {...this.targetCallbacks()}
        className={this.cRoot()}
        control={this.control}
        empty={!this.props.value}
        label={this.props.label}
      >
        {this.props.controlFactory(controlProps)}
        <FieldLine control={this.control} />
      </FieldLabel>
    )
  }
}
