/* eslint-disable */
import has from './dash.has'
import isArray from './dash.isArray'
import isHash from './dash.isHash'

function stringify (obj) {
  try {
    if (isHash(obj) || isArray(obj)) return JSON.stringify(obj)
    else if (has(obj, 'toString')) return obj.toString()
    else return String(obj)
  } catch (err) {}
  return ''
}

stringify._accepts = ['ANY']
stringify._dependencies = [
  'dash.has',
  'dash.isArray',
  'dash.isHash'
]

export default stringify
