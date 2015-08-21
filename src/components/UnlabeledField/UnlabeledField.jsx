import './UnlabeledField.less'
import React, {Component, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import FieldLine from "../FieldLine/FieldLine"


@baseControl({passthrough: {force: ['disabled', 'value']}})
export default class LabeledField extends Component {
  static propTypes = {
    controlFactory: PropTypes.func.isRequired,
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
      <div {...this.targetCallbacks()} className={this.cRoot()}>
        {this.props.controlFactory(controlProps)}
        <FieldLine control={this.control} />
      </div>
    )
  }
}
