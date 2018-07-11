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
    name: 'DelClient',
    data () {
      return {
        entityType: EntityTypes.CLIENT
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>