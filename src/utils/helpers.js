import { forEach, get, ensureArray, map, without, isString } from './utils'

/* From Modernizr */
function whichTransitionEvent () {
  let el = document.createElement('fakeelement')
  let transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }

  for (let t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}

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
    removeEvent(element, event, fn)
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
  if (!element) return
  let classList = Array.isArray(className) ? className : className.split(/\s+/)
  forEach(classList, (c) => { element.classList.add(c) })
}

export function removeClass (element, className) {
  if (!element) return
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

export function appendTo (element, selector) {
  let parent = new Helper(selector)
  if (parent.el.length) parent.el[0].appendChild(element)
}

export function append (element, appendee) {
  let child = new Helper(appendee)
  if (child.el.length) element.appendChild(child.el[0])
}

export function css (elements, prop, value) {
  if (value === undefined && isString(prop)) {
    let val = elements[0].style[prop]
    if (prop.match(/^padding|Width$|Height$|^margin/)) return val ? pxToInt(val) : 0
    return prop
  }

  forEach(elements, (element) => {
    if (value !== undefined && isString(prop)) {
      element.style[prop] = value
    }
  })
}

export function hasScroll (element) {
  return {
    vertical: element.scrollHeight > element.clientHeight,
    horizontal: element.scrollWidth > element.clientWidth
  }
}

export function remove (elements, selector) {
  if (!elements.length) return
  if (!selector) {
    try {
      if (elements.length && elements[0].parentNode) elements[0].parentNode.removeChild(elements[0])
    } catch (err) {
      console.error(err)
    }
  } else {
    forEach(elements, (element) => {
      let children = (new Helper(element)).find(selector)
      try {
        children.each((child) => {
          element.removeChild(child)
        })
      } catch (err) {
      }
    })
  }
}

export class Helper {
  constructor (selector) {
    this.el = []
    if (!selector) this.el = []
    else if (selector instanceof Helper) this.el = selector.el
    else if (typeof selector === 'string') this.el = mapNodes(document, selector)
    else if (Array.isArray(selector)) this.el = selector
    else this.el[0] = selector
  }
  ready (callback, returnRemove) {
    let removeFn = onReady(this.el[0], callback)
    return returnRemove ? removeFn : this
  }
  on (event, callback, useCapture, returnRemove) {
    if (event === 'transitionend') event = whichTransitionEvent()
    let removeFn = event ? onEvent(this.el[0], event, callback, useCapture) : this
    return returnRemove ? removeFn : this
  }
  once (event, callback, useCapture, returnRemove) {
    if (event === 'transitionend') event = whichTransitionEvent()
    let removeFn = event ? onceEvent(this.el[0], event, callback, useCapture) : this
    return returnRemove ? removeFn : this
  }
  click (callback, useCapture, returnRemove) {
    let removeFn = onEvent(this.el[0], 'click', callback, useCapture)
    return returnRemove ? removeFn : this
  }
  append (selector) {
    append(this.el[0], selector)
    return this
  }
  appendTo (selector) {
    appendTo(this.el[0], selector)
    return this
  }
  addClass (clazz) {
    return this.each((el) => { addClass(el, clazz) })
  }
  css (prop, value) {
    let v = css(this.el, prop, value)
    return value !== undefined ? this : v
  }
  hasScroll (position) {
    let _hasScroll = hasScroll(this.el[0])
    if (position === 'vertical' || position === 'horizontal') return _hasScroll[position]
    return _hasScroll.vertical || _hasScroll.horizontal
  }
  removeClass (clazz) {
    return this.each((el) => { removeClass(el, clazz) })
  }
  toggleClass (clazz, force) {
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
  remove (selector) {
    remove(this.el, selector)
    return selector ? this : undefined
  }
}

export default function (selector) {
  return new Helper(selector)
}
