/* eslint-disable */
import isFunction from './dash.isFunction'

function isPromise (obj) {
  return obj instanceof Promise || (obj && isFunction(obj.then) && isFunction(obj.catch))
}

isPromise._accepts = ['ANY']

export default isPromise
