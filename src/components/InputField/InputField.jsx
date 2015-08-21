import './InputField.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"
import Input from "../Input/Input"
import LabeledField from "../LabeledField/LabeledField"
import UnlabeledField from "../UnlabeledField/UnlabeledField"


const InputFactory = React.createFactory(Input)


@base({passthrough: {force: ['label', 'icon', 'hint']}})
export default class InputField extends Component {
  static propTypes = {
    hint: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
  }

  render() {
    const Field = this.props.label ? LabeledField : UnlabeledField

    return (
      <Field {...this.base()} controlFactory={InputFactory} />
    )
  }
}
