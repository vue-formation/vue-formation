import _query from './query'
import mapNodes from './query.mapNodes'
import forEach from './dash.forEach'

let infoName = 'liteutils'
let infoVersion = '0.1.0'

let arr = []

let lQuery = function (selector, context) {
  context = context || document
  if (selector !== document) this.prevObject = context instanceof lQuery ? context : new query.fn.init(context)
  let nodes = []
  if (Array.isArray(selector)) nodes = selector
  else if (selector instanceof lQuery) nodes = selector.slice(0, nodes.length)
  else if (typeof selector === 'string') nodes = mapNodes(context, selector)
  else nodes = [ selector ]
  this.length = nodes.length
  forEach(nodes, (node, idx) => {
    this[idx] = node
  })
}

let query = function (selector, context) {
  return new query.fn.init(selector, context)
}

query.fn = {
  init: function (selector, context) {
    lQuery.prototype = query.fn
    return new lQuery(selector, context)
  }
}

query.event = {
  active: []
}

query.uuid = () => {
  return `${infoName}${Date.now()}`
}

query.Event = class Event {
  constructor (event, data, uuid) {
    forEach(event, (v, k) => {
      if (!k.match(/^[A-Z_]*$/)) this[k] = v
    })
    this.originalEvent = event
    this.handlerId = uuid
    if (data) this.data = data
  }
}

forEach(_query, (fn, name) => {
  if (fn._baseutil === true) query[name] = fn
  if (fn._chainable !== false) query.fn[name] = fn
})

// extend array and iterator properties
query.fn.splice = arr.splice
query.fn.slice = arr.slice
query.fn.sort = arr.sort
query.fn.push = arr.push
query.fn.length = 0
query.fn[infoName] = infoVersion
query.fn.$root = query

query.fn[Symbol.iterator] = function values () {
  let nextIndex = 0
  return {
    next: () => nextIndex < this.length ? { value: this[nextIndex++], done: false } : { done: true }
  }
}

export default query
