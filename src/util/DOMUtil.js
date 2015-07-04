export function isDescendant(parent, descendent) {
  let node = descendent.parentNode

  while (node != null) {
    if (node == parent) return true 
    else node = node.parentNode
  }

  return false
}


export function offset(el) {
  const rect = el.getBoundingClientRect()

  return {
    top: rect.top + document.body.scrollTop,
    left: rect.left + document.body.scrollLeft,
  }
}


export function forceRedraw(el) {
  const originalDisplay = el.style.display

  el.style.display = 'none'
  el.offsetHeight
  el.style.display = originalDisplay
}


export function withoutTransition(el, callback) {
  // turn off transition
  el.style.transition = 'none'
  
  callback()

  // force a redraw
  forceRedraw(el)

  // put the transition back
  el.style.transition = ''
}
