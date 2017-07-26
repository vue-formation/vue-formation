import _ from '../utils/litedash/dash.index'

export default function columnWidths (columns, COL_LIMIT = 12) {
  let filledFirst = false
  let unset = 0
  let runningCount = 0
  let widths = _.map(columns, (col, idx) => {
    let remaining = (columns.length - (idx + 1))
    if (_.isNumber(col.colspan)) {
      let currentWidth = ((col.colspan + runningCount + remaining) > COL_LIMIT) ? 1 : col.colspan
      runningCount += currentWidth
      return currentWidth
    }
    unset++
    return 0
  })

  if (unset) {
    let sum = _.sum(widths)
    let defWidth = Math.floor((COL_LIMIT - sum) / unset)
    let firstWidth = defWidth + (COL_LIMIT % unset)
    _.forEach(widths, (width, i) => {
      if (!width) {
        if (!filledFirst) {
          widths[i] = firstWidth
        } else {
          widths[i] = defWidth
        }
      }
    })
  }
  return widths
}
