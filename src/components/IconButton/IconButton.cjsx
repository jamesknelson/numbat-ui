React = require('react')
createNUIClass = require('../../util/createNUIClass')
Icon = require('../Icon/Icon')
RippleControl = require('../RippleControl/RippleControl')
Tooltip = require('../Tooltip/Tooltip')



TypeMap =
  'light': "highlight"
  'light-primary': "highlight-primary"
  'light-accent': "highlight-accent"
  'dark': "highlight"
  'dark-primary': "highlight-primary"
  'dark-accent': "highlight-accent"



module.exports = createNUIClass "IconButton",

  propTypes:
    iconType: React.PropTypes.string.isRequired
    targetFactory: React.PropTypes.func
    tooltip: React.PropTypes.string
    type: React.PropTypes.oneOf([
      'light', 'light-primary', 'light-accent'
      'dark', 'dark-primary', 'dark-accent'
    ])


  managedCallbacks: 
    onBlur:       -> @_hideTooltip()
    onFocus:      -> @_showTooltip()
    onMouseLeave: -> @_hideTooltip() if !@refs.rippleControl.isKeyboardFocused()
    onMouseEnter: -> @_showTooltip()


  getInitialState: ->
    tooltipShown: false 


  getDefaultProps: ->
    targetFactory: React.DOM.button
    type: "light"


  render: (other) ->
    tooltip = if @props.tooltip
      <Tooltip
        ref="tooltip"
        className={@c "tooltip"}
        label={@props.tooltip}
        show={@state.tooltipShown}
      ></Tooltip>


    # The content factory which produces the button content's structure is the
    # same across all rounded buttons. It is passed an `isKeyboardFocussed`
    # option by the button's RippleControl element.
    contentFactory = (options, children) =>
      className = @c "#{@props.type}-inner",
        'inner': true
        'disabled-inner': @props.disabled
        'focused-inner': options.isKeyboardFocused

      <div className={className}>
        {children}
        <Icon type={@props.iconType} />
      </div>

    # The target factory produces content which should be outside of the
    # displayed bounds, including padding, targets, etc. 
    targetFactory = (options, children) =>
      @props.targetFactory(
        Object.assign(options, className: @c('container'), ref: "target")
        children
        tooltip
      )

    <RippleControl
      {...other}
      {...@managedCallbacks}
      ref="rippleControl"
      className={@componentClasses()}
      type={TypeMap[@props.type]}
      targetFactory={targetFactory}
      contentFactory={contentFactory}
      centerRipple={true}
    ></RippleControl>


  _showTooltip: ->
    if !@props.disabled
      @setState(tooltipShown: true)


  _hideTooltip: ->
    @setState(tooltipShown: false)
