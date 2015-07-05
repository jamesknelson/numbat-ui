import './AppBar.less'
import React, {PropTypes} from "react"
import Base from "../Base"
import Paper from "../Paper/Paper"
import IconButton from "../IconButton/IconButton"


export default class AppBar extends Base {
  static propTypes = {
    onToggleAppMenu: PropTypes.func.isRequired,
    overhang: PropTypes.oneOf([true, 'md-plus', 'lg']),
    title: PropTypes.string,
    children: PropTypes.node,
  }


  render() {
    let classes

    if (this.props.overhang === true)
      classes = "overhang"
    else if (this.props.overhang)
      classes = `overhang-${this.props.overhang}`
    else
      classes = "no-overhang"

    const title = this.props.title &&
      <h1 className={this.c("title")}>{this.props.title}</h1>

    const menuButton =
      <IconButton
        iconType="menu"
        type="dark"
        onClick={this.props.onToggleAppMenu}
        className={this.c("menu-button")}
      />

    return (
      <Paper shape='square' {...this.baseProps({classes})}>
        <div className={this.c("inner")}>
          {menuButton}
          {title}
          {this.props.children}
        </div>
      </Paper>
    )
  }
}
