import React, {PropTypes, DOM} from "react"
import ReactDOM from "react-dom"
import Base from "../Base"


export default class RenderInBody extends Base {
  componentDidMount() {
    this.popup = document.createElement("div")
    document.body.appendChild(this.popup)
    this._renderLayer()
  }


  componentDidUpdate() {
    this._renderLayer()
  }


  componentWillUnmount() {
    ReactDOM.unmountComponentAtNode(this.popup)
    document.body.removeChild(this.popup)
  }


  _renderLayer() {
    ReactDOM.render(this.props.children, this.popup)
  }


  render() {
    // Render a placeholder
    return <div {...this.baseProps()} />
  }
}
