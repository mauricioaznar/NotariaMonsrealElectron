<template>
  <div class="container">
    <mau-crud-create
      :entityName="'Client'"
      :entityAction="EntityActions.GET_CLIENTS"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
    >
      <template slot-scope="params">
        <client-form :saveFunction="params.save"></client-form>
      </template>
    </mau-crud-create>
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
    name: 'CreateClient',
    data () {
      return {
        EntityActions: EntityActions,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        relatedEntitiesRoutes: {[PropertiesReference.GRANTORS.entityName]: ApiRoutes.clientGrantor}
      }
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    components: {
      ClientForm
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: createRouteObjectPath(EntityTypes.CLIENT, ChildTypes.LIST)})
        }
      }
    }
  }
</script>
