import { forEach, get } from './utils'

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

export function on (element, event, callback, useCapture) {
  element.addEventListener(event, callback, useCapture)
}

export function ready (element, callback) {
  let fn = function (event) {
    callback(event)
    element.removeEventListener('DOMContentLoaded', this)
  }
  element.addEventListener('DOMContentLoaded', fn)
}
