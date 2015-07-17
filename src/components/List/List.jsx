import './List.less'
import React, {Component, DOM, PropTypes} from "react"
import {base, baseControl} from "../../util/decorators"
import Icon from "../Icon/Icon"
import IconButton from "../IconButton/IconButton"
import IconMenu from "../IconMenu/IconMenu"
import SelectRipple from "../SelectRipple/SelectRipple"


@base()
export default class List extends Component {
  render() {
    return <div {...this.base()}>{this.props.children}</div>
  }
}


@base()
export class ListDivider extends Component {
  static propTypes = {
    type: PropTypes.oneOf(["no-keyline", "full"]).isRequired,
  }

  render() {
    return <div {...this.base({classes: this.props.type})} />
  }
}


@baseControl()
export class ListTile extends Component {
  static propTypes = {
    borderType: PropTypes.oneOf(["no-keyline", "full"]),
    alignTop: PropTypes.bool,
    targetFactory: PropTypes.func,
    // TODO: this must be an array of ListCell
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    alignTop: false,
    targetFactory: DOM.a,
  }

  static childContextTypes = {
    alignTop: PropTypes.bool,
    getType: PropTypes.func,
  }


  getChildContext() {
    return {
      alignTop: this.props.alignTop,
      getType: this._getType,
    }
  }


  render() {
    const border = this.props.borderType &&
      <div className={this.c("border-"+this.props.borderType)} />

    const classes = {
      bordered: this.props.borderType,
    }

    return (
      this.props.targetFactory(
        this.base({classes}),
        <div>
          <SelectRipple type="highlight" control={this.control} />
          {border}
          <div className={this.c("cells")}>{this.props.children}</div>
        </div>
      )
    )
  }
}


@base()
export class ListIconGroupTile extends Component {
  static propTypes = {
    firstInGroup: PropTypes.string,
  }


  render() {
    const groupCell = this.props.firstInGroup
      ? <ListIcon type={this.props.firstInGroup} />
      : <ListKeylineSpacer />

    const borderType = this.props.firstInGroup && "no-keyline"

    return (
      <ListTile {...this.base()} borderType={borderType}>
        {groupCell}
        {this.props.children}
      </ListTile>
    )
  }
}


@base()
export class ListCell extends Component {
  static propTypes = {
    defaultVerticalAlign: PropTypes.oneOf(["center", "stretch"]).isRequired,
    secondary: PropTypes.bool,
    children: PropTypes.node,
  }

  static defaultProps = {
    defaultVerticalAlign: "center",
  }

  static contextTypes = {
    alignTop: PropTypes.bool,
    getType: PropTypes.func,
  }


  @base.on('click', 'mouseDown')
  cancelPrimaryAction(e) {
    // If this is a secondary action, we don't want to trigger the primary
    // action, so don't let the event bubble up to the tile handler.
    if (this.props.secondary) {
      e.preventDefault()
      e.stopPropagation()
    }
  }


  render() {
    let verticalAlign
    if (this.context.alignTop)
      verticalAlign = "top"
    else if (this.props.defaultVerticalAlign == "center")
      verticalAlign = "center"
    else if (this.props.defaultVerticalAlign == "stretch")
      verticalAlign = "stretch"

    const classes = {
      [`vertical-align-${verticalAlign}`]: true,
      'stretch-width': this.props.width == "stretch",
      'secondary': this.props.secondary,
    }

    return (
      <div {...this.base({classes})}>
        {this.props.children}
      </div>
    )
  }
}


@base()
export class ListKeylineSpacer extends Component {
  render() {
    return <ListCell {...this.base()} />
  }
}


@base()
export class ListAvatar extends Component {
  static propTypes = {
    placeholderIcon: PropTypes.string.isRequired,
    src: PropTypes.string,
  }


  render() {
    return (
      <ListCell className={this.cRoot()}>
        <Icon className={this.c("icon")} type={this.props.placeholderIcon} />
        <img {...this.props} className={this.c("img")} />
      </ListCell>
    )
  }
}


@base()
export class ListIcon extends Component {
  render() {
    return (
      <ListCell className={this.cRoot()}>
        <Icon {...this.props} className={this.c("icon")} />
      </ListCell>
    )
  }
}


@base()
export class ListIconMenu extends Component {
  render() {
    return (
      <ListCell className={this.cRoot()} secondary={true}>
        <IconMenu {...this.props} className={this.c("control")} />
      </ListCell>
    )
  }
}


@base()
export class ListIconButton extends Component {
  render() {
    return (
      <ListCell className={this.cRoot()} secondary={true}>
        <IconButton {...this.props} className={this.c("control")} />
      </ListCell>
    )
  }
}


@base()
export class ListLabel extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }


  render() {
    return (
      <ListCell {...this.base({classes: 'single'})}
        type="single"
        width="stretch"
      >
        {this.props.label}
      </ListCell>
    )
  }
}


@base()
export class ListLabeledText extends Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    type: PropTypes.string,
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    type: 'double',
  }


  render() {
    return (
      <ListCell {...this.base({classes: this.props.type})}
        type={this.props.type}
        width="stretch"
      >
        <div className={this.c("label")}>{this.props.label}</div>
        <div className={this.c("secondary")}>{this.props.children}</div>
      </ListCell>
    )
  }
}
