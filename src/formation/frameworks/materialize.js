import { TAG_BINDINGS, TAG_MODEL } from '../common/constants'

export default {
  name: 'materialize',
  components: {
    'text-input': {
      template: `<input type="text" class="form-control" ${TAG_MODEL} ${TAG_BINDINGS}>`
    }
  }
}
