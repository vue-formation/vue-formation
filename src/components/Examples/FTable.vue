<template>
  <div class="container">
    <f-table :data.sync="data" :config="config"></f-table>
  </div>
</template>

<script type="text/babel">
  import FTable from '../FTable'
  export default {
    components: { FTable },
    data () {
      return {
        config: {
          class: ['table-bordered', 'table-striped'],
          columns: [
            { id: 'name', value: 'Name' },
            { id: 'email', value: 'Email' }
          ]
        },
        data: [
          ['Branden', 'bhoriuchi@gmail.com'],
          ['John', 'john@doe.com']
        ]
      }
    }
  }
</script>
