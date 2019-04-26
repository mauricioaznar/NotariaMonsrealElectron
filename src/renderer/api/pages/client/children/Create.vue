<template>
  <div class="container">
    <mau-crud-create
      :entityType="clientEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <client-form :saveFunction="params.save"></client-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import ClientForm from '../components/ClientForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateClient',
    data () {
      return {
        clientEntityType: EntityTypes.CLIENT,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
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
