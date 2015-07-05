import './IconMenu.less'
import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import Base from "../Base"
import {bound} from "../../util/decorators"
import {delay} from "../../util/functions"
import {isDescendant} from '../../util/DOMUtil'
import IconButton from '../IconButton/IconButton'
import Menu from '../Menu/Menu'


export default class IconMenu extends Base {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    type: PropTypes.string,
    side: PropTypes.string,
    tooltip: PropTypes.string,
    onSelectItem: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    tabIndex: PropTypes.number,
  }


  constructor(props) {
    super(props)
    this.state = {open: false}
  }


  // When the component mounts, listen to click events and check if we need to
  // Call the componentClickAway function.
  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }


  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }


  @bound
  handleDocumentClick(e) {
    const el = ReactDOM.findDOMNode(this)

    // Check if the target is inside the current component
    if (e.target != el && !isDescendant(el, e.target)) {
      this.setState({open: false})
    }
  }


  @bound
  onSelectItem(value) {
    this.setState({open: false})
    this.props.onSelectItem(value)
  }


  @bound
  onButtonClick() {
    delay(50, () => this.setState({open: !this.state.open}))
  }


  render() {
    return (
      <div className={this.baseClasses()}>
        <IconButton {...this.baseProps({classes: false})}
          className={this.c("icon")} 
          onClick={this.onButtonClick}
          iconType={this.props.iconType}
          tooltip={this.props.tooltip}
          type={this.props.type}
          tabIndex={this.props.tabIndex}
        />
        <Menu className={this.c("menu")}
          onSelectItem={this.onSelectItem}
          open={this.state.open}
          side={this.props.side}
        >
          {this.props.children}
        </Menu>
      </div>
    )
  }
}
