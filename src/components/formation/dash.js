export function includes () {

}

export function isArray (obj) {
  return Array.isArray(obj)
}

export function isBoolean (obj) {
  return typeof obj === 'boolean'
}

export function isDate (obj) {
  return obj instanceof Date
}

export function isEmpty (obj) {
  return obj === null
    || obj === undefined
    || obj === ''
    || (Array.isArray(obj) && !obj.length)
    || (typeof obj === 'object' && !Object.keys(obj).length)
}

export function isError (obj) {
  return obj instanceof Error
}

export function isHash (obj) {
  return typeof obj === 'object'
    && !Array.isArray(obj)
    && !(obj instanceof Date)
    && !(obj instanceof Error)
    && obj !== null
}

export function isNumber (obj) {
  return typeof obj === 'number'
}

export function isObject (obj) {
  return typeof obj === 'object'
}

export function isString (obj) {
  return typeof obj === 'string'
}

export function forEach (obj, fn) {
  try {
    if (Array.isArray(obj)) {
      let idx = 0
      for (let val of obj) {
        if (fn(val, idx) === false) break
        idx++
      }
    } else {
      for (const key in obj) {
        if (fn(obj[key], key) === false) break
      }
    }
  } catch (error) {
    return true
  }
}
