const INCREMENT = 0.01

function calcTimeout (from, to, duration) {
  return Math.ceil(duration / (Math.abs(to - from) / INCREMENT))
}

export function fadeIn (el, options) {
  el.style.opacity = 0
  options = typeof options === 'object' ? options : {}
  let toOpacity = options.toOpacity || 1
  let ms = calcTimeout(0, toOpacity, options.duration || 200)

  let linear = () => {
    el.style.display = 'block'
    el.style.opacity = +el.style.opacity + INCREMENT

    if (+el.style.opacity < toOpacity) {
      setTimeout(linear, ms)
    }
  }
  linear()
}

export function fadeOut (el, options) {
  options = typeof options === 'object' ? options : {}
  let ms = calcTimeout(+el.style.opacity, 0, options.duration || 200)
  let linear = () => {
    el.style.opacity = +el.style.opacity - INCREMENT

    if (+el.style.opacity > 0) {
      setTimeout(linear, ms)
    } else {
      el.style.display = 'none'
    }
  }
  linear()
}

export default {
  fadeIn,
  fadeOut
}
