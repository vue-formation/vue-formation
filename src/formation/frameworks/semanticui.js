import { TAG_BINDINGS, TAG_MODEL } from '../common/constants'

export default {
  name: 'semanticui',
  components: {
    'text-input': {
      template: `<div class="ui input"><input type="text" ${TAG_MODEL} ${TAG_BINDINGS}></div>`
    }
  }
}
