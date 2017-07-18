import { TAG_BINDINGS, TAG_MODEL } from '../common/constants'

export default {
  name: 'bootstrap',
  components: {
    'text-input': {
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
