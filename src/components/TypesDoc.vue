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
        <table class="table table-bordered">
          <thead>
          <tr>
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
          </tbody>
        </table>
      </collapsable-section>
    </div>
  </div>
</template>

<script type="text/babel">
  import Types from '../docs/types'
  import TypeLinksMixin from '../mixins/TypeLinks'
  import CollapsableSection from '../components/CollapsableSection.vue'
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
