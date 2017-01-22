/* eslint-disable */
import isString from './dash.isString'

let toUpper = function (string) {
  return isString(string) ? string.toUpperCase() : ''
}

toUpper._accepts = [String]

export default toUpper
