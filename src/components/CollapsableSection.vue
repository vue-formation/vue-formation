<template>
  <div>
    <h5 @click="collapse(typeId, section)" style="cursor: pointer;">
      <span :class="{ 'fa fa-caret-down': !isCollapsed(typeId, section), 'fa fa-caret-right': isCollapsed(typeId, section) }"></span>
      {{ header || section }}
    </h5>
    <div :class="{ collapse: isCollapsed(typeId, section) }">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/babel">
  import CollapseMixin from '../mixins/Collapse'
  export default {
    mixins: [
      CollapseMixin
    ],
    props: {
      header: { type: String },
      typeId: { type: String, required: true },
      section: { type: String, required: true },
      tab: { type: String, required: true }
    }
  }
</script>
