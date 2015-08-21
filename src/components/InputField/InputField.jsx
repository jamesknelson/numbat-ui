import './InputField.less'
import React, {Component, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import Input from "../Input/Input"
import Field from "../Field/Field"


@baseControl({passthrough: {force: ['value']}})
export default class InputField extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
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
        <Input
          {...this.passthrough()}
          {...this.focusableCallbacks()}
          className={this.c('control')}
        />  
      </Field>
    )
  }
}
