/* eslint-disable */
import onEvent from './query.onEvent'

let one = function (events, selector, data, fn) {
  onEvent.call(this, true, events, selector, data, fn)
  return this
}


export default one
