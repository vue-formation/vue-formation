<template>
  <div class="formation">
    <div v-if="isBootstrapFormat" class="container-fullwidth formation-container">
      <form role="form"
        :class="{ 'form-inline': config.format === 'inline', 'form-horizontal': config.format === 'horizontal' }">
        <div v-for="(rIdx, row) in formConfig"
          :transition="config.transition || null"
          :transition-enter="config.transitionEnter || null"
          :transition-leave="config.transitionLeave || null"
          :stagger="config.stagger || null"
          :enter-stagger="config.enterStagger || null"
          :leave-stagger="config.leaveStagger || null"
          :class="{ 'pull-left': config.align === 'left', 'pull-right': config.align === 'right' }">
          <div class="row form-group"
            :class="{ 'form-group-autoheight': row.type !== 'section', 'no-vertical-spacing': row.type === 'section' }"
            :style="{ 'height': row.height }">
            <div v-if="row.type === 'section'"
              class="col-xs-12 col-sm-12 col-md-12 col-lg-12"
              :class="row.class"
              :style="row.style">
              {{{ row.content }}}
            </div>
            <div v-if="row.type !== 'section'"
              v-for="(fIdx, form) in row.columns"
              class="form-group"
              :class="colClass(row.columns, fIdx, form.model)"
              :style="{ 'margin-right': $index === row.columns.length - 1 ? '-1px' : null }">

              <!-- Label -->
              <label :for="formId(rIdx, fIdx)"
                :style="{ 'float': config.alignLabels, 'width': '100%' }">
                {{{ getLabel(rIdx, fIdx, form.label) }}}
                <span v-if="config.decorateRequired && form.required && form.label" class="required-decoration">
                  *
                </span>

                <!-- text -->
                <input v-if="isTextInput(form.type)"
                  :type="form.type"
                  :name="formId(rIdx, fIdx)"
                  :id="formId(rIdx, fIdx)"
                  style="width: 100%;"
                  class="form-control"
                  :class="form.class"
                  :style="form.style"
                  :placeholder="form.placeholder"
                  :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                  v-model="formData[rIdx + '_' + fIdx]">
                <!-- text ./-->

                <!-- html -->
                <div v-if="form.type === 'html'" style="width: 100%;">{{{ form.value }}}</div>
                <!-- html ./-->

                <!-- button -->
                <button v-if="form.type === 'button'"
                class="btn"
                :class="form.class"
                :style="form.style"
                :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                @click.prevent="form.onClick ? form.onClick($event, data) : null">
                  <span v-if="form.iconClass", :class="form.iconClass"></span>
                  <span v-if="form.iconClass && form.text">&nbsp;</span>
                  <span v-if="form.text">{{ form.text }}</span>
                </button>
                <!-- button ./-->

                <!-- buttons -->
                <div v-if="form.type === 'buttons'"
                  :class="{ 'btn-group': form.group }"
                  :role="form.group ? 'group' : null">
                  <button v-for="btn in form.buttons"
                    class="btn"
                    :class="btn.class"
                    :style="btn.style"
                    :disabled="has(btn, 'bind.disabled') ? btn.bind.disabled() : formDisabled()"
                    @click.prevent="btn.onClick ? btn.onClick($event, data) : null">
                      <span v-if="btn.iconClass", :class="btn.iconClass"></span>
                      <span v-if="btn.iconClass && btn.label">&nbsp;</span>
                      <span v-if="btn.label">{{ form.label }}</span>
                  </button>
                </div>
                <!-- buttons ./-->

                <!-- checkbox -->
                <div v-if="form.type === 'checkbox'">
                  <label>
                    <input type="checkbox"
                      :id="formId(rIdx, fIdx)"
                      :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                      v-model="formData[rIdx + '_' + fIdx]">
                    {{ form.text }}
                  </label>
                </div>
                <!-- checkbox ./-->

                <!-- radio -->
                <div v-if="form.type === 'radio'" class="radio">
                  <label v-for="(oIdx, radio) in form.filter ? form.filter(formData[rIdx + '_' + fIdx], form.radios) : form.radios"
                    style="display: block;">
                    <input type="radio"
                      :name="formId(rIdx, fIdx)"
                      :id="formId(rIdx, fIdx)"
                      :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                      :value="radio.value"
                      v-model="formData[rIdx + '_' + fIdx]">
                      {{ radio.label }}
                  </label>
                </div>
                <!-- radio ./-->

                <!-- select -->
                <div v-if="form.type === 'select'">
                  <select class="form-control"
                    :id="formId(rIdx, fIdx)"
                    :disabled="has(form, 'bind.disabled') ? form.bind.disabled() : formDisabled()"
                    v-model="formData[rIdx + '_' + fIdx]">
                      <option v-for="opt in form.filter ? form.filter(formData[rIdx + '_' + fIdx], form.options) : form.options"
                        :value="opt.value"
                        :hidden="opt.hidden">
                        {{ opt.text }}
                      </option>
                  </select>
                </div>
                <!-- select ./-->

                <!-- vselect -->
                <v-select v-if="form.type === 'vselect'"
                  :value.sync="formData[rIdx + '_' + fIdx]"
                  :options="form.options"
                  :max-height="form.maxHeight"
                  :searchable="form.searchable"
                  :multiple="form.multiple"
                  :placeholder="form.placeholder"
                  :transition="form.transition"
                  :clear-search-on-select="form.clearSearchOnSelect"
                  :label="form.labelKey"
                  :on-change="form.onChange"
                  :taggable="form.taggable"
                  :push-tags="form.pushTags",
                  :create-option="form.createOption">
                </v-select>
                <!-- vselect ./-->

                <!-- slot -->
                <slot v-if="form.type === 'slot' && form.name" :name="form.name"></slot>
                <!-- slot ./-->

                <!-- fselect -->
                <f-select v-if="form.type === 'fselect'"
                  :close-on-select="form.closeOnSelect"
                  :width="form.width"
                  :value.sync="formData[rIdx + '_' + fIdx]"
                  :options="form.options"
                  :placeholder="form.placeholder"
                  :store-object="form.storeObject"
                  :multiple="form.multiple"
                  :text-key="form.textKey"
                  :value-key="form.valueKey">
                </f-select>
                <!-- fselect ./-->
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script type="text/babel">
  import * as _ from '../utils/utils'
  import vSelect from 'vue-select'
  import fSelect from './FSelect'

  export default {
    components: {
      vSelect,
      fSelect
    },
    methods: {
      multiClickaway (evt) {
        this.$broadcast('hide::dropdown')
      },
      formDisabled () {
        if (_.isFunction(this.config.disabled)) return this.config.disabled()
        if (_.isBoolean(this.config.disabled)) return this.config.disabled
        return null
      },
      has (obj, path) {
        return _.has(obj, path)
      },
      isTextInput (type) {
        return this.textTypes.indexOf(type) !== -1
      },
      isButtonType (type) {
        return this.buttonTypes.indexOf(type) !== -1
      },
      isTopLabeled (type) {
        return this.noTopLabel.indexOf(type) === -1
      },
      getLabel (rIdx, cIdx, label) {
        let labelCount = 0
        let row = _.get(this.formConfig, `[${rIdx}]`, [])
        _.forEach(row.columns, (col, idx) => {
          let lbl = _.get(col, 'label', null)
          if (lbl) labelCount++
        })
        if (!labelCount) return null
        if (labelCount && !label) return '&nbsp;'
        return label
      },
      formId (rowIndex, formIndex) {
        return this.$get('uuid')
          .concat('r').concat(rowIndex)
          .concat('f').concat(formIndex)
      },
      colClass (columns, index, path) {
        let cols = Math.floor(12 / columns.length)
        if (index === 0) cols += 12 % columns.length
        let classes = []
        if (!this.isTopLabeled(columns[index].type)) {
          classes.push('focused')
          classes.push('blured')
        }
        if (this.config.floatingLabels) classes.push('label-floating')
        classes.push('col-xs-'.concat(cols))
        classes.push('col-sm-'.concat(cols))
        classes.push('col-md-'.concat(cols))
        classes.push('col-lg-'.concat(cols))
        return classes
      },
      calcProgress () {
        let requiredCount = 0
        let requiredFilled = 0
        _.forEach(this.formConfig, (row, rIdx) => {
          _.forEach(row.columns, (form, fIdx) => {
            let data = _.get(this.formData, `${rIdx}_${fIdx}`)
            if (form.required) {
              requiredCount++
              if (_.isFunction(form.validate)) {
                if (form.validate(data)) requiredFilled++
              } else {
                if (data) {
                  requiredFilled++
                }
              }
            }
          })
        })
        return Math.floor((requiredFilled / requiredCount) * 100)
      },
      updateData (newData) {
        if (this.config.progress) {
          let progKey = this.config.progress === true ? '$$progress' : this.config.progress
          this.$set(`data.${progKey}`, this.calcProgress())
        }
        _.forEach(newData, (val, key) => {
          let [ rIdx, fIdx ] = key.split('_')
          let model = _.get(this.formConfig, `[${rIdx}].columns[${fIdx}].model`)
          if (model) this.$set(`data.${model}`, val)
        })
      }
    },
    computed: {
      formConfig () {
        let rows = []
        _.forEach(this.config.rows, (row, idx) => {
          if (row.type === 'include') {
            let newRows = _.isFunction(row.value) ? row.value(row, this) : row.value
            if (_.isArray(newRows)) _.forEach(newRows, (r) => { rows.push(r) })
          } else {
            rows.push(row)
          }
        })
        return rows
      },
      isBootstrapFormat () {
        return !this.config.style || this.config.style === 'bootstrap'
      }
    },
    data () {
      return {
        formData: {},
        uuid: null,
        textTypes: [
          'text', 'email', 'password', 'number', 'search', 'url', 'search', 'tel'
        ],
        dateTypes: [
          'date', 'month', 'week', 'time', 'datetime', 'datetime-local'
        ],
        uiTypes: [
          'radio', 'checkbox', 'color', 'range'
        ],
        buttonTypes: [
          'button', 'submit'
        ],
        noTopLabel: [
          'checkbox',
          'button',
          'radio',
          'toggle',
          'select',
          'multiselect',
          'select2',
          'html'
        ]
      }
    },
    created () {
      this.$set('uuid', 'form_'.concat((new Date()).valueOf().toString()))
      _.forEach(this.config.rows, (row, rIdx) => {
        _.forEach(row.columns, (form, fIdx) => {
          if (_.has(this.data, form.model)) this.$set(`formData["${rIdx}_${fIdx}"]`, _.get(this.data, form.model))
        })
      })
    },
    watch: {
      formData: {
        handler (newData) {
          this.updateData(newData)
        },
        deep: true
      }
    },
    props: {
      config: {
        type: Object,
        required: true
      },
      data: {
        twoWay: true,
        type: Object,
        required: true
      },
      width: {
        validator (val) {
          return (typeof val === 'number') || (typeof val === 'string')
        }
      }
    }
  }
</script>

<style>
  .formation {
    display: block;
  }
  .formation.formation-container {
    width: 100%;
    background: transparent;
  }
  .formation .form-group-autoheight > div {
    height: 100%;
    margin-bottom: 0px;
  }
  .formation .form-group-autoheight button {
    height: inherit;
  }
  .formation .required-decoration {
    color: #e51c23;
  }
  .formation .no-vertical-spacing {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  .formation .hidden {
    display: none;
  }
</style>
