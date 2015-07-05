import './IconButton.less'
import React, {PropTypes, DOM} from 'react'
import Base from '../Base'
import Icon from '../Icon/Icon'
import RippleControl from '../RippleControl/RippleControl'
import Tooltip from '../Tooltip/Tooltip'


const RippleControlTypeMap = {
  'light': "highlight",
  'light-primary': "highlight-primary",
  'light-accent': "highlight-accent",
  'dark': "highlight",
  'dark-primary': "highlight-primary",
  'dark-accent': "highlight-accent",
}


export default class IconButton extends Base {
  static propTypes = {
    iconType: PropTypes.string.isRequired,
    targetFactory: PropTypes.func,
    tooltip: PropTypes.string,
    type: PropTypes.oneOf([
      'light', 'light-primary', 'light-accent',
      'dark', 'dark-primary', 'dark-accent',
    ]),
  }

  static defaultProps = {
    targetFactory: DOM.button,
    type: "light",
  }


  constructor(props) {
    super(props)
    this.state = {tooltipShown: false}
  }


  @Base.on('focus', 'mouseEnter')
  showTooltip() {
    if (!this.props.disabled) {
      this.setState({tooltipShown: true})
    }
  }

  @Base.on('blur')
  hideTooltip() {
    this.setState({tooltipShown: false})
  }

  @Base.on('mouseLeave')
  hideTooltipUnlessFocussed() {
    if (!this.refs.rippleControl.keyboardFocused) {
      this.setState({tooltipShown: false})
    } 
  }


  render() {
    const tooltip = this.props.tooltip &&
      <Tooltip
        ref="tooltip"
        className={this.c("tooltip")}
        label={this.props.tooltip}
        show={this.state.tooltipShown}
      />


    // The content factory which produces the button content's structure is the
    // same across all rounded buttons. It is passed an `isKeyboardFocussed`
    // option by the button's RippleControl element.
    const contentFactory = (options, children) => {
      const className = this.c({
        [`${this.props.type}-inner`]: true,
        'inner': true,
        'disabled-inner': this.props.disabled,
        'focused-inner': options.isKeyboardFocused,
      })

      return (
        <div className={className}>
          {children}
          <Icon type={this.props.iconType} />
        </div>
      )
    }

    // The target factory produces content which should be outside of the
    // displayed bounds, including padding, targets, etc. 
    const targetFactory = (options, children) => this.props.targetFactory(
      Object.assign(options, {className: this.c('container'), ref: "target"}),
      children,
      tooltip
    )

    return (
      <RippleControl {...this.baseProps()}
        ref="rippleControl"
        type={RippleControlTypeMap[this.props.type]}
        targetFactory={targetFactory}
        contentFactory={contentFactory}
        centerRipple={true}
      />
    )
  }
}
