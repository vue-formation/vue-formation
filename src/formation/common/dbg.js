/* eslint-disable */
export default function dbg () {
  return console.log.apply(console, [...arguments])
}
