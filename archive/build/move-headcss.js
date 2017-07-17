let fs = require('fs')
let path = require('path')

var index = path.resolve(__dirname, '../dist/index.html')

fs.readFile(index, 'utf8', function (err, data) {
  if (err) return console.log(err)
  var newIndex = data.replace(/\<head-css v-ref\:headcss\>\<\/head-css\>/, '')
    .replace(/\<\/head\>/, '<head-css v-ref:headcss></head-css></head>')
  fs.writeFile(index, newIndex, function(err) {
    if (err) console.log(err)
  })
})
