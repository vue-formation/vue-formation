# vue-formation
A themeable Vue.js layout builder

[`Project Page`](https://vue-formation.github.io/vue-formation/)

Compatible with Vue.js 1.x and 2.x

**Note** as of version `1.0.0`, `vue-formation` is now a Vue.js plugin instead of a component

### Example

**main.js**

```js
import Vue from 'vue'
import VueFormation from 'vue-formation'
import 'bootstrap.css'

Vue.use(VueFormation)

...
```

**Vue1.x.vue** 

```js
<template>
  <formation :value.sync="data" :config="config">
</template>

<script type='text/babel'>
  export default {
    data () {
      return {
        data: {
          
        },
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
  export default {
    data () {
      return {
        data: {
          
        },
        config: {
          components: []
        }
      }
    }
  }
</script>
```
