import React, {PropTypes} from "react"
import ReactDOM from "react-dom"
import IScroll from '../../vendor/iscroll'
import Base from "../Base"


export default class ScrollBox extends Base {
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
      <div {...this.baseProps()}>
        {this.props.children}
      </div>
    )
  }
}
