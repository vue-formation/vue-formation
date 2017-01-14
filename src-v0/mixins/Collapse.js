import * as _ from '../utils/utils'
import { setCollapsed } from '../vuex/actions'

export default {
  vuex: {
    actions: {
      setCollapsed
    },
    getters: {
      cookie: (state) => state.cookie
    }
  },
  methods: {
    collapse (id, section) {
      let newCollapsed = _.merge({}, _.get(this.cookie, `collapsed.${this.tab}`, {}))
      newCollapsed[`${id}_${section}`] = !this.isCollapsed(id, section)
      this.setCollapsed(this.tab, newCollapsed)
    },
    isCollapsed (id, section) {
      return _.get(this.cookie, `collapsed.${this.tab}`, {})[`${id}_${section}`] === true
    }
  }
}
