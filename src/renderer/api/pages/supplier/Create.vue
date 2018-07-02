<template>
  <div class="container">
    <mau-crud-create
      :entityApiName="entityApiName"
      :entityAction="EntityAction"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form :saveFunction="params.save"></persona-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import EntityActions from 'src/api/store/entityActions'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import PersonaForm from 'src/api/components/generic/persona/PersonaForm.vue'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'CreateSupplier',
    data () {
      return {
        EntityAction: EntityActions.GET_SUPPLIERS,
        entityApiName: EntityTypes.SUPPLIER.apiName
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      PersonaForm
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.SUPPLIER, ChildTypes.LIST)})
        }
      }
    }
  }
</script>
