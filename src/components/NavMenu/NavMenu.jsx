import './NavMenu.less'
import React, {Component, PropTypes} from "react"
import {base} from "../../util/decorators"
import Paper from "../Paper/Paper"
import List, 
       {ListDivider,
        ListIcon,
        ListLabel,
        ListTile} from "../List/List"


@base()
export class NavMenuItem extends Component {
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
      <ListTile {...this.base({classes})}
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


@base()
export class NavMenuDivider extends Component {
  render() {
    return <ListDivider {...this.base()} type="full" />
  }
}


@base()
export default class NavMenu extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <Paper
        className={this.cRoot()}
        shape="square"
        zDepth={2}>
        <List {...this.props} className={this.c("list")} />
      </Paper>
    )
  }
}
