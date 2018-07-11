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
    name: 'DelDocument',
    data () {
      return {
        entityType: Entities.DOCUMENT
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
