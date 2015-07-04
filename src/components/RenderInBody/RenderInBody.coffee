React = require('react')
createNUIClass = require('../../util/createNUIClass')



RenderInBody = createNUIClass "RenderInBody",

  componentDidMount: ->
    @popup = document.createElement("div")
    document.body.appendChild(@popup)
    @_renderLayer()


  componentDidUpdate: ->
    @_renderLayer()


  componentWillUnmount: ->
    React.unmountComponentAtNode(@popup)
    document.body.removeChild(@popup)


  _renderLayer: ->
    React.render(@props.children, @popup)


  render: ->
    # Render a placeholder
    React.DOM.div(className: @componentClasses())



module.exports = RenderInBody