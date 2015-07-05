// Display a menu component and a view component, splitting the screen between
// the two on larger screens, or using a floating menu on smaller screens.
// 
// The `menuOpen` prop decides whether the menu is open or not. If not
// specified, it will default to open on screens large enough to split, or
// closed on smaller screens.
// 
// The parent component should implement `onToggleMenuOpen` in such a way that
// `menuOpen` is toggled when called. The parent component may also change
// `menuOpen` at other times.

import './StandardLayout.less'
import React, {PropTypes} from 'react'
import CSSTransitionGroup from 'react-addons-css-transition-group'
import {bound} from "../../util/decorators"
import {lg, mg, sm} from '../../util/MediaQueries'
import Base from "../Base"


export default class StandardLayout extends Base {
  static propTypes = {
    menu: React.PropTypes.node.isRequired,
    view: React.PropTypes.node.isRequired,
    menuOpen: React.PropTypes.bool,
    onChangeMenuOpen: React.PropTypes.func.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {viewCount: 1}
  }


  get splittable() {
    return lg.matches
  }


  @bound
  onLgMediaQueryChange({matches}) {
    // Show/hide menu when resizing to/from a large window
    if ((matches && !this.props.menuOpen) || (!matches && this.props.menuOpen)) {
      this.props.onChangeMenuOpen(!this.props.menuOpen)
    }
  }


  @bound
  onViewContainerClick() {
    // Hide the menu on small screens when a click is made
    if (this.props.menuOpen && !this.splittable) {
      this.props.onChangeMenuOpen(false) 
    }
  }


  componentWillReceiveProps(nextProps) {
    // Update the view count when view's type changes to trigger a transition
    if (nextProps.view.type != this.props.view.type) {
      this.setState({viewCount: this.state.viewCount + 1})
    }
  }


  componentDidMount() {
    this.refs.base.addEventListener("click", this.onViewContainerClick, true)
    lg.addListener(this.onLgMediaQueryChange)

    // Run once on mount to set the menu state based on the screen size
    this.onLgMediaQueryChange(lg)
  }


  componentWillUnmount() {
    this.refs.base.removeEventListener("click", this.onViewContainerClick)
    lg.removeListener(this.onLgMediaQueryChange)
  }


  render() {
    const classes = {
      'menu-open': this.props.menuOpen
    }

    return (
      <div {...this.baseProps({classes})}>
        <div className={this.c("menu")}>{this.props.menu}</div>
        <CSSTransitionGroup
          transitionName={this.c("navigation")}
          className={this.c("view-container")}>
          <div className={this.c("view")} key={this.state.viewCount}>{this.props.view}</div>
        </CSSTransitionGroup>
      </div>
    )
  }
}
