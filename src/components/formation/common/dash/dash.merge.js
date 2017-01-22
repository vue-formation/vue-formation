/* eslint-disable */
// import isArray from './isArray'
import isHash from './dash.isHash'
// import isDate from './isDate'
import forEach from './dash.forEach'
import includes from './dash.includes'
// import clone from './clone'

// modified from http://stackoverflow.com/questions/27936772/how-to-deep-merge-instead-of-shallow-merge
function mergeDeep(target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  if (isHash(target) && isHash(source)) {
    for (const key in source) {
      if (isHash(source[key])) {
        if (!target[key]) Object.assign(target, { [key]: {} })
        mergeDeep(target[key], source[key], seen.slice())
      } else {
        Object.assign(target, { [key]: source[key] })
      }
    }
  }
  return target
}

/*
function _arrayMerge (target, source, seen) {
  forEach(source, (val, i) => {
    if (isArray(val) && !isArray(target[i])) target[i] = val
    else if (target[i] !== undefined) _merge(target[i], val, clone(seen))
    else target.push(val)
  })
}

function _merge (target, source, seen = []) {
  if (includes(seen, source) || includes(seen, source)) return target
  seen = seen.concat([target, source])

  forEach(source, (s, k) => {
    let t = target[k]
    if (t === undefined && isHash(s)) target[k] = _merge({}, s, clone(seen))
    else if (isHash(t) && isHash(s)) target[k] = _merge(t, s, clone(seen))
    else if (isArray(s) && !isArray(t)) target[k] = s
    else if (isArray(s)) forEach(s, (val, i) => _arrayMerge(t, s, seen))
    else if (isDate(s)) target[k] = new Date(s)
    else target[k] = s
  })
  return target
}
*/

let merge = function () {
  let args = [ ...arguments ]

  if (args.length === 0) return {}
  else if (args.length === 1) return args[0]
  else if (!isHash(args[0])) return {}

  let target = args[0]
  let sources = args.slice(1)

  forEach(sources, (source) => {
    if (isHash(source)) mergeDeep(target, source)
  })
  return target
}

merge._accepts = [Object]
merge._dependencies = [
  'dash.isHash',
  'dash.forEach',
  'dash.includes'
]

export default merge
