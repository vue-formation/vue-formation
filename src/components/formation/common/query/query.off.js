/* eslint-disable */
import isFunction from './dash.isFunction'
import isString from './dash.isString'
import isHash from './dash.isHash'
import forEach from './dash.forEach'
import union from './dash.union'
import without from './dash.without'
import map from './dash.map'

function removeEvent (store, el, event, handler, uuid) {
  let toRemove = []
  let [ evt, ns ] = event.split(/\.(.+)?/)
  forEach(store.active, (e) => {
    let isElement = e.el === el
    let isNS = e.ns === ns || !e.ns && !ns
    let isEvent = e.event === event && isNS
    let isHandler = e.handler === handler
    let foundUUID = uuid === e.uuid
    let foundEvent = isElement && (!event || (isEvent && (isHandler || !handler)))
    if (foundUUID || foundEvent) {
      toRemove.push(e)
      if (isFunction(e.off)) e.off()
    }
  })
  store.active = without.apply(this, [store.active].concat(toRemove))
}

let off = function (events, selector, handler) {
  let queue = []

  if (isFunction(selector) && !handler) {
    handler = selector
    selector = undefined
  }

  let base = selector ? this.find(selector) : this

  if (isString(events)) {
    queue = map(events.split(/\s+/g), (event) => {
      return { event, handler }
    })
  } else if (events instanceof this.$root.Event) {
    queue = [ { uuid: events.handlerId } ]
  } else if (isHash(events)) {
    forEach(events, (h, e) => {
      queue = union(queue, map(e.split(/\s+/g), (event) => {
        return { event, handler: h }
      }))
    })
  } else if (!events) {
    base.each(function () {
      removeEvent(base.$root.event, this)
    })
    return this
  }

  base.each(function () {
    forEach(queue, (q) => removeEvent(base.$root.event, this, q.event, q.handler, q.uuid))
  })

  return this
}

off._dependencies = [
  'dash.isFunction',
  'dash.isString',
  'dash.isHash',
  'dash.forEach',
  'dash.union',
  'dash.without',
  'dash.map'
]

export default off
