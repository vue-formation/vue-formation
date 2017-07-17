<template>
  <div v-for="(typeId, type) in Types">
    <h3><a name="{{ typeId }}"><span class="fa fa-hashtag"></span></a> {{ type.title }}</h3>
    <collapsable-section :type-id="typeId" :tab="tab" header="Description" section="description">
      {{ type.description }}
    </collapsable-section>

    <div v-if="type.example">
      <collapsable-section :type-id="typeId" :tab="tab" header="Example" section="example">
        <pre><code class="prism language-javascript">{{ stringify(type.example) }}</code></pre>
      </collapsable-section>
    </div>
    <div v-if="type.structure">
      <collapsable-section :type-id="typeId" :tab="tab" header="Structure" section="structure">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead v-if="type.structure.length > 0">
            <tr class="active">
              <th>Path</th>
              <th>Type</th>
              <th>Required</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="prop in type.structure | orderBy 'path'">
              <td>{{ prop.path }}</td>
              <td class="text-nowrap">{{{ typeLinks(prop.type) }}}</td>
              <td><span v-if="prop.required" class="fa fa-check"></span></td>
              <td>{{{ prop.default }}}</td>
              <td>{{{ prop.description }}}</td>
            </tr>
            <tr v-for="(eIdx, eRow) in getInherited(type.extends)" :class="{ active: (eIdx % 2) === 0 }">
              <td colspan="5">
                {{{ eRow }}}
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </collapsable-section>
    </div>
    <div v-if="type.enums">
      <collapsable-section :type-id="typeId" :tab="tab" header="Enums" section="enums">
        <div class="table-responsive">
          <table class="table table-bordered">
            <thead>
            <tr class="active">
              <th>Value</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="enum in type.enums | orderBy 'value'" :class="{ undocumented: enum.undocumented }">
              <td>{{ enum.value }}</td>
              <td>{{{ enum.description }}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </collapsable-section>
    </div>
  </div>
</template>

<script type="text/babel">
  import Types from '../docs/types'
  import TypeLinksMixin from '../mixins/TypeLinks'
  import CollapsableSection from '../components/CollapsableSection.vue'
  import * as _ from '../utils/utils'
  import { stringify } from '../utils/stringify'

  export default {
    mixins: [
      TypeLinksMixin
    ],
    components: {
      CollapsableSection
    },
    methods: {
      stringify (obj) {
        return stringify(obj, null, '  ')
      },
      getInherited (type) {
        let rows = []
        let getNest = (parent, l = []) => {
          let keys = _.map(_.get(Types, `${parent}.structure`, {}), (t) => {
            return t.path
          }).sort()
          l.push({ parent, keys })
          let newParent = _.get(Types, `${parent}.extends`)
          if (newParent) getNest(newParent, l)
          return l
        }
        _.forEach(getNest(type), (n) => {
          rows.push(`Properties inherited from <a href="#${n.parent}">${n.parent}</a>`)
          rows.push(_.map(n.keys, (v) => {
            return `<a>${v}</a>`
          }).join(', '))
        })
        return rows
      }
    },
    data () {
      return {
        tab: 'types',
        Types
      }
    }
  }
</script>
<style>
  .undocumented {
    background-color: rgba(255, 161, 0, 0.2);
  }
</style>
