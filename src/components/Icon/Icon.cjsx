React = require('react')
createNUIClass = require('../../util/createNUIClass')



module.exports = createNUIClass "Icon",

  render: ->
    if @props.type.length == 1
      <span {...@props} className={@componentClasses("letter")}>
        {@props.type}
      </span>
    else
      <span {...@props} className={@componentClasses(@props.type)} />
