import React, {Component, PropTypes} from "react"
import ReactDOM from "react-dom"
import IScroll from '../../vendor/iscroll'
import {base} from "../../util/decorators"


@base()
export default class ScrollBox extends Component {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this)

    setTimeout(() => {
      this.scroller = new IScroll(el, {
        scrollbars: true,
        interactiveScrollbars: true,
        //probeType: 3,
        mouseWheel: true,
      })
    })
  }


  componentDidUpdate() {
    if (this.scroller) {
      this.scroller.refresh()
    }
  }


  render() {
    return (
      <div {...this.base()}>
        {this.props.children}
      </div>
    )
  }
}
