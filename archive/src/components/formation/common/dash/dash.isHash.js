/* eslint-disable */
import isArray from './dash.isArray'
import isDate from './dash.isDate'
import isObject from './dash.isObject'

function isHash (obj) {
  return isObject(obj) && !isArray(obj) && !isDate(obj)
}

isHash._accepts = ['ANY']
isHash._dependencies = [
  'dash.isArray',
  'dash.isDate',
  'dash.isObject'
]

export default isHash
