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
    name: 'DelBagOrderSale',
    data () {
      return {
        entityType: Entities.BAG_ORDER_SALE
      }
    },
    components: {
    },
    props: {
      id: null
    }
  }
</script>
