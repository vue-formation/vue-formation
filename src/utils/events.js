export const keys {
  Escape: 27,
    Enter: 13,
    Backspace: 8,
    ArrowDown: 40,
    ArrowUp: 38,
    ArrowRight: 39
}
export function isKey (evt, key) {
  if (evt.keyCode === this.keys[key]) return true
  return false
}

export default {
  keys,
  isKey
}
