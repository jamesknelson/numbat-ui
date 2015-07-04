React = require('react')
createNUIClass = require('../../util/createNUIClass')
CaptureTouch = require('../../mixins/CaptureTouch')
Icon = require('../Icon/Icon')
Paper = require('../Paper/Paper')
RippleControl = require('../RippleControl/RippleControl')



module.exports = createNUIClass "FloatingActionButton",

  mixins: [
    CaptureTouch
  ]

  propTypes:
    iconType: React.PropTypes.string.isRequired
    size: React.PropTypes.oneOf(['default', 'mini'])
    targetFactory: React.PropTypes.func
    type: React.PropTypes.oneOf(['primary', 'accent'])


  getDefaultProps: ->
    type: "accent"
    size: "default"
    targetFactory: React.DOM.a


  render: (other) ->
    # The content factory which produces the button content's structure is the
    # same across all rounded buttons. It is passed an `isKeyboardFocussed`
    # option by the button's RippleControl element.
    contentFactory = (options, children) =>
      className = @c "#{@props.type}-inner",
        'inner': true
        'mini-inner': @props.size == "mini"
        'disabled-inner': @props.disabled
        'focused-inner': options.isKeyboardFocused

      <div className={className}>
        {children}
        <Icon type={@props.iconType} />
      </div>


    # The target factory produces content which should be outside of the
    # displayed bounds, including padding, targets, etc. 
    targetFactory = (options, children) =>
      zIndex = switch
        when @props.disabled then 0
        when @state.touched then 3
        else 2

      classes =
        'container': true
        'mini-container': @props.size == "mini"

      @props.targetFactory(
        Object.assign(options, className: @c(classes))
        <Paper zDepth={zIndex} shape="circle">{children}</Paper>
      )

    <RippleControl
      {...other}
      {...@managedCallbacks}
      className={@componentClasses()}
      type={@props.type}
      targetFactory={targetFactory}
      contentFactory={contentFactory}
      centerRipple={true}
    />