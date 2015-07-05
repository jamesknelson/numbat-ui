import './List.less'
import React, {PropTypes, DOM} from "react"
import Base from "../Base"
import Icon from "../Icon/Icon"
import IconButton from "../IconButton/IconButton"
import IconMenu from "../IconMenu/IconMenu"
import RippleControl from "../RippleControl/RippleControl"


export default class List extends Base {}


export class ListDivider extends Base {
  static propTypes = {
    type: PropTypes.oneOf(["no-keyline", "full"]).isRequired,
  }

  render() {
    return <div {...this.baseProps({classes: this.props.type})} />
  }
}


export class ListTile extends Base {
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
    const contentFactory = (options, children) => {
      const border = this.props.borderType &&
        <div className={this.c("border-"+this.props.borderType)} />

      const className = this.c("inner", {
        'focused-inner': options.isKeyboardFocused
      })

      return (
        <div className={className}>
          {children}
          {border}
          <div className={this.c("cells")}>{this.props.children}</div>
        </div>
      )
    }

    const targetFactory = (options, children) => this.props.targetFactory(
      // Note that all relevant style is removed from the passed in target.  
      Object.assign(options, {className: this.c('container')}),
      children
    )

    const classes = {
      ripple: true,
      bordered: this.props.borderType,
    }

    return (
      <RippleControl {...this.baseProps({classes})}
        type="highlight"
        targetFactory={targetFactory}
        contentFactory={contentFactory}
      />
    )
  }
}


export class ListIconGroupTile extends Base {
  static propTypes = {
    firstInGroup: PropTypes.string,
  }


  render() {
    const groupCell = this.props.firstInGroup
      ? <ListIcon type={this.props.firstInGroup} />
      : <ListKeylineSpacer />

    const borderType = this.props.firstInGroup && "no-keyline"

    return (
      <ListTile {...this.baseProps()} borderType={borderType}>
        {groupCell}
        {this.props.children}
      </ListTile>
    )
  }
}


export class ListCell extends Base {
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


  @Base.on('click', 'mouseDown')
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
      <div {...this.baseProps({classes})}>
        {this.props.children}
      </div>
    )
  }
}


export class ListKeylineSpacer extends Base {
  render() {
    return <ListCell {...this.baseProps()} />
  }
}


export class ListAvatar extends Base {
  static propTypes = {
    placeholderIcon: PropTypes.string.isRequired,
    src: PropTypes.string,
  }


  render() {
    return (
      <ListCell className={this.baseClasses()}>
        <Icon className={this.c("icon")} type={this.props.placeholderIcon} />
        <img {...this.props} className={this.c("img")} />
      </ListCell>
    )
  }
}


export class ListIcon extends Base {
  render() {
    return (
      <ListCell className={this.baseClasses()}>
        <Icon {...this.props} className={this.c("icon")} />
      </ListCell>
    )
  }
}


export class ListIconMenu extends Base {
  render() {
    return (
      <ListCell className={this.baseClasses()} secondary={true}>  
        <IconMenu {...this.props} className={this.c("control")} />
      </ListCell>
    )
  }
}
 
 
export class ListIconButton extends Base {
  render() {
    return (
      <ListCell className={this.baseClasses()} secondary={true}>
        <IconButton {...this.props} className={this.c("control")} />
      </ListCell>
    )
  }
}


export class ListLabel extends Base {
  static propTypes = {
    label: PropTypes.string.isRequired,
  }


  render() {
    return (
      <ListCell {...this.baseProps({classes: 'single'})}
        type="single"
        width="stretch"
      >
        {this.props.label}
      </ListCell>
    )
  }
}


export class ListLabeledText extends Base {
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
      <ListCell {...this.baseProps({classes: this.props.type})}
        type={this.props.type}
        width="stretch"
      >
        <div className={this.c("label")}>{this.props.label}</div>
        <div className={this.c("secondary")}>{this.props.children}</div>
      </ListCell>
    )
  }
}
