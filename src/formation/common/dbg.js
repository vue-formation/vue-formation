/* eslint-disable */
export default function dbg () {
  let args = [...arguments]
  if (args.length) {
    let msg = ['[vue-formation]:'].concat(args)
    return args[0] instanceof Error
      ? console.warn.apply(console, msg)
      : console.log.apply(console, msg)
  }
}
