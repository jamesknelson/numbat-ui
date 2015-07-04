React = require('react')
createNUIClass = require('../../util/createNUIClass')
FloatingActionButton = require('../FloatingActionButton/FloatingActionButton')



module.exports = createNUIClass "FloatingActionButtonExpander",

  propTypes:
    iconType: React.PropTypes.string.isRequired
    type: React.PropTypes.oneOf(['primary', 'accent'])
    children: React.PropTypes.node.isRequired


  getDefaultProps: ->
    type: "accent"


  getInitialState: ->
    open: false


  open: ->
    @setState(open: true)
    window.addEventListener "keydown", @close, true
    window.addEventListener "click", @close, true
    window.addEventListener "touchend", @close, true


  close: ->
    @setState(open: false)
    window.removeEventListener "keydown", @close, true
    window.removeEventListener "click", @close, true
    window.removeEventListener "touchend", @close, true


  onClick: ->
    if @state.open
      @close()
    else
      @open()


  componentWillUnmount: ->
    # Make sure to remove any event listeners
    @close() if @state.open
    

  render: (other) ->
    wrappedButtons = @props.children.map (action, i) =>
      <div className={@c "button-wrapper"} key={i}>
        {action}
      </div>

    <div className={@componentClasses(open: @state.open)}>
      <FloatingActionButton
        className={@c "toggle"}
        type={@props.type}
        iconType={@props.iconType} 
        onClick={@onClick}
      />
      <div className={@c "expanded"}>
        {wrappedButtons}
      </div>
    </div>
