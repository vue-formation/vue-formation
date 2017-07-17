# vue-formation
A themeable Vue.js layout builder

[`Project Page`](https://vue-formation.github.io/vue-formation/)

Compatible with Vue.js 1.x and 2.x as well as Vuex 1.x and 2.x

### Example

**Vue1.x.vue** 

```js
<template>
  <formation :value.sync="data" :config="config">
</template>

<script type='text/babel'>
  import { component as Formation } from 'vue-formation'
  
  export default {
    components: {
      Formation
    },
    data () {
      return {
        data: {},
        config: {
          components: []
        }
      }
    }
  }
</script>
```

**Vue2.x.vue** 

```js
<template>
  <formation v-model="data" :config="config">
</template>

<script type='text/babel'>
  import { component as Formation } from 'vue-formation'
  
  export default {
    components: {
      Formation
    },
    data () {
      return {
        data: {},
        config: {
          components: []
        }
      }
    }
  }
</script>
```
