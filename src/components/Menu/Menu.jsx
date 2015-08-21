import './Menu.less'
import React, {Component, DOM, PropTypes} from "react"
import ReactDOM from 'react-dom'
import RenderInBody from 'react-render-in-body'
import {base, baseControl, bound} from '../../util/decorators'
import {delay} from '../../util/functions'
import {withoutTransition} from '../../util/DOMUtil'
import {incrementalSize} from '../../util/KeyLine'
import Paper from '../Paper/Paper'
import SelectRipple from "../SelectRipple/SelectRipple"


// Google seems to use an 8px gutter regardless of device size. After playing
// around a little, I'd say they're right.
const GUTTER = 8


@base()
export class MenuDivider extends Component {
  render() {
    return <div {...this.base()} />
  }
}


@baseControl()
export class MenuItem extends Component {
  static propTypes = {
    label: PropTypes.string,
    value: PropTypes.any.isRequired,
  }

  static contextTypes = {
    onSelectItem: PropTypes.func.isRequired,
    value: PropTypes.any,
  }


  controlPrimaryAction(e) {
    this.context.onSelectItem(this.props.value)
  }


  render() {
    const classes = {
      active: this.props.value === this.context.value,
    }

    return (
      <div {...this.base({classes})}>
        <SelectRipple type="highlight" control={this.control} />
        <span className={this.c("label")}>{this.props.label || this.props.value}</span>
      </div>
    )
  }
}


@base()
class MenuPopup extends Component {
  static propTypes = {
    onSelectItem: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    side: PropTypes.oneOf(["left", "right"]),
    children: PropTypes.node.isRequired,
    value: PropTypes.any,
  }

  static defaultProps = {
    side: "left",
  }

  static childContextTypes = {
    onSelectItem: PropTypes.func.isRequired,
    value: PropTypes.any,
  }


  getChildContext() {
    return {
      onSelectItem: this.onSelectItem,
      value: this.props.value,
    }
  }


  componentDidMount() {
    if (this.props.open) {
      this.updatePosition(this.props.rect)
    }
  }


  componentWillReceiveProps(newProps) {
    if (newProps.open && !this.props.open) {
      this.updatePosition(newProps.rect)
    }
  }


  @bound
  onSelectItem(value) {
    delay(50, () => this.props.onSelectItem(value))
  }

  
  updatePosition(rect) {
    if (!rect) return

    const {top, left, width} = rect
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
      }

      el.style.visibility = ''
    })

    // Force a relayout once transitions are disabled
    el.offsetHeight
  }


  render() {
    return (
      <Paper {...this.base({classes: {closed: !this.props.open}})}>
        <div ref="inner" className={this.c("inner")}>
          {this.props.children}
        </div>
      </Paper>
    )
  }
}


@base()
export default class Menu extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    value: PropTypes.any,
  }


  state = {}


  componentDidMount() {
    if (this.props.open) {
      this.updatePosition()
    }
  }


  componentWillReceiveProps(newProps) {
    if (newProps.open && !this.props.open) {
      this.updatePosition()
    }
  }


  updatePosition() {
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
    return (
      <RenderInBody className={this.cRoot()}>
        <div
          className={this.c({overlay: this.props.open})}
          onScroll={this.cancelEventIfOpen}
          onWheel={this.cancelEventIfOpen}
        >
          <MenuPopup {...this.props} rect={this.state.rect} />
        </div>
      </RenderInBody>
    )
  }
}
