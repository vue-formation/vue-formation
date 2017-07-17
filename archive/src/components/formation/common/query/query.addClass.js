/* eslint-disable */
import forEach from './dash.forEach'

let addClass = function (className) {
  let classList = Array.isArray(className) ? className : className.split(/\s+/)
  this.each(function (i, el) {
    forEach(classList, (clazz) => el.classList.add(clazz))
  })
  /*
  each(this, function (i, el) {
    each(classList, function (j, clazz) {
      el.classList.add(clazz)
    })
  })
  */
}

addClass._dependencies = [
  'query.each',
  'dash.forEach'
]

export default addClass
