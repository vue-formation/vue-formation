import { forEach, get, ensureArray } from './utils'

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
