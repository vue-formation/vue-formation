<template lang="jade">
  div(id='app')
    router-link(to='/bootstrap') Bootstrap
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    router-link(to='/foundation') Foundation
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    router-link(to='/materialize') Materialize
    span &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
    router-link(to='/semanticui') SemanticUI
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
