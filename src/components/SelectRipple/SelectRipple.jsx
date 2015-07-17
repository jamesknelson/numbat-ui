import './SelectRipple.less'
import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import {base} from "../../util/decorators"
import {offset as DOMOffset} from "../../util/DOMUtil"
import {delay} from "../../util/functions"


@base()
class SelectRippleCircle extends Component {
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
      <div {...this.base({classes})}>
        <div className={this.c("inner")} />
      </div>
    )
  }
}


@base()
export default class SelectRipple extends Component {
  static propTypes = {
    centerRipple: PropTypes.bool,
    control: PropTypes.object,
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


  componentWillReceiveProps(nextProps) {
    const {selecting: e, disabled} = nextProps.control

    if (!this.props.control.selecting && !disabled && e) {
      const ripples = this.state.ripples
      const nextKey = ripples[ripples.length-1].key + 1
      const nextRipple = ripples.find(r => !r.started)
      const el = ReactDOM.findDOMNode(this)

      nextRipple.started = true
      nextRipple.style = this.props.centerRipple ? {} : rippleStyle(el, nextProps.control.selecting)

      // Add an unstarted ripple at the end
      ripples.push({
        type: this.props.type,
        key: nextKey,
        started: false,
        ending: false,
      })

      this.setState({ripples})
    }
    else if (this.props.control.selecting && !e) {
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
  }


  render() {
    return <div className={this.cRoot()}>{rippleElements(this.state.ripples)}</div>
  }


  componentWillUnmount() {
    this.state.ripples
      .filter(r => r.ending)
      .forEach(r => clearTimeout(r.ending))
  }
}


function rippleStyle(el, {x, y}) {
  const elHeight = el.offsetHeight
  const elWidth = el.offsetWidth
  const offset = DOMOffset(el)
  const pointerX = x - offset.left
  const pointerY = y - offset.top
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
    <SelectRippleCircle
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
