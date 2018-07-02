<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
      :callback="callback"
    >
      <template slot-scope="params">
        <bag-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </bag-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import BagForm from './components/BagForm.vue'
  import PropertiesReference from 'src/api/propertiesReference/BagPropertiesReference'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'EditBag',
    data () {
      return {
        relatedEntitiesRoutes: {},
        entityApiName: EntityTypes.BAG.apiName,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      BagForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.BAG, ChildTypes.LIST)})
      }
    }
  }
</script>
