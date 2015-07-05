import './NavMenu.less'
import React, {PropTypes} from "react"
import Base from "../Base"
import Paper from "../Paper/Paper"
import List, 
       {ListDivider,
        ListIcon,
        ListLabel,
        ListTile} from "../List/List"


export class NavMenuItem extends Base {
  static propTypes = {
    label: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
    targetFactory: PropTypes.func.isRequired,
    selected: PropTypes.bool,
  }


  render() {
    const classes = {
      "selected-tile": this.props.selected,
    }

    return (
      <ListTile {...this.baseProps({classes})}
        targetFactory={this.props.targetFactory} >
        <ListIcon
          className={this.c("icon", {selected: this.props.selected})}
          type={this.props.iconType} />
        <ListLabel
          className={this.c("label", {selected: this.props.selected})}
          label={this.props.label} />
      </ListTile>
    )
  }
}


export class NavMenuDivider extends Base {
  render() {
    return <ListDivider {...this.baseProps()} type="full" />
  }
}


export default class NavMenu extends Base {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <Paper
        className={this.baseClasses()}
        shape="square"
        zDepth={2}>
        <List {...this.props} className={this.c("list")} />
      </Paper>
    )
  }
}
