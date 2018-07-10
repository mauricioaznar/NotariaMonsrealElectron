<template>
    <div>
        <mau-crud-del
                :id="id"
                :entityType="entityType">
        </mau-crud-del>
    </div>
</template>

<script>
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'DelSupplier',
    data () {
      return {
        entityType: EntityTypes.SUPPLIER
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>