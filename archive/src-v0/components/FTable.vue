<template>
  <div class="ftable">
    <table class="table table-fixed" :class="config.class">
      <thead>
        <tr>
          <th v-for="col in config.columns" class="col-xs-6">
            {{{ col.value }}}
          </th>
        </tr>
      </thead>
      <tbody style="height: 200px; overflow: auto; display:block;">
        <tr v-for="row in data">
          <td v-for="cell in row" class="col-xs-6">{{{ cell.value || cell }}}</td>
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

<style>
</style>
