/* eslint-disable */
let isObject = function (obj) {
  return typeof obj === 'object' && obj !== null
}

isObject._accepts = ['ANY']

export default isObject
