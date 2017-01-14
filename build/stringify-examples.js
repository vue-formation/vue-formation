import { stringify } from '../src-v0/utils/stringify'
import Examples from '../src-v0/examples'
import * as _ from '../src-v0/utils/utils'
let fs = require('fs')
let path = require('path')
let o = {}

let output = 'export default {\n'
_.forEach(Examples, (ex, id) => {
  output += `  '${id}': \`${stringify(ex.formConfig, null, '  ').replace(/'/g, '\\\'')}\`,\n`
})
output = output.replace(/,\n$/, '\n')
  .replace(/\s*function onClick\(event, modal\)/g, '(event, modal) =>')
  .replace(/\s*function onClick\(event, vm\)/g, '(event, vm) =>')
output += '}\n'

let outFile = path.resolve(__dirname, '../src/examples/example-config-strings.js')
fs.writeFile(outFile, output)
