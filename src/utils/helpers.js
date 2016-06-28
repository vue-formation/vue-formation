import { forEach, get, ensureArray, map, without } from './utils'

export function findCss (selectorText, props) {
  let css = {}
  props = Array.isArray(props) ? props : [props]
  forEach(document.styleSheets, function (sheet) {
    let rules = sheet.rules || sheet.cssRules
    forEach(rules, function (rule) {
      if (rule.selectorText.indexOf(selectorText) !== -1) {
        console.log(rule.selectorText)
        forEach(props, function (name) {
          let currentVal = get(rule, `style["${name}"]`)
          if (currentVal) css[name] = currentVal
        })
      }
    })
  })
  return css
}

export function getStyle (element, props) {
  let obj = {}
  let cs = window.getComputedStyle(element, null)
  forEach(ensureArray(props), (prop) => {
    try {
      obj[prop] = cs.getPropertyValue(prop)
    } catch (err) {}
  })
  return obj
}

export function pxToInt (px) {
  let i = Number(px.replace(/px$/i, ''))
  return !isNaN(i) ? i : 0
}

export function removeEvent (element, event, fn) {
  element.removeEventListener(event, fn)
}

export function onEvent (element, event, callback, useCapture) {
  element.addEventListener(event, callback, useCapture)
  return () => {
    removeEvent(element, event, callback)
  }
}

export function onceEvent (element, event, callback, useCapture) {
  let fn = function (event) {
    callback(event)
    removeEvent(element, event, this)
  }
  onEvent(element, event, fn, useCapture)
  return () => {
    removeEvent(element, event, fn)
  }
}

export function onReady (element, callback) {
  return onceEvent(element, 'DOMContentLoaded', callback)
}

export function addClass (element, className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/)
  forEach(classList, (c) => { element.classList.add(c) })
}

export function removeClass (element, className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/)
  forEach(classList, (c) => { element.classList.remove(c) })
}

export function toggleClass (element, className, force) {
  return element.classList.toggle(className, force)
}

export function hasClass (element, className) {
  return element.classList.contains(className)
}

export function mapNodes (element, selector) {
  return without(
    map(element.querySelectorAll(selector), (v) => {
      return typeof v === 'object' ? v : undefined
    }), undefined
  )
}

export class Helper {
  constructor (selector) {
    this.el = []
    if (selector instanceof Helper) this.el[0] = selector.el
    else if (typeof selector === 'string') this.el = mapNodes(document, selector)
    else if (Array.isArray(selector)) this.el = selector
    else this.el[0] = selector
  }
  ready (callback, returnRemove) {
    let removeFn = onReady(this.el[0], callback)
    return returnRemove ? removeFn : this
  }
  on (event, callback, useCapture, returnRemove) {
    let removeFn = onEvent(this.el[0], event, callback, useCapture)
    return returnRemove ? removeFn : this
  }
  once (event, callback, useCapture, returnRemove) {
    let removeFn = onceEvent(this.el[0], callback)
    return returnRemove ? removeFn : this
  }
  click (callback, useCapture, returnRemove) {
    let removeFn = onEvent(this.el[0], 'click', callback, useCapture)
    return returnRemove ? removeFn : this
  }
  addClass (clazz) {
    return this.each((el) => { addClass(el, clazz) })
  }
  removeClass (clazz) {
    return this.each((el) => { removeClass(el, clazz) })
  }
  toggleClazz (clazz, force) {
    return this.each((el) => { toggleClass(el, clazz, force) })
  }
  hasClass (clazz) {
    return hasClass(this.el[0], clazz)
  }
  each (callback) {
    forEach(this.el, (v, k) => { callback(v, k) })
    return this
  }
  find (selector) {
    return new Helper(mapNodes(this.el[0], selector))
  }
}

export default function (selector) {
  return new Helper(selector)
}
