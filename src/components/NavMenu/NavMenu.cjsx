React = require('react')
createNUIClass = require('../../util/createNUIClass')
Paper = require('../Paper/Paper')
List = require('../List/List')



NavMenuItem = createNUIClass "NavMenuItem",
  propTypes:
    label: React.PropTypes.string.isRequired
    iconType: React.PropTypes.string.isRequired
    targetFactory: React.PropTypes.func.isRequired
    selected: React.PropTypes.bool


  render: ->
    if @props.selected
      selectedClass = @c("selected")

    <List.Tile 
      className={@componentClasses("selected-tile": @props.selected)}
      targetFactory={@props.targetFactory}
    >
      <List.Icon className={@c("icon", selected: @props.selected)} type={@props.iconType} />
      <List.Label className={@c("label", selected: @props.selected)} label={@props.label} />
    </List.Tile>



NavMenuDivider = createNUIClass "NavMenuDivider",
  render: ->
    <List.Divider {...@props} className={@componentClasses()} />



NavMenu = createNUIClass "NavMenu",

  propTypes:
    children: React.PropTypes.node.isRequired

  render: ->
    <Paper shape="square" zDepth={2} className={@componentClasses()}>
      <List {...@props} className={@c "list"} />
    </Paper>



module.exports = {NavMenu, NavMenuDivider, NavMenuItem}