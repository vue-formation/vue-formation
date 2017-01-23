<template lang="jade">
  div(id='app')
    a(v-link='{ path: "/bootstrap"}') Bootstrap
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    a(v-link='{ path: "/materialize"}') Materialize
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    a(v-link='{ path: "/semanticui"}') SemanticUI
    hr
    router-view
</template>

<style>
  html {
    height: 100%;
  }
  body {
    height: 100%;
  }
</style>
