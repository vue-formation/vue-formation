import * as _ from '../utils/utils'

export default {
  methods: {
    typeLinks (obj) {
      if (_.isString(obj)) obj = obj.split('|')
      else if (!_.isArray(obj)) obj = [obj]
      let links = _.map(obj, (o) => {
        if (_.isString(o)) return `<a href="${_.get(this.native, o, '')}"><code>${o.trim()}</code></a>`
        else return `<a href="${o.link || _.get(this.native, o.name, '')}"><code>${o.name}</code></a>`
      })
      return links.join(' | ')
    }
  },
  data () {
    return {
      native: {
        Boolean: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean',
        Number: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number',
        Object: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object',
        Array: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array',
        String: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String',
        Date: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date',
        Function: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function'
      }
    }
  }
}
