<template>
    <div>
        <mau-crud-del
                :id="id"
                :entityType="entityType">
        </mau-crud-del>
    </div>
</template>

<script>
  import Entities from 'src/api/EntityTypes'
  export default {
    name: 'DelUser',
    data () {
      return {
        entityType: Entities.USER
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
