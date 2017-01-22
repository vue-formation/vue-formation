/* eslint-disable */
import isFunction from './dash.isFunction'
import isString from './dash.isString'
import isHash from './dash.isHash'
import forEach from './dash.forEach'

function offHandler (el, event, handler) {
  if (el.addEventListener) {
    el.addEventListener(event, handler, false)
    return () => el.removeEventListener(event, handler, false)
  } else if (el.attachEvent) {
    el.attachEvent(event, handler)
    return () => el.detachEvent(event, handler)
  }
  return () => false
}

function addEvents (one, events, selector, data, fn) {
  if (!isString(selector)) {
    fn = data
    data = selector
    selector = undefined
  }
  if (!isFunction(fn) && isFunction(data)) {
    fn  = data
    data = undefined
  }
  if (!fn) fn = () => false

  let base = selector ? this.find(selector) : this
  let uuid = base.$root.uuid()

  base.each(function (i, el) {
    let handler = (event) => {
      let e = new base.$root.Event(event, data, uuid)
      fn.call(el, e)
      if (one) base.off(e)
    }
    let prefix = !el.addEventListener ? 'on' : ''

    forEach(events.split(/\s+/g), (event) => {
      let [ evt, ns ] = event.split(/\.(.+)?/)
      event = evt
      let off = offHandler(el, `${prefix}${evt}`, handler)
      base.$root.event.active.push({ el, event, ns, handler, off, uuid })
    })
  })
}

let onEvent = function (one, events, selector, data, fn) {
  if (isHash(events)) forEach(events, (h, e) => addEvents.call(this, one, e, selector, data, h))
  else if (isString(events)) addEvents.call(this, one, events, selector, data, fn)
  return this
}

onEvent._chainable = false
onEvent._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.isHash',
  'dash.forEach',
  'query.each',
  'query.find'
]

export default onEvent
