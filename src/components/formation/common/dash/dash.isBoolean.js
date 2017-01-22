/* eslint-disable */
let isBoolean = function (obj) {
  return obj === true || obj === false
}

isBoolean._accepts = ['ANY']

export default isBoolean
