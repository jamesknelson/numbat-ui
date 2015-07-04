React = require('react')
createNUIClass = require('../../util/createNUIClass')
mediaQueries = require('../../util/mediaQueries')
CardLayout = require('../CardLayout/CardLayout')



module.exports = createNUIClass "CardManager",
  
  propTypes:
    add: React.PropTypes.node


  render: ->
    close = if @state.mediaType == "sm"
      <div className={@c "close"}>
        <Icon type="close">
      </div>

    <div className={@componentClasses()}>
      
    </div>
