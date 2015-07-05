import './Icon.less'
import React, {PropTypes} from 'react'
import Base from '../Base'


export default class Icon extends Base {
  static propTypes = {
    type: PropTypes.string,
  }


  render() {
    return (this.props.type.length === 1
      ? <span {...this.baseProps({classes: "letter"})}>
          {this.props.type}
        </span>
      : <span {...this.baseProps({classes: this.props.type})} />
    )
  }
}
