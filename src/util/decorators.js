import {mergeFunctions} from './functions'


export function bound(target, name, descriptor) {
  const { value } = descriptor

  return {
    configurable: true,
    get() {
      const boundValue = value.bind(this)
      Object.defineProperty(this, name, {
        value: boundValue,
        configurable: true,
        writable: true,
      })
      return boundValue
    }
  }
}


export function onWindow(callbackProps) {
  const callbacks = Symbol()
  
  return function(constructor) {
    mergeFunctions(constructor.prototype, {
      componentDidMount() {
        if (!this[callbacks]) {
          this[callbacks] =
            new Map(
              Object
                .entries(callbackProps)
                .map(([event, callbackProp]) => [event, this[callbackProp].bind(this)])
            )
        }

        for (let [event, boundFn] of this[callbacks]) {
          window.addEventListener(event, boundFn)
        }
      },

      componentWillUnmount() {
        for (let [event, boundFn] of this[callbacks]) {
          window.removeEventListener(event, boundFn)
        }
      },
    })
  }
}
