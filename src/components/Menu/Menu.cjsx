React = require('react')
delay = require('../../util/delay')
createNUIClass = require('../../util/createNUIClass')
CSSEvent = require('../../util/CSSEvent')
DOM = require('../../util/dom')
KeyLine = require('../../util/keyLine')
mediaQueries = require('../../util/mediaQueries')
Paper = require('../Paper/Paper')
RippleControl = require('../RippleControl/RippleControl')
RenderInBody = require('../RenderInBody/RenderInBody')



# Google seems to use an 8px gutter regardless of device size. After playing
# around a little, I'd say they're right.
GUTTER = 8


MenuDivider = createNUIClass("MenuDivider")



MenuItem = createNUIClass "MenuItem",

  propTypes:
    label: React.PropTypes.string.isRequired
    value: React.PropTypes.any.isRequired

  contextTypes:
    onSelectItem: React.PropTypes.func.isRequired


  onClick: ->
    @context.onSelectItem(@props.value)


  render: (other) ->
    contentFactory = (options, children) =>
      className = @c "inner",
        'focused-inner': options.isKeyboardFocused

      <div className={className}>
        {children}
        <span className={@c "label"}>{@props.label}</span>
      </div>

    <RippleControl
      {...other}
      className={@componentClasses("ripple")}
      onClick={@onClick}
      type="highlight"
      targetFactory={React.DOM.div}
      contentFactory={contentFactory}
    ></RippleControl>



MenuPopup = createNUIClass "MenuPopup",

  propTypes:
    onSelectItem: React.PropTypes.func.isRequired
    open: React.PropTypes.bool.isRequired
    side: React.PropTypes.oneOf(["left", "right"]) 
    children: React.PropTypes.node.isRequired


  childContextTypes:
    onSelectItem: React.PropTypes.func.isRequired


  getChildContext: ->
    onSelectItem: @_onSelectItem


  getDefaultProps: ->
    side: "left"


  componentDidMount: ->
    if @props.open
      @_updatePosition(@props.rect)


  componentWillReceiveProps: (newProps) ->
    # Move the menu into place before we open it
    if newProps.open
      @_updatePosition(newProps.rect)

  
  _updatePosition: ({top, left, width}) ->
    el = @getDOMNode()
    DOM.withoutTransition el, =>
      closedClass = @c("closed")

      # Remove the style which sets the height to 0 while we measure the height
      el.style.visibility = 'hidden'
      el.classList.remove(closedClass)

      # Dimensions
      {offsetWidth: initialWidth, offsetHeight: initialHeight} = el
      {clientWidth: viewportWidth, clientHeight: viewportHeight} = document.documentElement

      keylineWidth = KeyLine.incrementalSize(initialWidth)

      # Fix the height to make it animatable
      el.style.height = initialHeight + 'px'

      # Make the width a multiple of the increment size (according to material
      # design guidelines)
      el.style.width = keylineWidth + 'px'

      if @props.side == "left"
        el.style.left = (left-keylineWidth+width)+'px'
      else
        el.style.left = left+'px'

      el.style.top = top+'px'

      # If the menu overlaps the viewport, add appropriate classes
      overlap = switch
        when viewportWidth - (left + keylineWidth) < GUTTER then "right"
        when viewportHeight - (top + initialHeight) < GUTTER then "bottom"
        when left < GUTTER then "left"
      
      if overlap
        el.style[overlap] = GUTTER+'px'

      if overlap == 'right'
        el.style.left = '' 

      if !@props.open
        el.classList.add(closedClass)
        el.style.visibility = ''

    # Force a relayout once transitions are disabled
    el.offsetHeight


  render: ->
    <Paper className={@componentClasses(closed: !@props.open)}>
      <div ref="inner" className={@c "inner"}>
        {@props.children}
      </div>
    </Paper>
    

  _onSelectItem: (value) ->
    delay 50, => @props.onSelectItem?(value)



Menu = createNUIClass "Menu",

  getInitialState: ->
    {}


  componentDidMount: ->
    @_updatePosition(@props, open: false)


  componentWillReceiveProps: (newProps) ->
    @_updatePosition(newProps, @props)


  _updatePosition: (newProps, oldProps) ->
    @setState(rect: @getDOMNode().getBoundingClientRect())


  _cancel: (e) ->
    if @props.open
      e.preventDefault()
      e.stopPropagation()


  render: ->
    menuPopup =
      if @state.rect
        <MenuPopup {...@props} rect={@state.rect} />
      else
        React.DOM.div()

    <RenderInBody className={@componentClasses()}>
      <div className={@c overlay: @props.open} onScroll={@_cancel} onWheel={@_cancel}>
        {menuPopup}
      </div>
    </RenderInBody>



module.exports = {Menu, MenuItem, MenuDivider}