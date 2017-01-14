import Vue from 'vue'

export function isString (obj) {
  return typeof obj === 'string'
}

export function isNumber (obj) {
  return typeof obj === 'number'
}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function toPath (pathString) {
  // taken from lodash - https://github.com/lodash/lodash
  let pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)]|(?=(\.|\[])(?:\4|$))/g
  let pathArray = []

  if (isString(pathString)) {
    pathString.replace(pathRx, function (match, number, quote, string) {
      pathArray.push(quote ? string : (number !== undefined) ? Number(number) : match)
      return pathArray[pathArray.length - 1]
    })
  }
  return pathArray
}

export function vueSet (obj, path, val) {
  let value = obj
  let fields = isArray(path) ? path : toPath(path)
  for (let f in fields) {
    let idx = Number(f)
    let p = fields[idx]
    if (idx === fields.length - 1) Vue.set(value, p, val)
    else if (!value[p]) Vue.set(value, p, isNumber(p) ? [] : {})
    value = value[p]
  }
}

export default {
  isString,
  isArray,
  isNumber,
  toPath,
  vueSet
}
