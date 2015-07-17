import './FloatingActionButtonExpander.less'
import React, {Component, DOM, PropTypes} from "react"
import {base, bound} from "../../util/decorators"
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton"


@base()
export default class FloatingActionButtonExpander extends Component {
  static propTypes = {
    iconType: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['primary', 'accent']),
    children: React.PropTypes.node.isRequired,
  }

  static defaultProps = {
    type: "accent",
  }


  constructor(props) {
    super(props)
    this.state = {open: false}
  }


  @bound
  open() {
    this.setState({open: true})
    setTimeout(() => {
      window.addEventListener("keydown", this.close, true)
      window.addEventListener("click", this.close, true)
      window.addEventListener("touchend", this.close, true)
    })
  }


  @bound
  close() {
    this.setState({open: false})
    window.removeEventListener("keydown", this.close, true)
    window.removeEventListener("click", this.close, true)
    window.removeEventListener("touchend", this.close, true)
  }


  @bound
  toggleMenu() {
    if (this.state.open) {
      this.close()
    }
    else {
      this.open()
    }
  }


  componentWillUnmount() {
    // Make sure to remove any event listeners
    if (this.state.open) {
      this.close()
    }
  }
    

  render() {
    const wrappedButtons = this.props.children.map((action, i) =>
      <div className={this.c("button-wrapper")} key={i}>
        {action}
      </div>
    )

    return (
      <div className={this.cRoot({open: this.state.open})}>
        <FloatingActionButton
          {...this.base({classes: false})}
          className={this.c("toggle")}
          type={this.props.type}
          iconType={this.props.iconType} 
          onPress={this.toggleMenu}
        />
        <div className={this.c("expanded")}>
          {wrappedButtons}
        </div>
      </div>
    )
  }
}
