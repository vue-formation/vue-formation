/* eslint-disable */
let isDate = function (obj) {
  return obj instanceof Date
}

isDate._accepts = ['ANY']

export default isDate
