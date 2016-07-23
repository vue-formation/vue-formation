<template>
  <div>
    <table class="table" :class="config.class">
      <thead>
        <tr>
          <td v-for="col in config.columns">
            {{{ col.value }}}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data">
          <td v-for="cell in row">{{{ cell.value || cell }}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script type="text/babel">
  // import * as _ from '../utils/utils'
  export default {
    props: {
      config: {
        type: Object,
        required: true
      },
      data: {
        type: Array,
        twoWay: true,
        required: true
      }
    }
  }
</script>
