/* eslint-disable */
import isFunction from './dash.isFunction'

let isPromise = function (obj) {
  return obj && isFunction(obj.then) && isFunction(obj.catch)
}

isPromise._accepts = ['ANY']

export default isPromise
