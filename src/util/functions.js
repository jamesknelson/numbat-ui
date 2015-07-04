export function delay(timeout, fn) {
  return setTimeout(fn, timeout)
}


export function except(source, keys) {
  if (!Array.isArray(keys)) {
    keys = Object.keys(keys)
  }

  const other = Object.assign({}, source)
  keys.forEach(key => delete other[key])
  return other
}


export function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}


export function mergeFunctions(obj, fns) {
  for (let [name, fn] of Object.entries(fns)) {
    const oldFn = obj[name]
    obj[name] = !oldFn
      ? fn
      : function(...args) {
          oldFn.apply(this, args)
          fn.apply(this, args) 
        }
  }
}
