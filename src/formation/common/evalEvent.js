import * as _ from '../utils/litedash/dash'

export const KEYMAP = {
  enter: ['Enter', 13],
  tab: ['Tab', 9],
  delete: ['Delete', 'Backspace', 8, 46],
  escape: ['Escape', 27],
  space: ['Space', 32],
  up: ['ArrowUp', 38],
  down: ['ArrowDown', 40],
  left: ['ArrowLeft', 37],
  right: ['ArrowRight', 39],
  ctrl: ['Control', 'ControlLeft', 'ControlRight', 17],
  alt: ['Alt', 'AltLeft', 'AltRight', 18],
  shift: ['Shift', 'ShiftLeft', 'ShiftRight', 16],
  meta: ['Meta', 'MetaLeft', 'MetaRight']
}

function isKey (e, key) {
  return _.includes(KEYMAP[key], e.key || e.code || e.keyCode || e.which)
}

export default function evalEvent (event, vm) {
  if (_.isFunction(event)) return (e) => event.bind(vm)(e, vm.config, vm.value)
  if (!_.isObject(event)) return () => false

  let { handler, modifiers } = event
  handler = _.isFunction(handler)
    ? handler
    : () => false

  modifiers = _.isArray(modifiers)
    ? modifiers
    : []

  return function (e) {
    let keys = []
    let modKeys = _.without(modifiers, 'stop', 'prevent', 'capture', 'self', 'once')
    let config = vm.config
    let value = vm.value

    _.forEach(modifiers, (mod) => {
      switch (mod) {
        case 'stop':
          e.stopPropagation()
          break
        case 'prevent':
          e.preventDefault()
          break
        case 'self':
          if (e.target !== vm.$el) return false
          break
        default:
          // get combo modifier keys
          if (mod === 'ctrl' && (isKey(e, mod) || e.ctrlKey)) {
            keys.push(mod)
          }
          if (mod === 'alt' && (isKey(e, mod) || e.altKey)) {
            keys.push(mod)
          }
          if (mod === 'shift' && (isKey(e, mod) || e.shiftKey)) {
            keys.push(mod)
          }
          if (mod === 'meta' && (isKey(e, mod) || e.metaKey)) {
            keys.push(mod)
          }

          // get keycode number keys
          if (_.isNumber(mod) && (e.keyCode === mod || e.which === mod)) {
            keys.push(mod)
          }

          // get keymap keys or strings
          if (_.has(KEYMAP, mod)) {
            if (isKey(e, mod)) {
              keys.push(mod)
            }
          } else if (_.isString(mod) && (e.key === mod || e.code === mod)) {
            keys.push(mod)
          }
          break
      }
    })

    // check that the correct key combo was entered
    if (modKeys.length && _.intersection(modKeys, keys).length !== modKeys.length) return false

    // call the original handler with hte
    handler.apply(vm, [e, config, value])
  }
}
