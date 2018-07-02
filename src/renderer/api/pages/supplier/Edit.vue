<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
      :entityAction="EntityAction"
      :callback="callback"
    >
      <template slot-scope="params">
        <persona-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </persona-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import EntityActions from 'src/api/store/entityActions'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import PersonaForm from 'src/api/components/generic/persona/PersonaForm.vue'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'EditSupplier',
    data () {
      return {
        EntityAction: EntityActions.GET_SUPPLIERS,
        entityApiName: EntityTypes.SUPPLIER.apiName,
        supplier: null
      }
    },
    props: {
      id: null
    },
    components: {
      PersonaForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.SUPPLIER, ChildTypes.LIST)})
      }
    }
  }
</script>
