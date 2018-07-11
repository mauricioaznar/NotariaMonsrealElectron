<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
  import convertFirstCharacterTo from 'renderer/services/common/ConvertFirstCharacterTo'
  export default {
    name: 'MauCrudList',
    data () {
      return {
        entityNameLC: convertFirstCharacterTo.lowercase(this.entityName), // todo convert to mixin
        entityNameUC: convertFirstCharacterTo.uppercase(this.entityName)
      }
    },
    created () {

    },
    props: {
      entityAction: {
        type: String
      },
      entityName: {
        type: String,
        required: true
      },
      callback: {
        type: Function
      }
    }
  }
</script>

<style lang="scss">

</style>
