React = require('react')
createNUIClass = require('../../util/createNUIClass')
Paper = require('../Paper/Paper')
IconButton = require('../IconButton/IconButton')



module.exports = createNUIClass "AppBar",

  propTypes:
    onToggleAppMenu: React.PropTypes.func.isRequired
    overhang: React.PropTypes.oneOf([true, 'md-plus', 'lg'])
    title: React.PropTypes.string
    children: React.PropTypes.node


  render: ->
    overhangClass = switch
      when @props.overhang == true then "overhang"
      when @props.overhang then "overhang-#{@props.overhang}"
      else "no-overhang"

    title = if @props.title
      <h1 className={@c "title"}>{@props.title}</h1>

    menuButton =
      <IconButton
        iconType="menu"
        type="dark"
        onClick={@props.onToggleAppMenu}
        className={@c "menu-button"}
      ></IconButton>

    <Paper shape='square' className={@componentClasses(overhangClass)}>
      <div className={@c "inner"}>
        {menuButton}
        {title}
        {@props.children}
      </div>
    </Paper>
