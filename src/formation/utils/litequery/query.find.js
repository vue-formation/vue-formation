/* eslint-disable */
import mapNodes from './query.mapNodes'
import union from './dash.union'

let find = function (selector) {
  let results = []
  this.each(function () {
    results = union(results, mapNodes(this, selector))
  })
  return this.init(results, this)
}

find._terminates = true
find._dependencies = [
  'query.mapNodes',
  'query.each',
  'dash.union'
]

export default find
