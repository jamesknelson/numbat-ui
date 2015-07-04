function testSupportedProps(props) {
  const el = document.createElement('div')

  for (let [key, value] of Object.entries(props)) {
    if (el.style[key] != undefined) {
      return value
    }
  }
}


function once(el, eventName, callback) {
  handler = () => {
    callback()
    el.removeEventListener(eventName, handler)
  }

  el.addEventListener(eventName, handler)
}


// Returns the correct event name to use
export function transitionEndEventName() {
  return testSupportedProps({
    'transition':'transitionend',
    'OTransition':'otransitionend',
    'MozTransition':'transitionend',
    'WebkitTransition':'webkitTransitionEnd',
  })
}


export function animationEndEventName() {
  return testSupportedProps({
    'animation': 'animationend',
    '-o-animation': 'oAnimationEnd',
    '-moz-animation': 'animationend',
    '-webkit-animation': 'webkitAnimationEnd',
  })
}


export function onTransitionEnd(el, callback) {
  return once(el, transitionEndEventName(), callback)
}


export function onAnimationEnd(el, callback) {
  return once(el, animationEndEventName(), callback)
}
