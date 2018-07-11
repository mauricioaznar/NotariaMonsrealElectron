<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'Client'"
      :entityAction="EntityActions.GET_CLIENTS"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
    >
      <template slot-scope="params">
        <client-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </client-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import ClientForm from '../components/ClientForm.vue'
  import EntityActions from 'renderer/api/store/entityActions'
  import PropertiesReference from '../PropertiesReference'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditClient',
    data () {
      return {
        EntityActions: EntityActions,
        client: null,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        relatedEntitiesRoutes: {[PropertiesReference.GRANTORS.entityName]: ApiRoutes.clientGrantor}
      }
    },
    props: {
      id: null
    },
    components: {
      ClientForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.CLIENT, ChildTypes.LIST)})
      }
    }
  }
</script>
