import './FlatButton.less'
import React, {Component, DOM, PropTypes} from "react"
import {baseControl} from "../../util/decorators"
import LabeledButtonContent from "../LabeledButtonContent/LabeledButtonContent"


const RippleTypeMap = {
  default: "highlight",
  accent: "highlight-accent",
  primary: "highlight-primary",
}


@baseControl()
export default class FlatButton extends Component {
  static propTypes = {
    label: PropTypes.string,
    onPress: PropTypes.func.isRequired,
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
    return (
      <div className={this.cRoot()}>
        {
          this.props.targetFactory(
            Object.assign(this.passthrough(), {className: this.c("container")}, this.callbacks),
            <LabeledButtonContent
              control={this.control}
              label={this.props.label || this.props.children}
              type={this.props.type}
              rippleType={RippleTypeMap[this.props.type]}
            />
          )
        }
      </div>
    )
  }
}
