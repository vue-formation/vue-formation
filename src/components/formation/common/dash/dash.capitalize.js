/* eslint-disable */
import isString from './dash.isString'

let capitalize = function (str) {
  return isString(str) && str.length ? `${str.charAt(0).toUpperCase()}${str.slice(1).toLowerCase()}` : str
}

capitalize._accepts = [String]

export default capitalize
