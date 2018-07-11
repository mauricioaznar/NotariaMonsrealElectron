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
    name: 'DelBagOrderAdjustment',
    data () {
      return {
        entityType: Entities.BAG_ORDER_ADJUSTMENT
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
