/* eslint-disable */
import onEvent from './query.onEvent'

let on = function (events, selector, data, fn) {
  onEvent.call(this, false, events, selector, data, fn)
  return this
}


export default on
