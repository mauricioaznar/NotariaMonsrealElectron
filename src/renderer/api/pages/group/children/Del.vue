<template>
    <div>
        <mau-crud-del
                :id="id"
                :entityType="entityType">
        </mau-crud-del>
    </div>
</template>

<script>
  import Entities from 'renderer/api/EntityTypes'
  export default {
    name: 'DelGroup',
    data () {
      return {
        entityType: Entities.GROUP
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
