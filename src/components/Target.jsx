import React, {PropTypes} from "react"
import Base from './Base'


export default class Target extends Base {
  static propTypes = {
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }


  @Base.on('mouseDown')
  activateIfLeftClick(e) {
    if (e.button === 0) this.props.on(e)
  }

  @Base.on('mouseUp', 'mouseOut', 'touchEnd')
  activate(e) {
    this.props.off(e)
  }

  @Base.on('touchStart')
  deactivate(e) {
    this.props.on(e)
  }


  render() {
    return (
      <div {...this.baseProps()}>
        {this.props.children}
      </div>
    )
  }
}
