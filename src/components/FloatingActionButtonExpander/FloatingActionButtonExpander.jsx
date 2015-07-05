import './FloatingActionButtonExpander.less'
import React, {PropTypes, DOM} from "react"
import {bound} from "../../util/decorators"
import Base from "../Base"
import FloatingActionButton from "../FloatingActionButton/FloatingActionButton"


export default class FloatingActionButtonExpander extends Base {
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
    window.addEventListener("keydown", this.close, true)
    window.addEventListener("click", this.close, true)
    window.addEventListener("touchend", this.close, true)
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
      <div {...this.baseProps({classes: {open: this.state.open}})}>
        <FloatingActionButton
          className={this.c("toggle")}
          type={this.props.type}
          iconType={this.props.iconType} 
          onClick={this.toggleMenu}
        />
        <div className={this.c("expanded")}>
          {wrappedButtons}
        </div>
      </div>
    )
  }
}
