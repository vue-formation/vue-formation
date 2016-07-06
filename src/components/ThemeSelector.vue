<template>
  <select v-model="value" @change="onChange">
    <option v-for="opt in options | orderBy 'text'" :value="opt.value" :selected="opt.value === value ">{{ opt.text }}</option>
  </select>
</template>
<script type="text/babel">
  export default {
    methods: {
      onChange (event) {
        document.getElementById('page-theme').href = this.value
      }
    },
    data () {
      return {
        value: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css',
        options: [
          {
            value: 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap-theme.css',
            text: 'Bootstrap'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/flatly/bootstrap.min.css',
            text: 'Flatly'
          },
          {
            value: 'https://cdnjs.cloudflare.com/ajax/libs/bootswatch/3.3.6/paper/bootstrap.min.css',
            text: 'Paper'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cerulean/bootstrap.min.css',
            text: 'Cerulean'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cosmo/bootstrap.min.css',
            text: 'Cosmo'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/cyborg/bootstrap.min.css',
            text: 'Cyborg'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/darkly/bootstrap.min.css',
            text: 'Darkly'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/journal/bootstrap.min.css',
            text: 'Journal'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/lumen/bootstrap.min.css',
            text: 'Lumen'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/readable/bootstrap.min.css',
            text: 'Readable'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/sandstone/bootstrap.min.css',
            text: 'Sandstone'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/simplex/bootstrap.min.css',
            text: 'Simplex'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/slate/bootstrap.min.css',
            text: 'Slate'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/spacelab/bootstrap.min.css',
            text: 'Spacelab'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/superhero/bootstrap.min.css',
            text: 'Superhero'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/united/bootstrap.min.css',
            text: 'United'
          },
          {
            value: 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.6/yeti/bootstrap.min.css',
            text: 'Yeti'
          }
        ]
      }
    }
  }
</script>
