/* eslint-disable */
import forEach from './dash.forEach'

let each = function (fn) {
  forEach(this.slice(0, this.length), (v, k) => fn.bind(v)(k, v))
}

each._baseutil = true

export default each
