// CardLayout allows the entire card to scroll vertically, with overflow being
// visible.
//
// If a scrollbar is required, it starts a toolbar-height below the top, and
// ends at the bottom. Said toolbar-height space contains the buttons
// actions prop's nodes on the right, and if the close button is shown, the
// close button on the right.
//
// The header will be affixed to the top if the bottom of the header is above
// the toolbar space after scrolling.
//
// The footer will be affixed to the bottom if the bottom of the footer would
// be below the bottom of the element while scrolling.


import './CardLayout.less'
import React, {PropTypes} from 'react'
import Base from "../Base"
import Icon from "../Icon/Icon"
import Paper from "../Paper/Paper"
import ScrollBox from "../ScrollBox/ScrollBox"


export default class CardLayout extends Base {
  static propTypes = {
    actions: React.PropTypes.node.isRequired,
    header: React.PropTypes.node.isRequired,
    main: React.PropTypes.node.isRequired,
    footer: React.PropTypes.node,
  }


  render() {
    return (
      <div {...this.baseProps()}>
        <div className={this.c("actions")}>
          {this.props.actions}
        </div>
        <ScrollBox className={this.c("scrollbox")}>
          <Paper className={this.c("scollbox-inner")}>
            <div className={this.c("header")}>
              {this.props.header}
            </div>
            <div className={this.c("main")}>
              {this.props.main}
            </div>
          </Paper>
        </ScrollBox>
      </div>
    )
  }
}
