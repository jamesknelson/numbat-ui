import './TouchRipple.less'
import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import {offset as DOMOffset} from "../../util/DOMUtil"
import {bound} from "../../util/decorators"
import {delay} from "../../util/functions"
import Base from "../Base"
import Target from "../Target"


class RippleCircle extends Base {
  static propTypes = {
    type: PropTypes.string.isRequired,
    started: PropTypes.bool.isRequired,
    ending: PropTypes.any.isRequired,
  }


  render() {
    const classes = {
      [`is-${this.props.type}`]: true,
      "is-started": this.props.started,
      "is-ending": this.props.ending,
    }

    return (
      <div {...this.baseProps({classes})}>
        <div className={this.c("inner")} />
      </div>
    )
  }
}


export default class TouchRipple extends Base {
  static propTypes = {
    centerRipple: PropTypes.bool,
    className: PropTypes.string,
    factory: PropTypes.func.isRequired,
    type: PropTypes.oneOf([
      "primary",
      "accent",
      "highlight-primary",
      "highlight-accent",
      "highlight",
    ]),
  }


  constructor(props) {
    super(props)

    this.state = {
      ripples: [{type: props.type, key: 0, started: false, ending: false}]
    }
  }


  render() {
    const ripples = rippleElements(this.state.ripples)

    // We need our ripples' click target to take up the entire button target,
    // but the ripples should only be visible inside the botton, so return a
    // wrapper, but pass out ripples through a factory to the caller.
    return (
      <Target {...this.baseProps()}
        on={this.start}
        off={this.end}>
        {this.props.factory(null, ripples)}
      </Target>
    )
  }


  @bound
  start(e) {
    const ripples = this.state.ripples
    const nextKey = ripples[ripples.length-1].key + 1
    const nextRipple = ripples.find(r => !r.started)
    const el = ReactDOM.findDOMNode(this)

    nextRipple.started = true
    nextRipple.style = this.props.centerRipple ? {} : rippleStyle(el, e)

    // Add an unstarted ripple at the end
    ripples.push({
      type: this.props.type,
      key: nextKey,
      started: false,
      ending: false,
    })

    this.setState({ripples})
  }


  @bound
  end() {
    const ripples = this.state.ripples
    const endingRipple = ripples.find(r => r.started && !r.ending)

    if (endingRipple) {
      // Wait 2 seconds and remove the ripple from DOM
      endingRipple.ending =
        delay(2000, () => {
          ripples.shift()
          this.setState({ripples})
        })

      this.setState({ripples})
    }
  }


  componentWillUnmount() {
    this.state.ripples
      .filter(r => r.ending)
      .forEach(r => clearTimeout(r.ending))
  }
}


function rippleStyle(el, e) {
  const elHeight = el.offsetHeight
  const elWidth = el.offsetWidth
  const offset = DOMOffset(el)
  const pageX = e.pageX == undefined ? e.nativeEvent.pageX : e.pageX
  const pageY = e.pageY == undefined ? e.nativeEvent.pageY : e.pageY
  const pointerX = pageX - offset.left
  const pointerY = pageY - offset.top
  const topLeftDiag = calcDiag(pointerX, pointerY)
  const topRightDiag = calcDiag(elWidth - pointerX, pointerY)
  const botRightDiag = calcDiag(elWidth - pointerX, elHeight - pointerY)
  const botLeftDiag = calcDiag(pointerX, elHeight - pointerY)
  const rippleRadius = Math.max(topLeftDiag, topRightDiag, botRightDiag, botLeftDiag)
  const rippleSize = rippleRadius * 2
  const left = pointerX - rippleRadius
  const top = pointerY - rippleRadius

  return {
    height: rippleSize + 'px',
    width: rippleSize + 'px',
    top: top + 'px',
    left: left + 'px',
  }
}


function rippleElements(ripples) {
  return ripples.map(ripple =>
    <RippleCircle
      type={ripple.type}
      key={ripple.key}
      started={ripple.started}
      ending={ripple.ending}
      style={ripple.style}
    />
  )
}


function calcDiag(a, b) {
  return Math.sqrt((a * a) + (b * b))
}
