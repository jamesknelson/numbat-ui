import './RaisedButton.less'
import React, {Component, DOM, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import Paper from "../Paper/Paper"
import LabeledButtonContent from "../LabeledButtonContent/LabeledButtonContent"


const RippleTypeMap = {
  default: "highlight",
  accent: "accent",
  primary: "primary",
}
const LabeledButtonContentTypeMap = {
  default: "transparent",
  accent: "accent-solid",
  primary: "primary-solid",
}


@baseControl()
export default class RaisedButton extends Component {
  static propTypes = {
    onPress: PropTypes.func.isRequired,
    label: PropTypes.string,
    shape: PropTypes.string,
    targetFactory: PropTypes.func,
    type: PropTypes.oneOf(['primary', 'accent', 'default']),
  }

  static defaultProps = {
    targetFactory: DOM.a,
    type: "default",
  }


  controlPrimaryAction() {
    this.props.onPress()
  }


  render() {
    let zIndex = 1
    if (this.control.disabled) zIndex = 0
    else if (this.control.acting) zIndex = 2

    return (
      <div className={this.cRoot()}>
        {
          this.props.targetFactory(
            Object.assign(this.passthrough(), {className: this.c("container")}, this.callbacks),
            <Paper zDepth={zIndex} shape={this.props.shape}>
              <LabeledButtonContent
                control={this.control}
                label={this.props.label || this.props.children}
                type={LabeledButtonContentTypeMap[this.props.type]}
                rippleType={RippleTypeMap[this.props.type]}
              />
            </Paper>
          )
        }
      </div>
    )
  }
}
