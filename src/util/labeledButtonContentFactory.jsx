import React from 'react'


// The content factory which produces the button content's structure is the
// same across all rounded buttons. It is passed an `isKeyboardFocussed`
// option by the button's RippleControl element.
export default function labeledButtonContentFactory(options, children) {
  const buttonContent = this.props.label
    ? <span className={this.c("label")}>{this.props.label}</span>
    : this.props.children

  const className = this.c({
    [`${this.props.type}-inner`]: true,
    'inner': true,
    'disabled-inner': this.props.disabled,
    'focused-inner': options.isKeyboardFocused,
  });

  return (
    <div className={className}>
      {children}
      {buttonContent}
    </div>
  )
}
