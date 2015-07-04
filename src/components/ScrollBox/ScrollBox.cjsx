React = require('react')
IScroll = require('../../vendor/iscroll')
createNUIClass = require('../../util/createNUIClass')



module.exports = createNUIClass "ScrollBox",

  componentDidMount: ->
    el = @getDOMNode()

    setTimeout =>
      @scroller = new IScroll el,
        scrollbars: true
        interactiveScrollbars: true
        #probeType: 3
        mouseWheel: true


  componentDidUpdate: ->
    if @scroller
      @scroller.refresh()


  render: ->
    <div className={@componentClasses()}>
      {@props.children}
    </div>
