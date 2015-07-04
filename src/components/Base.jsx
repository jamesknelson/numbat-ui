import React, {Component, PropTypes} from "react"
import classNames from "classnames"
import {capitalize, except} from "../util/functions"


const propFns = Symbol()
const callbacks = Symbol()


export default class Base extends Component {
  // Create a wrapper callback for each of the passed in events which calls this
  // function after calling any passed in props for the same event, then register
  // this function so it will be returned from `baseProps`
  static on(...events) {
    return function(prototype, _, descriptor) {
      const {value} = descriptor

      if (!prototype[propFns]) {
        prototype[propFns] = new Map
      }

      for (const event of events) {
        const name = 'on' + capitalize(event)

        if (!prototype[propFns].has(name)) {
          prototype[propFns].set(name, propFnFactory(name))
        }

        prototype[propFns].get(name)[callbacks].push(value)
      }
    }
  }


  get baseCallbacks() {
    const bound = {}
    for (let [name, unbound] of this[propFns] || []) {
      bound[name] = unbound.bind(this)
    }

    Object.defineProperty(this, name, {
      value: bound,
      configurable: true,
      writable: true,
    })

    return bound
  }


  baseClasses(classNames, ...overrideClassNames) {
    return [
      `nui-${this.constructor.name}`,
      this.c(classNames),
      this.props.className || "",
      this.c(overrideClassNames),
    ].join(' ')
  }


  baseProps({classes = {}, omitKnownPropTypes = false} = {}) {
    const passProps = omitKnownPropTypes
      ? except(this.props, Object.keys(this.constructor.propTypes || {}).concat('children'))
      : Object.assign({}, this.props)

    return Object.assign(
      passProps,
      this.baseCallbacks,
      {className: classes === false ? '' : this.baseClasses(classes),
       ref: 'base'}
    )
  }


  c(...args) {
    return (
      classNames(...args)
        .split(/\s+/)
        .filter(name => name !== "")
        .map(name => `nui-${this.constructor.name}-${name}`)
        .join(' ')
    )
  }


  render() {
    return <div {...this.baseProps({omitKnownPropTypes: true})}>{this.props.children}</div>
  }
}


function propFnFactory(name) {
  const fn = function (e, ...args) {
    if (this.props[name]) {
      this.props[name](e, ...args)
    }

    if (e.defaultPrevented) {
      return
    }

    for (const fn of fn[callbacks]) {
      fn.call(this, e, ...args)
    }
  }

  fn[callbacks] = []

  return fn
}
