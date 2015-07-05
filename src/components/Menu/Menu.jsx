import './Menu.less'
import React, {PropTypes, DOM} from "react"
import ReactDOM from "react-dom"
import Base from "../Base"
import {bound} from '../../util/decorators'
import {delay} from '../../util/functions'
import {withoutTransition} from '../../util/DOMUtil'
import {incrementalSize} from '../../util/KeyLine'
import Paper from '../Paper/Paper'
import RippleControl from '../RippleControl/RippleControl'
import RenderInBody from '../RenderInBody/RenderInBody'


// Google seems to use an 8px gutter regardless of device size. After playing
// around a little, I'd say they're right.
const GUTTER = 8


export class MenuDivider extends Base {}


export class MenuItem extends Base {
  static propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
  }

  static contextTypes = {
    onSelectItem: PropTypes.func.isRequired,
  }


  @Base.on('click')
  select() {
    this.context.onSelectItem(this.props.value)
  }


  render() {
    const contentFactory = (options, children) => {
      const className = this.c({
        'inner': true,
        'focused-inner': options.isKeyboardFocused,
      })

      return (
        <div className={className}>
          {children}
          <span className={this.c("label")}>{this.props.label}</span>
        </div>
      )
    }

    return (
      <RippleControl {...this.baseProps({classes: 'ripple'})}
        type="highlight"
        targetFactory={DOM.div}
        contentFactory={contentFactory}
      />
    )
  }
}


class MenuPopup extends Base {
  static propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(["left", "right"]),
    children: PropTypes.node.isRequired,
  }

  static defaultProps = {
    side: "left",
  }

  static childContextTypes = {
    onSelectItem: PropTypes.func.isRequired,
  }


  getChildContext() {
    return {onSelectItem: this.onSelectItem}
  }


  componentDidMount() {
    if (this.props.open) {
      this.updatePosition(this.props.rect)
    }
  }


  componentWillReceiveProps(newProps) {
    // Move the menu into place before we open it
    if (newProps.open) {
      this.updatePosition(newProps.rect)
    }
  }


  @bound
  onSelectItem(value) {
    delay(50, () => this.props.onSelectItem(value))
  }

  
  updatePosition({top, left, width}) {
    const el = ReactDOM.findDOMNode(this)

    withoutTransition(el, () => {
      const closedClass = this.c("closed")

      // Remove the style which sets the height to 0 while we measure the height
      el.style.visibility = 'hidden'
      el.classList.remove(closedClass)

      // Dimensions
      const {offsetWidth: initialWidth, offsetHeight: initialHeight} = el
      const {clientWidth: viewportWidth, clientHeight: viewportHeight} = document.documentElement

      const keylineWidth = incrementalSize(initialWidth)

      // Fix the height to make it animatable
      el.style.height = initialHeight + 'px'

      // Make the width a multiple of the increment size (according to material
      // design guidelines)
      el.style.width = keylineWidth + 'px'

      if (this.props.side == "left") {
        el.style.left = (left - keylineWidth + width)+'px'
      }
      else {
        el.style.left = left+'px'
      }

      el.style.top = top+'px'

      // If the menu overlaps the viewport, add appropriate classes
      let overlap
      if (viewportWidth - (left + keylineWidth) < GUTTER)
        overlap = "right"
      else if (viewportHeight - (top + initialHeight) < GUTTER)
        overlap = "bottom"
      else if (left < GUTTER)
        overlap = "left"
      
      if (overlap) {
        el.style[overlap] = GUTTER+'px'
      }

      if (overlap == 'right') {
        el.style.left = ''
      }

      if (!this.props.open) {
        el.classList.add(closedClass)
        el.style.visibility = ''
      }
    })

    // Force a relayout once transitions are disabled
    el.offsetHeight
  }


  render() {
    return (
      <Paper {...this.baseProps({classes: {closed: !this.props.open}})}>
        <div ref="inner" className={this.c("inner")}>
          {this.props.children}
        </div>
      </Paper>
    )
  }
}


export default class Menu extends Base {
  static propTypes = {
    open: PropTypes.bool.isRequired,
  }


  constructor(props) {
    super(props)
    this.state = {}
  }


  componentDidMount() {
    this.updatePosition(this.props, {open: false})
  }


  componentWillReceiveProps(newProps) {
    this.updatePosition(newProps, this.props)
  }


  updatePosition(newProps, oldProps) {
    this.setState({rect: ReactDOM.findDOMNode(this).getBoundingClientRect()})
  }


  @bound
  cancelEventIfOpen(e) {
    if (this.props.open) {
      e.preventDefault()
      e.stopPropagation()
    }
  }


  render() {
    const menuPopup = this.state.rect
      ? <MenuPopup {...this.props} rect={this.state.rect} />
      : DOM.div()

    return (
      <RenderInBody className={this.baseClasses()}>
        <div
          className={this.c({overlay: this.props.open})}
          onScroll={this.cancelEventIfOpen}
          onWheel={this.cancelEventIfOpen}
        >
          {menuPopup}
        </div>
      </RenderInBody>
    )
  }
}
