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
    name: 'DelExpense',
    data () {
      return {
        entityType: Entities.EXPENSE
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
