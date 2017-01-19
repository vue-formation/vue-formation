<template>

</template>

<script type="text/babel">
  import * as _ from './common/dash'
  import Bootstrap from './bootstrap/index'

  const FRAMEWORKS = [
    'bootstrap',
    'foundation',
    'materialize',
    'semanticui'
  ]

  export default {
    props: {
      model: {
        type: Object,
        required: true,
        twoWay: true
      },
      config: {
        type: Object,
        required: true
      },
      framework: {
        type: String,
        default: 'bootstrap',
        validator (value) {
          return _.includes(FRAMEWORKS, value)
        }
      }
    },
    methods: {
      findModels (obj, models = []) {
        if (obj.model) models.push(obj.model)
        if (_.isArray(_.get(obj, 'components'))) {
          _.forEach(obj.components, (c) => {
            this.findModels(c, models)
          })
        }
        if (_.isArray(_.get(obj, 'rows'))) {
          _.forEach(obj.rows, (row) => {
            if (_.isArray(_.get(row, 'columns'))) {
              _.forEach(row.columns, (col) => {
                if (col.model) models.push(col.model)
              })
            }
          })
        }
        return models
      },
      syncModelProps () {
        _.forEach(_.uniq(this.findModels(this.config)), (model) => {
          if (!_.has(this.formData, model)) {
            Object.defineProperty(this.formData, model, {
              configurable: true,
              get: () => _.get(this.value, model),
              set: (v) => vueSet(this.value, model, v)
            })
          }
        })
      }
    }
    }
  }
</script>
