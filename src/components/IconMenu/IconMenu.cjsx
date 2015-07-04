React = require('react')
delay = require('../../util/delay')
createNUIClass = require('../../util/createNUIClass')
ClickAwayable = require('../../mixins/ClickAwayable')
IconButton = require('../IconButton/IconButton')
Menu = require('../Menu/Menu').Menu



module.exports = createNUIClass "IconMenu",

  mixins: [
    ClickAwayable
  ]

  propTypes:
    iconType: React.PropTypes.string.isRequired
    type: React.PropTypes.string
    side: React.PropTypes.string
    tooltip: React.PropTypes.string
    onSelectItem: React.PropTypes.func.isRequired
    children: React.PropTypes.node.isRequired
    tabIndex: React.PropTypes.number


  getInitialState: ->
    open: false


  componentClickAway: ->
    @setState(open: false)


  render: (other) ->
    <div className={@componentClasses()}>
      <IconButton
        {...other}
        className={@c "icon"} 
        onClick={@onButtonClick}
        iconType={@props.iconType}
        tooltip={@props.tooltip}
        type={@props.type}
        tabIndex={@props.tabIndex}
      ></IconButton>
      <Menu className={@c "menu"}
        onSelectItem={@onSelectItem}
        open={@state.open}
        side={@props.side}
      >
        {@props.children}
      </Menu>
    </div>


  onSelectItem: (value) ->
    @setState(open: false)
    @props.onSelectItem(value)


  onButtonClick: ->
    delay 50, => @setState(open: !@state.open)
