React = require('react')
createNUIClass = require('../../util/createNUIClass')



module.exports = createNUIClass "Tooltip",

  propTypes:
    label: React.PropTypes.string.isRequired
    show: React.PropTypes.bool


  componentDidMount: ->
    @_setRippleSize()


  componentDidUpdate: ->
    @_setRippleSize()


  render: (other) ->
    <div {...other} className={@componentClasses()}>
      <div ref="inner" className={@c('inner', 'is-shown': @props.show)}>
        <div ref="ripple" className={@c "ripple"} />
        <span className={@c "label"}>{@props.label}</span>
      </div>
    </div>


  _setRippleSize: ->
    ripple = @refs.ripple.getDOMNode()
    tooltipSize = @refs.inner.getDOMNode().offsetWidth
    # TODO: how to automatically detect this?
    ripplePadding = 20
    rippleSize = tooltipSize + ripplePadding + 'px'

    if @props.show
      ripple.style.height = rippleSize
      ripple.style.width = rippleSize
    else 
      ripple.style.width = '0px'
      ripple.style.height = '0px'
