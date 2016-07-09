<template>
  <h3>Introduction</h3>
  <h4 class="text-primary"><span class="fa fa-hashtag"></span> About</h4>
  <div class="well" style="border: 1px solid #ddd; border-radius: 3px;">
    Formation is a no dependency, Bootstrap themeable form builder for Vue.js. The following are its goals/features
    <ul>
      <li>Build form layouts of any complexity using JSON</li>
      <li>Bind all form data to a single reactive object</li>
      <li>Provide optional controls over all styling</li>
      <li>Integrate native options for validation</li>
      <li>Provide a small set of UI components that can be accessed natively or standalone</li>
    </ul>
  </div>
  <h3>Usage</h3>
  <div>
    <h4 class="text-primary"><span class="fa fa-code"></span> CommonJS</h4>
    <pre>// npm install vue-formation
<code class="language-JavaScript">
var Formation = require('vue-formation').Formation;

new Vue({
  components: {
    Formation: Formation
  }
})</code></pre>
  </div>
  <p>&nbsp;</p>
  <div>
    <h4 class="text-primary"><span class="fa fa-code"></span> ES6</h4>
    <pre>// npm install vue-formation
<code class="language-JavaScript">
import { Formation } from 'vue-formation'

new Vue({
  components: {
    Formation
  }
})</code></pre>
  </div>
  <p>&nbsp;</p>
  <div v-if="1 === 2">
    <h4 class="text-primary"><span class="fa fa-code"></span> AMD</h4>
    <pre>// bower install vue-formation
<code class="language-JavaScript">
var Formation = require('vue-formation').Formation;

new Vue({
  components: {
    Formation: Formation
  }
})</code></pre>
</template>
