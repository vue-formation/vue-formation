/* eslint-disable */
import mapWith from './dash.mapWith'
import isObject from './dash.isObject'

let mapNodes = function (element, selector) {
  return mapWith(element.querySelectorAll(selector), (v) => isObject(v) ? v : undefined)
}

mapNodes._chainable = false
mapNodes._dependencies = [
  'dash.mapWith',
  'dash.isObject'
]

export default mapNodes
