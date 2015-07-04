React = require('react')
createNUIClass = require('../../util/createNUIClass')
RippleControl = require('../RippleControl/RippleControl')
IconMenu = require('../IconMenu/IconMenu')
IconButton = require('../IconButton/IconButton')
Icon = require('../Icon/Icon')



List = createNUIClass("List")



List.Divider = createNUIClass "ListDivider",
  propTypes:
    type: React.PropTypes.oneOf(["no-keyline", "full"]).isRequired

  render: ->
    <div className={@componentClasses(@props.type)} />



List.Tile = createNUIClass "ListTile",

  childContextTypes:
    alignTop: React.PropTypes.bool
    getType: React.PropTypes.func

  propTypes:
    borderType: React.PropTypes.oneOf(["no-keyline", "full"])
    alignTop: React.PropTypes.bool
    targetFactory: React.PropTypes.func
    # TODO: this must be an array of List.Cell
    children: React.PropTypes.node.isRequired


  getChildContext: ->
    alignTop: @props.alignTop
    getType: @_getType


  getDefaultProps: ->
    alignTop: false
    targetFactory: React.DOM.a


  render: (other) ->
    contentFactory = (options, children) =>
      if @props.borderType
        border = <div className={@c("border-"+@props.borderType)} />

      className = @c "inner",
        'focused-inner': options.isKeyboardFocused

      <div className={className}>
        {children}
        {border}
        <div className={@c "cells"}>{@props.children}</div>
      </div>

    targetFactory = (options, children) =>
      # Note that all relevant style is removed from the passed in target.
      @props.targetFactory(
        Object.assign(options, className: @c('container'))
        children
      )

    <RippleControl
      {...other}
      className={@componentClasses("ripple", bordered: @props.borderType)}
      type="highlight"
      targetFactory={targetFactory}
      contentFactory={contentFactory}
    ></RippleControl>



List.IconGroupTile = createNUIClass "ListIconGroupTile",
  propTypes:
    firstInGroup: React.PropTypes.string


  render: ->
    groupCell = 
      if @props.firstInGroup
        <List.Icon type={@props.firstInGroup} />
      else
        <List.KeylineSpacer />


    borderType = if @props.firstInGroup then "no-keyline"


    <List.Tile {...@props} className={@componentClasses()} borderType={borderType}>
      {groupCell}
      {@props.children}
    </List.Tile>




List.Cell = createNUIClass "ListCell",
  propTypes:
    defaultVerticalAlign: React.PropTypes.oneOf(["center", "stretch"]).isRequired
    secondary: React.PropTypes.bool
    children: React.PropTypes.node

  contextTypes:
    alignTop: React.PropTypes.bool
    getType: React.PropTypes.func


  getDefaultProps: ->
    defaultVerticalAlign: "center"


  _cancelPrimary: (e) ->
    # If this is a secondary action, we don't want to trigger the primary
    # action, so don't let the event bubble up to the tile handler.
    if @props.secondary
      e.preventDefault()
      e.stopPropagation()


  render: ->
    verticalAlign = switch
      when @context.alignTop then "top"
      when @props.defaultVerticalAlign is "center" then "center"
      when @props.defaultVerticalAlign is "stretch" then "stretch"

    className = @componentClasses "vertical-align-#{verticalAlign}",
      'stretch-width': @props.width == "stretch"
      'secondary': @props.secondary

    <div
      className={className}
      onClick={@_cancelPrimary}
      onMouseDown={@_cancelPrimary}
    >
      {@props.children}
    </div>



List.KeylineSpacer = createNUIClass "ListKeylineSpacer",

  render: ->
    <List.Cell className={@componentClasses()} />



List.Avatar = createNUIClass "ListAvatar",

  propTypes:
    placeholderIcon: React.PropTypes.string.isRequired
    src: React.PropTypes.string


  render: ->
    <List.Cell className={@componentClasses()}>
      <Icon className={@c "icon"} type={@props.placeholderIcon} />
      <img {...@props} className={@c "img"} />
    </List.Cell>



List.Icon = createNUIClass "ListIcon",
  render: ->
    <List.Cell className={@componentClasses()}>
      <Icon {...@props} className={@c "icon"} />
    </List.Cell>



List.IconMenu = createNUIClass "ListIconMenu",
  render: ->
    <List.Cell className={@componentClasses()} secondary={true}>  
      <IconMenu
        {...@props}
        className={@c "control"}
      />
    </List.Cell>
      

    

List.IconButton = createNUIClass "ListIconButton",
  render: ->
    <List.Cell className={@componentClasses()} secondary={true}>
      <IconButton {...@props} className={@c "control"} />
    </List.Cell>



List.Label = createNUIClass "ListLabel",
  propTypes:
    label: React.PropTypes.string.isRequired

  render: ->
    <List.Cell
      className={@componentClasses("single")}
      type="single"
      width="stretch"
    >
      {@props.label}
    </List.Cell>



List.LabeledText = createNUIClass "ListLabeledText",
  propTypes:
    label: React.PropTypes.string.isRequired
    type: React.PropTypes.string
    children: React.PropTypes.node.isRequired

  render: ->
    type = @props.type ? "double"

    <List.Cell
      className={@componentClasses(type)}
      type={type}
      width="stretch"
    >
      <div className={@c "label"}>{@props.label}</div>
      <div className={@c "secondary"}>{@props.children}</div>
    </List.Cell>




module.exports = List