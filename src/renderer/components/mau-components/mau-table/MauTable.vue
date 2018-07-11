<template>
  <div class="table-responsive">
    <table class="vuetable table table-striped table-hover">
      <slot></slot>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'MauTable',
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  .v-table {
    overflow-x: auto;
    width: 100%;
  }
  td {
    // white-space: nowrap;
  }
  .clickable {
    cursor: pointer;
  }
</style>
