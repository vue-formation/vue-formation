/* eslint-disable */
import isString from './dash.isString'

function toUpper (string) {
  return isString(string) ? string.toUpperCase() : ''
}

toUpper._accepts = [String]

export default toUpper
