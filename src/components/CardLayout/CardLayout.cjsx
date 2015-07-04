# CardLayout allows the entire card to scroll vertically, with overflow being
# visible.
#
# If a scrollbar is required, it starts a toolbar-height below the top, and
# ends at the bottom. Said toolbar-height space contains the buttons
# actions prop's nodes on the right, and if the close button is shown, the
# close button on the right.
#
# The header will be affixed to the top if the bottom of the header is above
# the toolbar space after scrolling.
#
# The footer will be affixed to the bottom if the bottom of the footer would
# be below the bottom of the element while scrolling.


React = require('react')
createNUIClass = require('../../util/createNUIClass')
mediaQueries = require('../../util/mediaQueries')
Icon = require('../Icon/Icon')
Paper = require('../Paper/Paper')
ScrollBox = require('../ScrollBox/ScrollBox')



module.exports = createNUIClass "CardLayout",
  
  propTypes:
    actions: React.PropTypes.node.isRequired
    header: React.PropTypes.node.isRequired
    main: React.PropTypes.node.isRequired
    footer: React.PropTypes.node


  render: ->
    <div className={@componentClasses()}>
      <div className={@c "actions"}>
        {@props.actions}
      </div>
      <ScrollBox className={@c "scrollbox"}>
        <Paper className={@c "scollbox-inner"}>
          <div className={@c "header"}>
            {@props.header}
          </div>
          <div className={@c "main"}>
            {@props.main}
          </div>
        </Paper>
      </ScrollBox>
    </div>
